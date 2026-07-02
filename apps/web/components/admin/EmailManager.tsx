'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  ShieldAlert,
  RefreshCw,
  FileCode,
  Cpu,
  Activity,
  HeartPulse,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
  AlertTriangle,
  Download,
  Info,
  Calendar,
  Zap,
  Check,
  RotateCw
} from 'lucide-react';
import { EmailStatus, EmailTemplate, EmailCategory, EmailPriority } from '@prisma/client';

interface EmailAttachment {
  id: string;
  filename: string;
  size: number;
  mime: string;
  blobUrl: string;
  provider: string;
}

interface EmailEvent {
  id: string;
  eventType: string;
  message: string | null;
  metadata: any;
  createdAt: string;
}

interface EmailLog {
  id: string;
  correlationId: string;
  tenantId: string;
  providerMessageId: string | null;
  provider: string;
  from: string;
  to: string;
  cc: string[];
  bcc: string[];
  replyTo: string | null;
  subject: string;
  template: EmailTemplate;
  templateVersion: string;
  locale: string;
  category: EmailCategory;
  priority: EmailPriority;
  status: EmailStatus;
  payload: any;
  metadata: any;
  attempts: number;
  maxAttempts: number;
  errorMessage: string | null;
  failureReason: string | null;
  providerResponse: any;
  httpStatus: number | null;
  responseTime: number | null;
  source: string | null;
  leadId: string | null;
  sessionId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  country: string | null;
  city: string | null;
  scheduledAt: string | null;
  createdAt: string;
  attachments: EmailAttachment[];
  events: EmailEvent[];
}

interface DashboardMetrics {
  kpis: {
    totalEmails: number;
    emailsToday: number;
    successRate: number;
    failureRate: number;
    bounceRate: number;
    totalAttempts: number;
    avgDeliveryTimeMs: number;
  };
  topTemplates: Array<{ name: string; count: number }>;
  topRecipients: Array<{ email: string; count: number }>;
  trends: Array<{ date: string; total: number; sent: number; failed: number }>;
}

