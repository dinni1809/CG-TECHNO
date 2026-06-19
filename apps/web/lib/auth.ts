import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

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
      async authorize(credentials) {
        console.log('[NextAuth:authorize] Credentials received:', {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
        });

        if (!credentials?.email || !credentials?.password) {
          console.error('[NextAuth:authorize] Missing email or password');
          throw new Error('Please enter email and password');
        }

        try {
          const admin = await prisma.adminUser.findUnique({
            where: { email: credentials.email.toLowerCase().trim() },
          });

          console.log('[NextAuth:authorize] DB Admin Lookup:', {
            found: !!admin,
            email: admin?.email,
            role: admin?.role,
          });

          if (!admin) {
            console.warn('[NextAuth:authorize] Admin not found for email:', credentials.email);
            throw new Error('Incorrect email or password');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
          console.log('[NextAuth:authorize] Password validation result:', isPasswordValid);

          if (!isPasswordValid) {
            console.warn('[NextAuth:authorize] Incorrect password for email:', credentials.email);
            throw new Error('Incorrect email or password');
          }

          return {
            id: admin.id,
            email: admin.email,
            name: 'Administrator',
            role: admin.role,
          };
        } catch (error) {
          console.error('[NextAuth:authorize] Error in authorize function:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('[NextAuth:jwt] JWT Callback input:', { token, user });
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      console.log('[NextAuth:jwt] JWT Callback output token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('[NextAuth:session] Session Callback input:', { session, token });
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      console.log('[NextAuth:session] Session Callback output session:', session);
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
