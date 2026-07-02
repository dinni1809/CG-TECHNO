import { prisma } from './prisma';

/**
 * Database-backed rate limiter for Next.js API routes.
 * Enforces a maximum number of requests for a specific IP and endpoint within a window.
 * 
 * @param ip Client IP address
 * @param endpoint Endpoint identifier (e.g. 'login', 'contact', 'careers')
 * @param limit Max allowed requests within the window
 * @param windowSeconds Window duration in seconds
 * @returns Object indicating if the request is allowed
 */
export async function checkRateLimit(
  ip: string,
  endpoint: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowSeconds * 1000);

  try {
    // Find or create the RateLimit record using the unique compound index
    const record = await prisma.rateLimit.upsert({
      where: {
        ip_endpoint: { ip, endpoint },
      },
      update: {},
      create: {
        ip,
        endpoint,
        count: 0, // initialized to 0, will be incremented
        resetAt,
      },
    });

    // Check if the rate limit window has expired
    if (now > record.resetAt) {
      const updated = await prisma.rateLimit.update({
        where: { id: record.id },
        data: {
          count: 1,
          resetAt,
        },
      });
      return {
        allowed: true,
        remaining: limit - 1,
        resetAt,
      };
    }

    // If within current window and limit exceeded
    if (record.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: record.resetAt,
      };
    }

    // Increment count
    const updated = await prisma.rateLimit.update({
      where: { id: record.id },
      data: {
        count: { increment: 1 },
      },
    });

    return {
      allowed: true,
      remaining: limit - updated.count,
      resetAt: record.resetAt,
    };
  } catch (error) {
    console.error(`[RateLimit Error] Failed checking rate limit for ${ip} on ${endpoint}:`, error);
    // Fail-open for safety to avoid blocking users if DB pool is saturated
    return {
      allowed: true,
      remaining: 1,
      resetAt: now,
    };
  }
}
