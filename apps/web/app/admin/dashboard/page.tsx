import { prisma } from '@/lib/prisma';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import {
  Inbox,
  MessageSquare,
  CheckCircle,
  FileSpreadsheet,
  ListFilter,
  Users,
  FileUser,
  Calendar,
  UserCheck,
  UserX,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import Link from 'next/link';

// Caching: Revalidate the dashboard metrics page every 30 seconds to reduce DB load
export const revalidate = 30;

interface ActivityEvent {
  id: string;
  type: 'enquiry_submission' | 'enquiry_status' | 'career_submission' | 'career_status';
  title: string;
  description: string;
  dateStr: string;
  timestamp: Date;
}

export default async function AdminDashboard() {
  // Query 30 days window for trend metrics
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  // Fetch all dashboard aggregations and feeds in parallel for optimal database response times
  const [
    enquiryCounts,
    applicationCounts,
    recentEnquiries,
    recentApplications,
    servicesData,
    enquiryTimestamps,
    applicationTimestamps,
    feedEnquiries,
    feedApplications
  ] = await Promise.all([
    // Group by status for Enquiries
    prisma.enquiry.groupBy({
      by: ['status'],
      _count: { id: true }
    }),
    // Group by status for Applications
    prisma.careerApplication.groupBy({
      by: ['status'],
      _count: { id: true }
    }),
    // Latest 5 Enquiries
    prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    // Latest 5 Applications
    prisma.careerApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    // Service volumes (Top Services)
    prisma.enquiry.groupBy({
      by: ['service'],
      _count: { id: true }
    }),
    // Enquiries dates for trend mapping
    prisma.enquiry.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    }),
    // Applications dates for trend mapping
    prisma.careerApplication.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    }),
    // Fetch last 15 updated enquiries to reconstruct activity feed
    prisma.enquiry.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 15
    }),
    // Fetch last 15 updated applications to reconstruct activity feed
    prisma.careerApplication.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 15
    })
  ]);

  // 1. Map Enquiry KPI metrics
  let totalEnquiries = 0;
  let newEnquiries = 0;
  let inProgressEnquiries = 0;
  let closedEnquiries = 0;

  enquiryCounts.forEach((group) => {
    const count = group._count.id;
    totalEnquiries += count;
    const status = group.status;
    if (status === 'NEW') {
      newEnquiries += count;
    } else if (['CONTACTED', 'QUOTATION_SENT', 'NEGOTIATION'].includes(status)) {
      inProgressEnquiries += count;
    } else if (['WON', 'LOST'].includes(status)) {
      // Valid database status closing keys
      closedEnquiries += count;
    } else {
      inProgressEnquiries += count;
    }
  });

  // 2. Map Career Application KPI metrics
  let totalApplications = 0;
  let appliedApps = 0;
  let shortlistedApps = 0;
  let interviewScheduledApps = 0;
  let selectedApps = 0;
  let rejectedApps = 0;

  applicationCounts.forEach((group) => {
    const count = group._count.id;
    totalApplications += count;
    const status = group.status;
    if (status === 'NEW') {
      appliedApps += count;
    } else if (status === 'SHORTLISTED') {
      shortlistedApps += count;
    } else if (status === 'INTERVIEW_SCHEDULED') {
      interviewScheduledApps += count;
    } else if (status === 'SELECTED') {
      selectedApps += count;
    } else if (status === 'REJECTED') {
      rejectedApps += count;
    } else {
      appliedApps += count;
    }
  });

  // 3. Helper to generate daily analytics trend mapping (fills in 0 for empty dates)
  function getDailyTrend(records: { createdAt: Date }[], days: number) {
    const trendMap: { [key: string]: number } = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      trendMap[dateStr] = 0;
    }

    records.forEach((r) => {
      const dateStr = new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      if (trendMap[dateStr] !== undefined) {
        trendMap[dateStr]++;
      }
    });

    return Object.entries(trendMap).map(([date, count]) => ({ date, count }));
  }

  const enquiry7Days = getDailyTrend(enquiryTimestamps, 7);
  const enquiry30Days = getDailyTrend(enquiryTimestamps, 30);
  const application7Days = getDailyTrend(applicationTimestamps, 7);
  const application30Days = getDailyTrend(applicationTimestamps, 30);

  // 4. Map Top Services analytics data
  const topServices = servicesData
    .map((s) => ({
      name: s.service || 'General Enquiry',
      count: s._count.id
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 5. Reconstruct Recent Activity Feed from update times
  const events: ActivityEvent[] = [];

  feedEnquiries.forEach((lead) => {
    // Lead Created Event
    events.push({
      id: `enq-sub-${lead.id}-${lead.createdAt.getTime()}`,
      type: 'enquiry_submission',
      title: 'New Enquiry Received',
      description: `${lead.fullName} submitted a lead for "${lead.service}"`,
      dateStr: lead.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      timestamp: lead.createdAt
    });

    // Lead Updated Status Event (detect changes)
    if (lead.updatedAt.getTime() > lead.createdAt.getTime() + 1000 && lead.status !== 'NEW') {
      events.push({
        id: `enq-status-${lead.id}-${lead.updatedAt.getTime()}`,
        type: 'enquiry_status',
        title: 'Lead Status Updated',
        description: `Enquiry from ${lead.fullName} marked as "${lead.status}"`,
        dateStr: lead.updatedAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
        timestamp: lead.updatedAt
      });
    }
  });

  feedApplications.forEach((app) => {
    // Candidate applied event
    events.push({
      id: `app-sub-${app.id}-${app.createdAt.getTime()}`,
      type: 'career_submission',
      title: 'New Career Application',
      description: `${app.fullName} applied for ${app.interests.slice(0, 2).join(', ') || 'Career'}`,
      dateStr: app.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      timestamp: app.createdAt
    });

    // Candidate updated status event (detect changes)
    if (app.updatedAt.getTime() > app.createdAt.getTime() + 1000 && app.status !== 'NEW') {
      events.push({
        id: `app-status-${app.id}-${app.updatedAt.getTime()}`,
        type: 'career_status',
        title: 'Applicant Status Updated',
        description: `Application for ${app.fullName} updated to "${app.status}"`,
        dateStr: app.updatedAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
        timestamp: app.updatedAt
      });
    }
  });

  // Sort by timeline descending and keep the latest 10 activities
  const recentActivities = events
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans pb-16">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Operations Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time business leads, recruitment trends, and service analytics.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <ListFilter size={16} />
              Manage Enquiries
            </Link>
            <Link
              href="/admin/applications"
              className="px-4 py-2.5 bg-primary-800 hover:bg-primary-750 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <Users size={16} />
              Recruitment Center
            </Link>
          </div>
        </div>

        {/* 1. Enquiry KPI Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <TrendingUp size={16} />
            Lead Generation Analytics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Enquiries', value: totalEnquiries, icon: FileSpreadsheet, color: 'text-blue-600 bg-blue-50 border-blue-100' },
              { label: 'New Enquiries', value: newEnquiries, icon: Inbox, color: 'text-amber-600 bg-amber-50 border-amber-100' },
              { label: 'In Progress Enquiries', value: inProgressEnquiries, icon: MessageSquare, color: 'text-violet-600 bg-violet-50 border-violet-100' },
              { label: 'Closed Enquiries', value: closedEnquiries, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.label}</p>
                    <p className="text-3xl font-extrabold text-gray-900 mt-2 font-heading">{card.value}</p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${card.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Recruitment KPI Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Users size={16} />
            Recruitment Funnel Metrics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total Applicants', value: totalApplications, icon: FileUser, color: 'text-slate-600 bg-slate-50 border-slate-200' },
              { label: 'Applied', value: appliedApps, icon: Inbox, color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { label: 'Shortlisted', value: shortlistedApps, icon: Award, color: 'text-purple-600 bg-purple-50 border-purple-200' },
              { label: 'Interviewing', value: interviewScheduledApps, icon: Calendar, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
              { label: 'Selected / Rejected', value: `${selectedApps} / ${rejectedApps}`, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-250' }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-150"
                >
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{card.label}</p>
                    <p className="text-xl font-extrabold text-gray-900 mt-1 font-heading">{card.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg border ${card.color}`}>
                    <Icon size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Recharts Lead & Recruitment Trend Charts */}
        <DashboardCharts
          enquiry7Days={enquiry7Days}
          enquiry30Days={enquiry30Days}
          application7Days={application7Days}
          application30Days={application30Days}
        />

        {/* 4 & 5. Widgets Row: Top Services & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Services Widget */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between lg:col-span-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-1">Top Requested Services</h3>
              <p className="text-xs text-gray-500 mb-6">Services ranked by enquiry volume</p>
              
              {topServices.length === 0 ? (
                <div className="py-12 text-center text-gray-400 font-medium text-sm">
                  No service analytics data available.
                </div>
              ) : (
                <div className="space-y-4">
                  {topServices.map((service, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm font-semibold text-gray-700">
                        <span className="truncate max-w-[200px]">{service.name}</span>
                        <span>{service.count}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(service.count / Math.max(...topServices.map(s => s.count))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 font-heading mb-1 flex items-center gap-2">
              <Activity size={18} className="text-gray-400" />
              Recent Operations Activity
            </h3>
            <p className="text-xs text-gray-500 mb-6">Real-time status changes and submissions feed</p>

            {recentActivities.length === 0 ? (
              <div className="py-16 text-center text-gray-400 font-medium text-sm">
                No recent activity logged.
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((event, eventIdx) => {
                    const isLast = eventIdx === recentActivities.length - 1;
                    return (
                      <li key={event.id}>
                        <div className="relative pb-6">
                          {!isLast && (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-150" aria-hidden="true" />
                          )}
                          <div className="relative flex space-x-3 items-start">
                            <div>
                              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white border ${
                                event.type === 'enquiry_submission'
                                  ? 'bg-blue-50 border-blue-100 text-blue-600'
                                  : event.type === 'enquiry_status'
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                  : event.type === 'career_submission'
                                  ? 'bg-amber-50 border-amber-100 text-amber-600'
                                  : 'bg-purple-50 border-purple-100 text-purple-600'
                              }`}>
                                <Activity size={14} />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                                <p className="text-xs text-slate-500 mt-1 font-medium">{event.description}</p>
                              </div>
                              <div className="text-right text-[10px] whitespace-nowrap text-slate-400 font-bold font-mono">
                                {event.dateStr}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 6. Latest Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Enquiries */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-heading">Latest Enquiries</h3>
              <Link href="/admin/enquiries" className="text-xs font-bold text-primary-800 hover:underline">
                View All
              </Link>
            </div>
            {recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-medium text-sm">
                No enquiries submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-150 text-[10px] text-gray-500 uppercase tracking-wider font-extrabold">
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Service</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {recentEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-gray-900">{enq.fullName}</div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[130px]">{enq.email}</div>
                        </td>
                        <td className="py-3 text-gray-700 font-semibold truncate max-w-[130px]">
                          {enq.service}
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            enq.status === 'NEW'
                              ? 'text-amber-700 bg-amber-50 border border-amber-200'
                              : enq.status === 'CONTACTED'
                              ? 'text-blue-700 bg-blue-50 border border-blue-200'
                              : enq.status === 'WON'
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-250'
                              : 'text-red-700 bg-red-50 border border-red-200'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Latest Applications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-heading">Latest Applications</h3>
              <Link href="/admin/applications" className="text-xs font-bold text-primary-800 hover:underline">
                View All
              </Link>
            </div>
            {recentApplications.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-medium text-sm">
                No career applications submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-150 text-[10px] text-gray-500 uppercase tracking-wider font-extrabold">
                      <th className="pb-2">Applicant</th>
                      <th className="pb-2">Interests</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-gray-900">{app.fullName}</div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[130px]">{app.email}</div>
                        </td>
                        <td className="py-3 text-gray-700 font-semibold truncate max-w-[130px]">
                          {app.interests.slice(0, 2).join(', ') || 'General'}
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            app.status === 'NEW'
                              ? 'text-amber-700 bg-amber-50 border border-amber-200'
                              : app.status === 'SHORTLISTED'
                              ? 'text-purple-700 bg-purple-50 border border-purple-200'
                              : app.status === 'SELECTED'
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-250'
                              : 'text-red-700 bg-red-50 border border-red-200'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
