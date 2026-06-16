'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Phone, 
  Mail, 
  User, 
  Clock, 
  Briefcase, 
  X, 
  ExternalLink,
  ChevronRight,
  FileSpreadsheet,
  Building,
  Inbox,
  Trash2,
  Archive,
  Check,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EnquiryManagerProps {
  initialEnquiries: any[];
}

export function EnquiryManager({ initialEnquiries }: EnquiryManagerProps) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(
    initialEnquiries.map(e => ({
      ...e,
      createdAt: new Date(e.createdAt),
      updatedAt: new Date(e.updatedAt)
    }))
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const statuses = [
    { value: 'NEW', label: 'New' },
    { value: 'CONTACTED', label: 'Contacted' },
    { value: 'RESOLVED', label: 'Resolved' },
    { value: 'SPAM', label: 'Spam' }
  ];

  // Helper to map DB status to friendly UI name
  function getStatusLabel(status: string) {
    switch (status) {
      case 'NEW': return 'New';
      case 'CONTACTED': return 'Contacted';
      case 'RESOLVED': return 'Resolved';
      case 'SPAM': return 'Spam';
      case 'NEGOTIATION': return 'Follow Up';
      case 'QUOTATION_SENT': return 'Quotation Sent';
      case 'WON': return 'Closed (Won)';
      case 'LOST': return 'Closed (Lost)';
      case 'CLOSED': return 'Closed';
      case 'ARCHIVED': return 'Archived';
      default: return status;
    }
  }

  // Helper to get color classes for status badges/borders
  function getStatusClasses(status: string) {
    switch (status) {
      case 'NEW':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'CONTACTED':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'RESOLVED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'SPAM':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'NEGOTIATION':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'QUOTATION_SENT':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      case 'WON':
      case 'CLOSED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'LOST':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'ARCHIVED':
        return 'text-gray-650 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  }

  // Handle refresh action
  function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    // Simulate short loader for premium feedback
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }

  // CSV Exporter
  function exportCSV() {
    const headers = ['Name', 'Email', 'Mobile', 'Message', 'Status', 'Created Date'];
    const rows = filteredEnquiries.map(e => [
      e.fullName,
      e.email,
      e.mobile,
      e.message.replace(/"/g, '""'),
      getStatusLabel(e.status),
      e.createdAt.toLocaleString('en-IN')
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cg_techno_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Update Status API call
  async function handleStatusUpdate(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local list state
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        // Update currently selected modal details if open
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('A network error occurred. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Delete Enquiry API call
  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        setSelectedLead(null);
      } else {
        alert(data.error || 'Failed to delete enquiry');
      }
    } catch (err) {
      alert('A network error occurred. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Client side search and status filter
  const filteredEnquiries = enquiries.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery);

    let matchesStatus = true;
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'CLOSED') {
        matchesStatus = lead.status === 'WON' || lead.status === 'LOST';
      } else {
        matchesStatus = lead.status === statusFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-white font-sans text-gray-800">
      {/* Title / Header section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-primary-800 tracking-tight">Manage Enquiries</h1>
          <p className="text-gray-550 text-sm mt-1.5 font-medium">Review, track, and update incoming sales leads.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-gray-250 bg-white text-gray-650 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm"
          >
            <RefreshCw size={15} className={`${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary-800 hover:bg-primary-750 text-white rounded-xl transition-all active:scale-[0.98] shadow-sm"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar Area */}
      <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="RESOLVED">Resolved</option>
              <option value="SPAM">Spam</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="text-sm font-bold text-gray-500 bg-white border border-gray-200 px-4 py-2.5 rounded-xl self-start lg:self-center shadow-sm">
          Showing <span className="text-primary-800">{filteredEnquiries.length}</span> Leads
        </div>
      </div>

      {/* CRM Main Workspace */}
      <div className="w-full">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center text-gray-400 shadow-sm">
            <Inbox size={56} className="mx-auto mb-4 opacity-30 text-gray-400" />
            <p className="text-base font-semibold text-gray-500">No leads match your criteria</p>
            <p className="text-sm mt-1 text-gray-400">Try modifying your query or filters</p>
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Grid Table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-xs font-bold text-gray-550 uppercase tracking-wider">
                      <th className="p-4 pl-6">Lead Name</th>
                      <th className="p-4">Service Required</th>
                      <th className="p-4">Message Snippet</th>
                      <th className="p-4">Lead Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 pr-6 text-center">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredEnquiries.map((lead) => (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-blue-50/25 transition-all cursor-pointer align-middle group"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Name Info Column */}
                        <td className="p-4 pl-6 max-w-[200px]">
                          <div className="font-extrabold text-gray-900 group-hover:text-primary-800 transition-colors">{lead.fullName}</div>
                          {lead.company && (
                            <div className="text-[11px] font-bold text-primary-700 mt-1 flex items-center gap-1">
                              <Building size={11} />
                              <span>{lead.company}</span>
                            </div>
                          )}
                        </td>

                        {/* Service / interest badge */}
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-100 text-primary-800">
                            <Briefcase size={12} className="mr-1.5 shrink-0" />
                            {lead.service || 'General Enquiry'}
                          </span>
                        </td>

                        {/* Message Column */}
                        <td className="p-4 max-w-[280px]">
                          <p className="text-xs text-gray-550 leading-relaxed truncate">
                            {lead.message}
                          </p>
                        </td>

                        {/* Status update Dropdown */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block w-40">
                            <select
                              value={lead.status}
                              disabled={updatingId === lead.id}
                              onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                              className={`w-full appearance-none border text-xs font-bold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer disabled:opacity-50 transition-all ${getStatusClasses(lead.status)}`}
                            >
                              {statuses.map((s) => (
                                <option key={s.value} value={s.value} className="bg-white text-gray-900 font-sans text-sm font-normal">
                                  {s.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </td>

                        {/* Date Column */}
                        <td className="p-4 text-gray-600 text-xs">
                          <div className="flex items-center gap-1.5 whitespace-nowrap font-semibold">
                            <Clock size={13} className="text-gray-400" />
                            {lead.createdAt.toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5 ml-4.5 font-medium">
                            {lead.createdAt.toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>

                        {/* Action Details */}
                        <td className="p-4 pr-6 text-center">
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-gray-200 text-gray-600 rounded-lg group-hover:bg-primary-800 group-hover:text-white group-hover:border-transparent transition-all">
                            Details
                            <ChevronRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards Layout */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredEnquiries.map((lead) => (
                <div 
                  key={lead.id} 
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-primary-500 transition-all cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base">{lead.fullName}</h3>
                      {lead.company && <p className="text-xs text-primary-700 font-semibold mt-0.5">{lead.company}</p>}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClasses(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-650">
                      <Briefcase size={13} className="text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-700">{lead.service || 'General Enquiry'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <Clock size={13} className="text-gray-400 shrink-0" />
                      <span>{lead.createdAt.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 italic bg-slate-50 border border-slate-100 rounded-lg p-2.5 leading-relaxed">
                      "{lead.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100" onClick={e => e.stopPropagation()}>
                    <a 
                      href={`tel:${lead.mobile}`} 
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Phone size={13} />
                      Call
                    </a>
                    <a 
                      href={`mailto:${lead.email}`} 
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Mail size={13} />
                      Email
                    </a>
                    <button 
                      onClick={() => setSelectedLead(lead)} 
                      className="px-3 py-2 text-xs font-bold bg-primary-800 text-white rounded-xl hover:bg-primary-750 transition-colors"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CRM Details modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedLead(null)}
          />

          {/* Modal Container */}
          <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-primary-805 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Lead Details
                </span>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-200/80 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Profile Card Summary */}
              <div className="flex items-start gap-4 p-4 border border-gray-150 rounded-xl bg-slate-50/50">
                <div className="w-12 h-12 rounded-xl bg-primary-800 text-white flex items-center justify-center font-bold text-lg">
                  {selectedLead.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight truncate">{selectedLead.fullName}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    {selectedLead.company && (
                      <span className="text-xs font-bold text-gray-650 flex items-center gap-1">
                        <Building size={13} className="text-gray-400" />
                        {selectedLead.company}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-gray-400" />
                      Submitted {selectedLead.createdAt.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Email Address</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 break-all font-mono">{selectedLead.email}</span>
                    <a href={`mailto:${selectedLead.email}`} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600 rounded-lg hover:text-primary-800 transition-colors">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Mobile Number</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 font-mono">{selectedLead.mobile}</span>
                    <a href={`tel:${selectedLead.mobile}`} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600 rounded-lg hover:text-primary-800 transition-colors">
                      <Phone size={14} />
                    </a>
                  </div>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Service of Interest</span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5 pt-0.5">
                    <Briefcase size={14} className="text-gray-400 shrink-0" />
                    {selectedLead.service || 'General Enquiry'}
                  </span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Lead Status</span>
                  <div className="relative pt-0.5">
                    <select
                      value={selectedLead.status}
                      disabled={updatingId === selectedLead.id}
                      onChange={(e) => handleStatusUpdate(selectedLead.id, e.target.value)}
                      className={`w-full appearance-none border text-xs font-bold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer disabled:opacity-50 transition-all ${getStatusClasses(selectedLead.status)}`}
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value} className="bg-white text-gray-900 font-sans text-sm font-normal">
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-550">
                      <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Message Box */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Complete Enquiry Message</span>
                <div className="p-4 bg-slate-50 border border-gray-150 rounded-xl text-sm text-gray-750 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(selectedLead.id)}
                  disabled={updatingId === selectedLead.id}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedLead.id, 'ARCHIVED')}
                  disabled={updatingId === selectedLead.id}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <Archive size={14} />
                  Archive
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleStatusUpdate(selectedLead.id, 'CONTACTED')}
                  disabled={updatingId === selectedLead.id}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border border-amber-250 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <Check size={14} />
                  Mark Contacted
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedLead.id, 'RESOLVED')}
                  disabled={updatingId === selectedLead.id}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border border-emerald-250 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <CheckSquare size={14} />
                  Mark Resolved
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedLead.id, 'SPAM')}
                  disabled={updatingId === selectedLead.id}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border border-rose-250 text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <AlertCircle size={14} className="text-rose-600" />
                  Mark Spam
                </button>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2.5 text-sm font-semibold bg-primary-800 hover:bg-primary-750 text-white rounded-xl transition-all shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
