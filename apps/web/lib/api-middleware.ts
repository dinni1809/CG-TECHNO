import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { checkRateLimit } from './rate-limit';
import { createAuditLog } from './audit';
import { ZodSchema } from 'zod';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'HR' | 'SALES';

interface HardenedHandlerContext {
  params: any;
  session: any;
  body?: any;
}

/**
 * Higher-order function wrapping API route handlers in strict enterprise security.
 * Enforces Rate Limiting, Authentication, Role Authorization, Zod Validation, and Error Masking.
 */
export function withHardenedAPI(
  allowedRoles: Role[],
  schema?: ZodSchema,
  rateLimitConfig: { limit: number; windowSeconds: number } = { limit: 60, windowSeconds: 60 }
) {
  return function(
    handler: (req: NextRequest, ctx: HardenedHandlerContext) => Promise<NextResponse>
  ) {
    return async function(request: NextRequest, { params }: { params?: any }) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
      const userAgent = request.headers.get('user-agent') || 'unknown-ua';
      const endpoint = request.nextUrl.pathname;

      try {
        // 1. Rate Limiting Check (Phase 3)
        const rateLimit = await checkRateLimit(ip, `api_${endpoint}`, rateLimitConfig.limit, rateLimitConfig.windowSeconds);
        if (!rateLimit.allowed) {
          return NextResponse.json(
            { success: false, error: 'Too many requests. Please wait a moment and try again.' },
            { status: 429 }
          );
        }

        // 2. Authentication Check (Phase 1, Phase 6)
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
          return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
          );
        }

        const userRole = (session.user as any).role as Role;

        // 3. Role Authorization Check (Phase 4, Phase 6)
        if (!allowedRoles.includes(userRole)) {
          // Log unauthorized access attempt in Audit Logs
          await createAuditLog({
            userId: (session.user as any).id,
            userEmail: session.user.email || undefined,
            action: `UNAUTHORIZED_ACCESS_API_${request.method}`,
            entity: 'API_Route',
            details: `Unauthorized attempt to access ${endpoint} with role ${userRole}`,
            result: 'FAILURE',
            ipAddress: ip,
            userAgent,
          });

          return NextResponse.json(
            { success: false, error: 'Forbidden' },
            { status: 403 }
          );
        }

        // 4. Input Validation (Phase 6)
        let body: any = undefined;
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
          try {
            body = await request.json();
          } catch {
            return NextResponse.json(
              { success: false, error: 'Invalid JSON payload' },
              { status: 400 }
            );
          }

          if (schema) {
            const parsed = schema.safeParse(body);
            if (!parsed.success) {
              const details = parsed.error.errors.map((e) => ({
                field: String(e.path[0]),
                message: e.message,
              }));
              return NextResponse.json(
                { success: false, error: 'Validation failed', details },
                { status: 400 }
              );
            }
            body = parsed.data;
          }
        }

        // 5. Execute Handler
        return await handler(request, { params, session, body });

      } catch (error: any) {
        // Phase 11 & Phase 13: Mask database/Prisma errors, log internally, return generic errors
        console.error(`[Hardened API Error] [Endpoint: ${endpoint}] [Method: ${request.method}]:`, error);
        
        return NextResponse.json(
          { success: false, error: 'Internal server error. Please try again later.' },
          { status: 500 }
        );
      }
    };
  };
}
