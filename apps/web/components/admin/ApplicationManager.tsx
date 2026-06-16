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
  Clock, 
  Briefcase, 
  X, 
  ChevronRight, 
  Building, 
  Inbox,
  FileText,
  MapPin,
  GraduationCap,
  Calendar,
  Compass,
  Check,
  Globe
} from 'lucide-react';

interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  qualification: string;
  fieldOfStudy: string;
  experience: string;
  interests: string[];
  preference: string;
  availability: string;
  certifications: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  hasDrivingLicense: boolean;
  willingToTravel: boolean;
  resumeUrl: string;
  additionalInfo: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApplicationManagerProps {
  initialApplications: any[];
}

export function ApplicationManager({ initialApplications }: ApplicationManagerProps) {
  const router = useRouter();
  const [applications, setApplications] = useState<CareerApplication[]>(
    initialApplications.map(app => ({
      ...app,
      createdAt: new Date(app.createdAt),
      updatedAt: new Date(app.updatedAt)
    }))
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const statuses = [
    { value: 'NEW', label: 'New' },
    { value: 'SHORTLISTED', label: 'Shortlisted' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'SELECTED', label: 'Selected' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  function getStatusLabel(status: string) {
    switch (status) {
      case 'NEW': return 'New';
      case 'SHORTLISTED': return 'Shortlisted';
      case 'INTERVIEW_SCHEDULED': return 'Interview Scheduled';
      case 'SELECTED': return 'Selected';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  }

  function getStatusClasses(status: string) {
    switch (status) {
      case 'NEW':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'SHORTLISTED':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'INTERVIEW_SCHEDULED':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      case 'SELECTED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'REJECTED':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-55 border-gray-200';
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }

  function exportCSV() {
    const headers = [
      'Name', 'Email', 'Phone', 'City', 'Highest Qualification', 'Field of Study', 
      'Experience', 'Areas of Interest', 'Employment Preference', 'Availability', 
      'Certifications', 'LinkedIn Profile', 'Portfolio / Website', 'Driving License', 
      'Willing to Travel', 'Resume Link', 'Status', 'Date Submitted'
    ];
    const rows = filteredApplications.map(app => [
      app.fullName,
      app.email,
      app.mobile,
      app.city,
      app.qualification,
      app.fieldOfStudy,
      app.experience,
      app.interests.join(' | '),
      app.preference,
      app.availability,
      app.certifications || 'None',
      app.linkedinUrl || 'N/A',
      app.portfolioUrl || 'N/A',
      app.hasDrivingLicense ? 'Yes' : 'No',
      app.willingToTravel ? 'Yes' : 'No',
      app.resumeUrl,
      getStatusLabel(app.status),
      app.createdAt.toLocaleString('en-IN')
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cg_techno_career_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function handleStatusUpdate(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch {
      alert('A network error occurred. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mobile.includes(searchQuery) ||
      app.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.fieldOfStudy.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter !== 'ALL') {
      matchesStatus = app.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-white font-sans text-gray-800">
      {/* Title / Header section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-primary-800 tracking-tight">Careers Applications</h1>
          <p className="text-gray-550 text-sm mt-1.5 font-medium">Review and manage general career profiles and applicant resumes.</p>
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
              placeholder="Search by name, email, city, studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[185px]">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ALL">All Statuses</option>
              {statuses.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
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
          Showing <span className="text-primary-800">{filteredApplications.length}</span> Applications
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full">
        {filteredApplications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center text-gray-400 shadow-sm">
            <Inbox size={56} className="mx-auto mb-4 opacity-30 text-gray-400" />
            <p className="text-base font-semibold text-gray-500">No applications found</p>
            <p className="text-sm mt-1 text-gray-400">Try modifying your query or filters</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-xs font-bold text-gray-555 uppercase tracking-wider">
                      <th className="p-4 pl-6">Applicant</th>
                      <th className="p-4">City & Mobile</th>
                      <th className="p-4">Qualification</th>
                      <th className="p-4">Experience</th>
                      <th className="p-4">Resume</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 pr-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredApplications.map((app) => (
                      <tr 
                        key={app.id} 
                        className="hover:bg-blue-50/25 transition-all cursor-pointer align-middle group"
                        onClick={() => setSelectedApp(app)}
                      >
                        <td className="p-4 pl-6 max-w-[200px]">
                          <div className="font-extrabold text-gray-900 group-hover:text-primary-800 transition-colors">{app.fullName}</div>
                          <div className="text-xs text-gray-500 mt-0.5 truncate">{app.email}</div>
                        </td>

                        <td className="p-4 font-semibold text-gray-700">
                          <div>{app.city}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">{app.mobile}</div>
                        </td>

                        <td className="p-4 text-gray-700">
                          <div className="font-bold text-slate-800">{app.qualification}</div>
                          <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[150px]">{app.fieldOfStudy}</div>
                        </td>

                        <td className="p-4 font-bold text-gray-900 text-xs">
                          <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">{app.experience}</span>
                        </td>

                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={app.resumeUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-250 rounded-xl transition-all"
                          >
                            <FileText size={13} />
                            Resume
                          </a>
                        </td>

                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block w-40">
                            <select
                              value={app.status}
                              disabled={updatingId === app.id}
                              onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                              className={`w-full appearance-none border text-xs font-bold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer disabled:opacity-50 transition-all ${getStatusClasses(app.status)}`}
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
                        </td>

                        <td className="p-4 text-gray-650 text-xs font-semibold whitespace-nowrap">
                          {app.createdAt.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>

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

            {/* Tablet & Mobile Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {filteredApplications.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-primary-500 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => setSelectedApp(app)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-base">{app.fullName}</h3>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{app.qualification} ({app.fieldOfStudy})</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClasses(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center gap-2 text-gray-650">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        <span className="font-medium">{app.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-650">
                        <Briefcase size={13} className="text-gray-400 shrink-0" />
                        <span className="font-bold">{app.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 font-mono">
                        <Calendar size={13} className="text-gray-400 shrink-0" />
                        <span>{app.createdAt.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100" onClick={e => e.stopPropagation()}>
                    <a 
                      href={app.resumeUrl} 
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold border border-amber-250 bg-amber-50 text-amber-800 rounded-xl hover:bg-amber-100 transition-all"
                    >
                      <FileText size={13} />
                      Resume
                    </a>
                    <button 
                      onClick={() => setSelectedApp(app)} 
                      className="px-4 py-2 text-xs font-bold bg-primary-800 text-white rounded-xl hover:bg-primary-750 transition-colors"
                    >
                      Open Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CRM Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedApp(null)}
          />

          <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-extrabold text-primary-805 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                Application Profile
              </span>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-200/80 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Profile Card Summary */}
              <div className="flex items-start gap-4 p-4 border border-gray-150 rounded-xl bg-slate-50/50">
                <div className="w-12 h-12 rounded-xl bg-primary-800 text-white flex items-center justify-center font-bold text-lg">
                  {selectedApp.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight truncate">{selectedApp.fullName}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="text-xs font-bold text-gray-650 flex items-center gap-1">
                      <MapPin size={13} className="text-gray-400" />
                      {selectedApp.city}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-gray-400" />
                      Submitted {selectedApp.createdAt.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Contact */}
                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Email Address</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 break-all font-mono">{selectedApp.email}</span>
                    <a href={`mailto:${selectedApp.email}`} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600 rounded-lg hover:text-primary-800 transition-colors">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Mobile Number</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 font-mono">{selectedApp.mobile}</span>
                    <a href={`tel:${selectedApp.mobile}`} className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600 rounded-lg hover:text-primary-800 transition-colors">
                      <Phone size={14} />
                    </a>
                  </div>
                </div>

                {/* 2. Education */}
                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Qualification</span>
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5 pt-0.5">
                    <GraduationCap size={14} className="text-gray-400 shrink-0" />
                    {selectedApp.qualification}
                  </span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Field of Study</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5 truncate">{selectedApp.fieldOfStudy}</span>
                </div>

                {/* 3. Job Prefs */}
                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Experience Level</span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5 pt-0.5">
                    <Briefcase size={14} className="text-gray-400 shrink-0" />
                    {selectedApp.experience}
                  </span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Employment Preference</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5">{selectedApp.preference}</span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Availability</span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5 pt-0.5">
                    <Calendar size={14} className="text-gray-400 shrink-0" />
                    {selectedApp.availability}
                  </span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Application Status</span>
                  <div className="relative pt-0.5">
                    <select
                      value={selectedApp.status}
                      disabled={updatingId === selectedApp.id}
                      onChange={(e) => handleStatusUpdate(selectedApp.id, e.target.value)}
                      className={`w-full appearance-none border text-xs font-bold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer disabled:opacity-50 transition-all ${getStatusClasses(selectedApp.status)}`}
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

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Has Driving License?</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5">{selectedApp.hasDrivingLicense ? 'Yes' : 'No'}</span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Willing to Travel?</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5">{selectedApp.willingToTravel ? 'Yes' : 'No'}</span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">LinkedIn Profile</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5 truncate">
                    {selectedApp.linkedinUrl ? (
                      <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary-800 hover:underline inline-flex items-center gap-1">
                        <Globe size={13} />
                        View LinkedIn
                      </a>
                    ) : 'Not Provided'}
                  </span>
                </div>

                <div className="p-3 border border-gray-150 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Portfolio / Website</span>
                  <span className="text-sm font-semibold text-gray-900 block pt-0.5 truncate">
                    {selectedApp.portfolioUrl ? (
                      <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-primary-800 hover:underline inline-flex items-center gap-1">
                        <Globe size={13} />
                        View Website
                      </a>
                    ) : 'Not Provided'}
                  </span>
                </div>
              </div>

              {/* Areas of Interest Badges */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Selected Areas of Interest</span>
                <div className="flex flex-wrap gap-2 p-3.5 border border-gray-150 bg-slate-50/40 rounded-xl">
                  {selectedApp.interests.map((interest) => (
                    <span key={interest} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-800 text-xs font-semibold rounded-lg shadow-sm">
                      <Check size={12} className="text-emerald-600" />
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Certifications</span>
                <div className="p-3.5 bg-slate-50 border border-gray-150 rounded-xl text-sm font-semibold text-gray-800 font-mono">
                  {selectedApp.certifications || 'None loged'}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Cover Note / Additional Information</span>
                <div className="p-4 bg-slate-50 border border-gray-150 rounded-xl text-sm text-gray-750 whitespace-pre-wrap leading-relaxed">
                  {selectedApp.additionalInfo || 'No cover note provided.'}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <a 
                  href={selectedApp.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-250 rounded-xl transition-all shadow-sm"
                >
                  <FileText size={15} />
                  Download Resume
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={`tel:${selectedApp.mobile}`} 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-gray-250 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-all shadow-sm"
                >
                  <Phone size={15} />
                  Call
                </a>
                <a 
                  href={`mailto:${selectedApp.email}`} 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-gray-250 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-all shadow-sm"
                >
                  <Mail size={15} />
                  Email
                </a>
                <button 
                  onClick={() => setSelectedApp(null)}
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
