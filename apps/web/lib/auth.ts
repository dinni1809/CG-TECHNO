import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { createAuditLog, triggerSecurityAlert } from './audit';
import { checkRateLimit } from './rate-limit';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours session expiry
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const ip = (req?.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
                   (req as any)?.socket?.remoteAddress || 
                   'unknown-ip';
        const userAgent = (req?.headers?.['user-agent'] as string) || 'unknown-ua';
        const email = credentials?.email?.toLowerCase()?.trim() || '';

        console.log('[NextAuth:authorize] Credentials received from IP:', ip, {
          email,
          hasPassword: !!credentials?.password,
        });

        if (!email || !credentials?.password) {
          console.error('[NextAuth:authorize] Missing email or password');
          throw new Error('Incorrect email or password');
        }

        const now = new Date();
        const lockoutPeriod = 15 * 60 * 1000; // 15 minutes
        const maxFailures = 5;

        // 1. IP & Endpoint API Rate Limit (Phase 3: Login 5 attempts per 15 minutes)
        const rateLimitResult = await checkRateLimit(ip, 'login_api', maxFailures, 15 * 60);
        if (!rateLimitResult.allowed) {
          await triggerSecurityAlert('RATE_LIMIT_EXCEEDED', {
            ipAddress: ip,
            email,
            description: `Login API rate limit exceeded (5 requests/15min) from IP ${ip}.`,
          });
          throw new Error('Too many login attempts. Please try again later.');
        }

        // 2. Lockout Checks
        // Retrieve admin account
        const admin = await prisma.adminUser.findUnique({
          where: { email },
        });

        // Check Account-based Lockout (Phase 2)
        if (admin && admin.lockoutUntil && admin.lockoutUntil > now) {
          throw new Error('Too many login attempts. Please try again later.');
        }

        // Check IP-based Lockout (Phase 2)
        const ipLockout = await prisma.loginAttempt.findUnique({
          where: { ipAddress_email: { ipAddress: ip, email } },
        });
        if (ipLockout && ipLockout.lockedUntil && ipLockout.lockedUntil > now) {
          throw new Error('Too many login attempts. Please try again later.');
        }

        const handleFailure = async (adminRecord: any) => {
          // Increment or create LoginAttempt for this IP and email
          const attempt = await prisma.loginAttempt.upsert({
            where: { ipAddress_email: { ipAddress: ip, email } },
            update: {
              attempts: { increment: 1 },
              lastAttempt: now,
            },
            create: {
              ipAddress: ip,
              email,
              attempts: 1,
              lastAttempt: now,
            },
          });

          const lockedUntilTime = new Date(now.getTime() + lockoutPeriod);
          const isIpLocked = attempt.attempts >= maxFailures;

          if (isIpLocked) {
            await prisma.loginAttempt.update({
              where: { id: attempt.id },
              data: { lockedUntil: lockedUntilTime },
            });
            await triggerSecurityAlert('BRUTE_FORCE_IP', {
              ipAddress: ip,
              email,
              description: `IP ${ip} locked out for 15 minutes after ${attempt.attempts} failed login attempts to ${email}.`,
            });
          }

          if (adminRecord) {
            const updatedAttempts = adminRecord.failedLoginAttempts + 1;
            const isAccountLocked = updatedAttempts >= maxFailures;
            const accountLockTime = isAccountLocked ? lockedUntilTime : null;

            await prisma.adminUser.update({
              where: { id: adminRecord.id },
              data: {
                failedLoginAttempts: updatedAttempts,
                lastFailedLogin: now,
                lockoutUntil: accountLockTime,
              },
            });

            if (isAccountLocked) {
              await triggerSecurityAlert('BRUTE_FORCE_EMAIL', {
                ipAddress: ip,
                email,
                description: `Admin account ${email} locked out for 15 minutes after ${updatedAttempts} failed login attempts.`,
              });
            }
          }

          // Create failed login audit log
          await createAuditLog({
            userEmail: email,
            action: 'LOGIN',
            entity: 'AdminUser',
            entityId: adminRecord?.id,
            result: 'FAILURE',
            ipAddress: ip,
            userAgent,
            details: `Failed login attempt. (Attempts: IP: ${attempt.attempts}, Account: ${adminRecord ? adminRecord.failedLoginAttempts + 1 : 'N/A'})`,
          });

          if (isIpLocked || (adminRecord && adminRecord.failedLoginAttempts + 1 >= maxFailures)) {
            throw new Error('Too many login attempts. Please try again later.');
          }

          throw new Error('Incorrect email or password');
        };

        // 3. User verification
        if (!admin) {
          console.warn('[NextAuth:authorize] Admin account not found:', email);
          return await handleFailure(null);
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isPasswordValid) {
          console.warn('[NextAuth:authorize] Password validation failed for:', email);
          return await handleFailure(admin);
        }

        // 4. Successful Authentication
        // Reset failures on Account
        await prisma.adminUser.update({
          where: { id: admin.id },
          data: {
            failedLoginAttempts: 0,
            lockoutUntil: null,
            lastSuccessfulLogin: now,
          },
        });

        // Reset failures on IP
        await prisma.loginAttempt.deleteMany({
          where: { email, ipAddress: ip },
        });

        // Create success login audit log
        await createAuditLog({
          userId: admin.id,
          userEmail: admin.email,
          action: 'LOGIN',
          entity: 'AdminUser',
          entityId: admin.id,
          result: 'SUCCESS',
          ipAddress: ip,
          userAgent,
        });

        return {
          id: admin.id,
          email: admin.email,
          name: 'Administrator',
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

