import { prisma } from '@/lib/prisma';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Inbox, MessageSquare, CheckCircle, FileSpreadsheet, ListFilter } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Disable server caching to ensure fresh metrics are fetched on each reload

export default async function AdminDashboard() {
  const totalEnquiries = await prisma.enquiry.count();
  const newLeads = await prisma.enquiry.count({
    where: { status: 'NEW' },
  });
  const contactedLeads = await prisma.enquiry.count({
    where: { status: 'CONTACTED' },
  });
  const closedLeads = await prisma.enquiry.count({
    where: {
      status: {
        in: ['WON', 'LOST'],
      },
    },
  });

  // Fetch recent leads to display on dashboard
  const recentLeads = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const cards = [
    { label: 'Total Enquiries', value: totalEnquiries, icon: FileSpreadsheet, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'New Leads', value: newLeads, icon: Inbox, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Contacted Leads', value: contactedLeads, icon: MessageSquare, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Closed Leads', value: closedLeads, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold font-heading text-gray-900">System Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Live analytics of CG Techno leads and enquiries.</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="px-5 py-3 bg-primary-800 hover:bg-primary-750 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <ListFilter size={16} />
            Manage Enquiries
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 font-heading">{card.value}</p>
                </div>
                <div className={`p-4 rounded-xl border ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Leads Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-heading">Recent Enquiries</h2>
          {recentLeads.length === 0 ? (
            <div className="text-center py-10 text-gray-550 text-sm font-medium">
              No enquiries logged yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="pb-3 font-bold text-left">Name</th>
                    <th className="pb-3 font-bold text-left">Service/Solution</th>
                    <th className="pb-3 font-bold text-left">Date</th>
                    <th className="pb-3 font-bold text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-sm">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-gray-900">{lead.fullName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.email}</div>
                      </td>
                      <td className="py-4 pr-4 text-gray-700 font-medium">{lead.service || 'N/A'}</td>
                      <td className="py-4 pr-4 text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            lead.status === 'NEW'
                              ? 'bg-amber-550/10 text-amber-700 border border-amber-200/50'
                              : lead.status === 'CONTACTED'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                              : lead.status === 'WON'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              : lead.status === 'LOST'
                              ? 'bg-red-50 text-red-700 border border-red-200/50'
                              : 'bg-purple-50 text-purple-700 border border-purple-200/50'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
