import { prisma } from '@/lib/prisma';
import { EmailStatus } from '@prisma/client';

export async function getEmailDashboardMetrics() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalCount,
    todayCount,
    sentCount,
    failedCount,
    bouncedCount,
    avgResponseData,
    attemptsData,
    topTemplates,
    topRecipients,
    dailyTrendsRaw,
  ] = await Promise.all([
    // Total logs
    prisma.emailLog.count(),
    
    // Logs today
    prisma.emailLog.count({
      where: { createdAt: { gte: startOfDay } },
    }),

    // Sent status count
    prisma.emailLog.count({
      where: { status: 'SENT' },
    }),

    // Failed status count
    prisma.emailLog.count({
      where: { status: 'FAILED' },
    }),

    // Bounced status count
    prisma.emailLog.count({
      where: { status: 'BOUNCED' },
    }),

    // Average latency
    prisma.emailLog.aggregate({
      where: { status: 'SENT', responseTime: { not: null } },
      _avg: { responseTime: true },
    }),

    // Total attempts made
    prisma.emailLog.aggregate({
      _sum: { attempts: true },
    }),

    // Top templates used
    prisma.emailLog.groupBy({
      by: ['template'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }),

    // Top recipients (grouped by primary email 'to')
    prisma.emailLog.groupBy({
      by: ['to'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }),

    // Trend of emails last 7 days
    prisma.emailLog.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      select: {
        createdAt: true,
        status: true,
      },
    }),
  ]);

  // Calculate success rate, failures, bounces, latency
  const successRate = totalCount > 0 ? (sentCount / totalCount) * 100 : 0;
  const failureRate = totalCount > 0 ? (failedCount / totalCount) * 100 : 0;
  const bounceRate = totalCount > 0 ? (bouncedCount / totalCount) * 100 : 0;

  // Process 7-day trend values
  const dailyTrends: Record<string, { total: number; sent: number; failed: number }> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    dailyTrends[label] = { total: 0, sent: 0, failed: 0 };
  }

  dailyTrendsRaw.forEach((log) => {
    const label = new Date(log.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (dailyTrends[label]) {
      dailyTrends[label].total++;
      if (log.status === 'SENT') dailyTrends[label].sent++;
      if (log.status === 'FAILED') dailyTrends[label].failed++;
    }
  });

  const chartData = Object.entries(dailyTrends).map(([date, stats]) => ({
    date,
    ...stats,
  }));

  return {
    kpis: {
      totalEmails: totalCount,
      emailsToday: todayCount,
      successRate: Math.round(successRate * 10) / 10,
      failureRate: Math.round(failureRate * 10) / 10,
      bounceRate: Math.round(bounceRate * 10) / 10,
      totalAttempts: attemptsData._sum.attempts || 0,
      avgDeliveryTimeMs: Math.round(avgResponseData._avg.responseTime || 0),
    },
    topTemplates: topTemplates.map((t) => ({ name: t.template, count: t._count.id })),
    topRecipients: topRecipients.map((r) => ({ email: r.to, count: r._count.id })),
    trends: chartData,
  };
}