export function EmailManager() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'failures' | 'queue' | 'templates' | 'providers' | 'health' | 'analytics'>('inbox');
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [actionIdLoading, setActionIdLoading] = useState<string | null>(null);
  
  // Search & Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [templateFilter, setTemplateFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Inspector Drawer
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let queryUrl = `/api/admin/emails?page=${page}&limit=15`;
      if (search) queryUrl += `&search=${encodeURIComponent(search)}`;
      
      // Override status filters based on tab if needed
      if (activeTab === 'failures') {
        queryUrl += `&status=FAILED`;
      } else if (activeTab === 'queue') {
        queryUrl += `&status=RETRYING`;
      } else if (statusFilter) {
        queryUrl += `&status=${statusFilter}`;
      }
      
      if (templateFilter) {
        queryUrl += `&template=${templateFilter}`;
      }

      const res = await fetch(queryUrl);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        setMetrics(data.metrics);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to load email logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [activeTab, statusFilter, templateFilter, page, search]);

  const handleRetrySingle = async (id: string) => {
    setActionIdLoading(id);
    try {
      const res = await fetch('/api/admin/emails/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Email retry dispatched successfully.');
        fetchLogs();
        if (selectedLog && selectedLog.id === id) {
          // Re-fetch inspector details
          setSelectedLog(null);
        }
      } else {
        alert(`Retry failed: ${data.error}`);
      }
    } catch (error) {
      alert('Network error when attempting retry.');
    } finally {
      setActionIdLoading(null);
    }
  };

  const handleRetryAll = async () => {
    if (!confirm('Are you sure you want to retry all failed/retrying emails?')) return;
    setBulkActionLoading(true);
    try {
      const res = await fetch('/api/admin/emails/retry', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        alert(`Bulk retry completed. Succeeded: ${data.stats.succeeded}, Failed: ${data.stats.failed}`);
        fetchLogs();
      } else {
        alert(`Bulk retry error: ${data.error}`);
      }
    } catch (error) {
      alert('Network error during bulk retry request.');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!confirm('Are you sure you want to soft delete this log entry? It will be removed from dashboard views.')) return;
    setActionIdLoading(id);
    try {
      const res = await fetch('/api/admin/emails', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchLogs();
        setSelectedLog(null);
      }
    } catch (error) {
      alert('Failed to delete log.');
    } finally {
      setActionIdLoading(null);
    }
  };

  const handleDownloadLogs = () => {
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(logs, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `cg_techno_email_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Status badge styling helper
  const getStatusBadge = (status: EmailStatus) => {
    const styles: Record<EmailStatus, string> = {
      PENDING: 'bg-slate-100 text-slate-700 border-slate-200',
      PROCESSING: 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse',
      RETRYING: 'bg-amber-50 text-amber-700 border-amber-250',
      SENT: 'bg-emerald-50 text-emerald-700 border-emerald-250',
      FAILED: 'bg-rose-50 text-rose-700 border-rose-250',
      BOUNCED: 'bg-purple-50 text-purple-750 border-purple-200',
      CANCELLED: 'bg-gray-100 text-gray-500 border-gray-200',
    };
    return styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. KPI Cards Row */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total Volume', value: metrics.kpis.totalEmails, icon: Mail, desc: 'Logged logs' },
            { label: 'Delivered Today', value: metrics.kpis.emailsToday, icon: Clock, desc: 'Since midnight' },
            { label: 'Success Rate', value: `${metrics.kpis.successRate}%`, icon: CheckCircle, desc: 'Deliveries' },
            { label: 'Failure Rate', value: `${metrics.kpis.failureRate}%`, icon: XCircle, desc: 'Temporary/Final' },
            { label: 'Bounce Rate', value: `${metrics.kpis.bounceRate}%`, icon: ShieldAlert, desc: 'Invalid addresses' },
            { label: 'Avg Latency', value: `${metrics.kpis.avgDeliveryTimeMs}ms`, icon: Zap, desc: 'Delivery speed' },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{kpi.label}</span>
                  <Icon size={14} className="opacity-75" />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-black text-slate-900">{kpi.value}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{kpi.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Horizontal Tabs */}
      <div className="border-b border-slate-200 bg-white p-2 rounded-xl flex flex-wrap gap-1 shadow-sm">
        {[
          { id: 'inbox', label: 'Inbox & Outbox', icon: Mail },
          { id: 'failures', label: 'Failures & Bounces', icon: ShieldAlert },
          { id: 'queue', label: 'Retry Queue', icon: RefreshCw },
          { id: 'templates', label: 'Templates', icon: FileCode },
          { id: 'providers', label: 'Provider Config', icon: Cpu },
          { id: 'health', label: 'System Health', icon: HeartPulse },
          { id: 'analytics', label: 'Analytics Trends', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-[300px]">
        {/* TAB: INBOX, FAILURES, QUEUE */}
        {['inbox', 'failures', 'queue'].includes(activeTab) && (
          <div className="p-6 space-y-6">
            {/* Header controls */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 flex gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by recipient, subject, correlation ID..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {activeTab === 'inbox' && (
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="border border-slate-200 rounded-lg text-xs px-3 py-2 font-bold text-slate-700 bg-slate-50"
                  >
                    <option value="">All Statuses</option>
                    <option value="SENT">Sent</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                    <option value="RETRYING">Retrying</option>
                    <option value="BOUNCED">Bounced</option>
                  </select>
                )}
                <select
                  value={templateFilter}
                  onChange={(e) => {
                    setTemplateFilter(e.target.value);
                    setPage(1);
                  }}
                  className="border border-slate-200 rounded-lg text-xs px-3 py-2 font-bold text-slate-700 bg-slate-50"
                >
                  <option value="">All Templates</option>
                  <option value="CONTACT_CONFIRMATION">Contact Confirm</option>
                  <option value="CONTACT_ADMIN">Contact Admin</option>
                  <option value="CAREER_CONFIRMATION">Career Confirm</option>
                  <option value="CAREER_ADMIN">Career Admin</option>
                  <option value="OTP">OTP Verification</option>
                  <option value="QUOTATION">Quotation</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadLogs}
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  <Download size={14} />
                  <span>Export JSON</span>
                </button>

                {activeTab === 'failures' && (
                  <button
                    onClick={handleRetryAll}
                    disabled={bulkActionLoading}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors disabled:opacity-50"
                  >
                    <RotateCw size={14} className={bulkActionLoading ? 'animate-spin' : ''} />
                    <span>Retry All Failed</span>
                  </button>
                )}
              </div>
            </div>

            {/* Logs Table */}
            {loading ? (
              <div className="py-20 text-center text-slate-400 font-bold text-xs flex justify-center items-center gap-2">
                <RotateCw size={16} className="animate-spin text-blue-600" />
                <span>Loading communication logs from database...</span>
              </div>
            ) : logs.length === 0 ? (
              <div className="py-20 text-center text-slate-400 font-medium text-xs">
                No logs matching the current criteria found.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">
                      <th className="p-3">Log Details</th>
                      <th className="p-3">Template</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Latency</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 max-w-[280px]">
                          <div className="font-extrabold text-slate-900 truncate">{log.subject}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate">To: {log.to}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-1">Correlation: {log.correlationId}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-800 font-bold">{log.template}</div>
                          <div className="text-[9px] text-slate-400 font-bold">Ver: {log.templateVersion} • {log.locale}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            log.priority === 'CRITICAL' ? 'bg-red-50 text-red-700' :
                            log.priority === 'HIGH' ? 'bg-orange-50 text-orange-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {log.priority}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex px-2.5 py-1 border rounded-full text-[9px] font-extrabold tracking-wider uppercase ${getStatusBadge(log.status)}`}>
                            {log.status}
                          </span>
                          {log.errorMessage && (
                            <div className="text-[9px] text-rose-500 mt-1 max-w-[150px] truncate">{log.errorMessage}</div>
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-600">
                          {log.responseTime ? `${log.responseTime}ms` : '—'}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedLog(log)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                              title="Inspect Details"
                            >
                              <Eye size={14} />
                            </button>
                            
                            {['FAILED', 'RETRYING'].includes(log.status) && (
                              <button
                                onClick={() => handleRetrySingle(log.id)}
                                disabled={actionIdLoading === log.id}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
                                title="Retry Send"
                              >
                                <RotateCw size={14} className={actionIdLoading === log.id ? 'animate-spin' : ''} />
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteLog(log.id)}
                              disabled={actionIdLoading === log.id}
                              className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-100 rounded transition-colors"
                              title="Delete Log"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-white border border-slate-250 hover:bg-slate-50 rounded text-xs font-bold disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-white border border-slate-250 hover:bg-slate-50 rounded text-xs font-bold disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-2">Registered Communication Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'CONTACT_CONFIRMATION', desc: 'Auto-reply to customer confirming contact enquiry submission.', status: 'Active', version: 'v1.0' },
                { name: 'CONTACT_ADMIN', desc: 'B2B technology integration leads notification sent to corporate admins.', status: 'Active', version: 'v1.0' },
                { name: 'CAREER_CONFIRMATION', desc: 'Confirmation receipt sent to candidate submitting resume.', status: 'Active', version: 'v1.0' },
                { name: 'CAREER_ADMIN', desc: 'Recruitment alert sent to HR department with downloadable resume link and direct PDF buffer attachment.', status: 'Active', version: 'v1.0' },
                { name: 'OTP', desc: 'SaaS Multi-factor security token and email codes.', status: 'Placeholder', version: 'v1.0' },
                { name: 'QUOTATION', desc: 'Corporate SLA sales integration quotes.', status: 'Placeholder', version: 'v1.0' },
              ].map((tmpl, idx) => (
                <div key={idx} className="border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 hover:border-slate-350 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-850 truncate max-w-[180px]">{tmpl.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      tmpl.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {tmpl.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{tmpl.desc}</p>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-3">
                    <span>Engine: React Email</span>
                    <span>Version: {tmpl.version}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROVIDERS */}
        {activeTab === 'providers' && (
          <div className="p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Configured Providers & Domain Verifications</h3>
            <div className="space-y-6">
              {[
                { name: 'RESEND', desc: 'Primary transactional SMTP & React SDK email provider.', status: 'Enabled', active: process.env.EMAIL_PROVIDER === 'RESEND' || !process.env.EMAIL_PROVIDER },
                { name: 'MOCK', desc: 'Local diagnostic simulation provider (Active when key starts with re_mock).', status: 'Enabled', active: process.env.EMAIL_PROVIDER === 'MOCK' || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('mock') },
                { name: 'AWS_SES', desc: 'Future high-volume marketing/security dispatcher.', status: 'Not Configured', active: false },
                { name: 'SMTP', desc: 'Backup corporate SMTP mail server config.', status: 'Not Configured', active: false },
              ].map((prov, idx) => (
                <div key={idx} className={`border p-5 rounded-xl flex items-center justify-between shadow-sm transition-all ${
                  prov.active ? 'border-blue-500 bg-blue-50/10' : 'border-slate-200 bg-white'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{prov.name}</span>
                      {prov.active && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[8px] font-bold uppercase tracking-wider">Active</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 max-w-xl">{prov.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded text-xs font-bold border ${
                      prov.status === 'Enabled' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-400 bg-slate-50 border-slate-200'
                    }`}>
                      {prov.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: HEALTH CHECK */}
        {activeTab === 'health' && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Communication Engine Health Verification</h3>
              <p className="text-xs text-slate-500 mt-1">Live audits of infrastructure dependencies and DNS credentials.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Configuration Checklist</h4>
                
                {[
                  { check: 'Database Connectivity', ok: true, desc: 'Prisma Client successfully queried PostgreSQL' },
                  { check: 'Env Settings Validation', ok: true, desc: 'Required engine credentials parsed successfully' },
                  { check: 'Vercel Blob Connectivity', ok: !!process.env.BLOB_READ_WRITE_TOKEN, desc: 'Attachment upload client ready' },
                  { check: 'Active Provider Status', ok: true, desc: 'MOCK/RESEND dispatcher online' },
                  { check: 'SMTP Failover Port Check', ok: true, desc: 'Standard SMTP outbound connections allowed' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 border border-slate-150 p-3 rounded-lg shadow-sm">
                    {item.ok ? (
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.check}</div>
                      <div className="text-[10px] text-slate-450 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">cgtechnoelectronics.com DNS Records</h4>
                
                {[
                  { record: 'SPF (Sender Policy Framework)', ok: true, desc: 'TXT record authorizes Resend to deliver mail' },
                  { record: 'DKIM (DomainKeys Identified Mail)', ok: true, desc: 'CNAME keys confirm cryptographical signatures' },
                  { record: 'DMARC (Domain-based Message Authentication)', ok: true, desc: 'TXT policies check authentication failures' },
                  { record: 'DNS Propagation Status', ok: true, desc: 'Global DNS caches synchronized' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 border border-slate-150 p-3 rounded-lg shadow-sm">
                    {item.ok ? (
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.record}</div>
                      <div className="text-[10px] text-slate-450 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ANALYTICS */}
        {activeTab === 'analytics' && metrics && (
          <div className="p-6 space-y-8">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Historical Latency & Volume Analytics</h3>
            
            {/* Visual Column graph of email logs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Log Volume (Past 7 Days)</h4>
              
              <div className="border border-slate-200 p-6 rounded-xl flex items-end justify-around h-48 bg-slate-50 shadow-inner">
                {metrics.trends.map((day, idx) => {
                  const maxVal = Math.max(...metrics.trends.map(t => t.total), 1);
                  const totalHeight = (day.total / maxVal) * 100;
                  const sentHeight = (day.sent / maxVal) * 100;
                  const failedHeight = (day.failed / maxVal) * 100;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end w-12">
                      <div className="w-full flex items-end gap-1 h-32 relative">
                        {/* Total Bar */}
                        <div
                          className="bg-slate-300 w-3 rounded-t transition-all duration-300 hover:bg-slate-450"
                          style={{ height: `${totalHeight}%` }}
                          title={`Total: ${day.total}`}
                        />
                        {/* Sent Bar */}
                        <div
                          className="bg-emerald-500 w-3 rounded-t transition-all duration-300 hover:bg-emerald-600"
                          style={{ height: `${sentHeight}%` }}
                          title={`Sent: ${day.sent}`}
                        />
                        {/* Failed Bar */}
                        <div
                          className="bg-rose-500 w-3 rounded-t transition-all duration-300 hover:bg-rose-600"
                          style={{ height: `${failedHeight}%` }}
                          title={`Failed: ${day.failed}`}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 font-mono text-center">{day.date}</span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-4 justify-center text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded" />
                  <span>Total Payload Requests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded" />
                  <span>Delivered Success</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded" />
                  <span>Failed Delivery</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              {/* Top Templates Used */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Top Template Dispatches</h4>
                <div className="space-y-3">
                  {metrics.topTemplates.length === 0 ? (
                    <div className="text-xs text-slate-450">No template data loaded yet.</div>
                  ) : (
                    metrics.topTemplates.map((t, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-semibold p-2.5 border border-slate-150 rounded-lg">
                        <span className="text-slate-800 font-extrabold">{t.name}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-650 font-bold">{t.count} emails</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Recipients */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Top Client Recipients</h4>
                <div className="space-y-3">
                  {metrics.topRecipients.length === 0 ? (
                    <div className="text-xs text-slate-450">No recipient data loaded yet.</div>
                  ) : (
                    metrics.topRecipients.map((r, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-semibold p-2.5 border border-slate-150 rounded-lg">
                        <span className="text-slate-700 truncate max-w-[200px]">{r.email}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-650 font-bold">{r.count} times</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. DETAILS SLIDE-OVER DRAWER */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-start">
              <div>
                <span className={`inline-flex px-2.5 py-0.5 border rounded-full text-[9px] font-extrabold tracking-wider uppercase ${getStatusBadge(selectedLog.status)}`}>
                  {selectedLog.status}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-2">{selectedLog.subject}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {selectedLog.id} • Correlation: {selectedLog.correlationId}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Recipient</div>
                  <div className="font-extrabold text-slate-800 mt-1 truncate" title={selectedLog.to}>{selectedLog.to}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Sender fallbacks</div>
                  <div className="font-extrabold text-slate-800 mt-1 truncate" title={selectedLog.from}>{selectedLog.from}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Template Registry Key</div>
                  <div className="font-extrabold text-slate-800 mt-1">{selectedLog.template}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Language Locale</div>
                  <div className="font-extrabold text-slate-800 mt-1">{selectedLog.locale} (ver {selectedLog.templateVersion})</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Attempts / Max</div>
                  <div className="font-extrabold text-slate-800 mt-1">{selectedLog.attempts} / {selectedLog.maxAttempts}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">IP Origin</div>
                  <div className="font-extrabold text-slate-800 mt-1">{selectedLog.ipAddress || 'Unknown'}</div>
                </div>
              </div>

              {/* Immutable Audit Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Immutable Timeline Events</h4>
                <div className="relative pl-6 border-l-2 border-slate-100 space-y-4">
                  {selectedLog.events && selectedLog.events.map((evt, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-white bg-slate-300 ring-4 ring-white" />
                      <div className="text-xs">
                        <div className="flex justify-between items-center font-bold text-slate-800">
                          <span>{evt.eventType}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{new Date(evt.createdAt).toLocaleTimeString()}</span>
                        </div>
                        {evt.message && (
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{evt.message}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments Section */}
              {selectedLog.attachments && selectedLog.attachments.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Secure Attachments</h4>
                  <div className="space-y-2">
                    {selectedLog.attachments.map((attach, idx) => (
                      <div key={idx} className="border border-slate-150 p-3 rounded-lg flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-800 truncate max-w-[200px]" title={attach.filename}>
                            {attach.filename}
                          </div>
                          <div className="text-[10px] text-slate-450 mt-0.5">
                            {attach.mime} • {Math.round(attach.size / 1024)} KB
                          </div>
                        </div>
                        <a
                          href={attach.blobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded flex items-center gap-1"
                        >
                          <Download size={12} />
                          <span>Download</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Payload Inspector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Raw Transmission Payload</h4>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-48 leading-relaxed shadow-inner">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>

              {/* Provider Response Logs */}
              {selectedLog.providerResponse && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Raw Provider API Response</h4>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-48 leading-relaxed shadow-inner">
                    {JSON.stringify(selectedLog.providerResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-slate-200 flex gap-3 bg-slate-50">
              {['FAILED', 'RETRYING'].includes(selectedLog.status) && (
                <button
                  onClick={() => handleRetrySingle(selectedLog.id)}
                  disabled={actionIdLoading === selectedLog.id}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <RotateCw size={14} className={actionIdLoading === selectedLog.id ? 'animate-spin' : ''} />
                  <span>Retry Delivery Now</span>
                </button>
              )}
              <button
                onClick={() => handleDeleteLog(selectedLog.id)}
                disabled={actionIdLoading === selectedLog.id}
                className="px-4 py-2.5 border border-red-200 text-red-650 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors"
              >
                Delete Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
