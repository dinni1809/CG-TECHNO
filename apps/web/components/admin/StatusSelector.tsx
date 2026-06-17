'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';

interface StatusSelectorProps {
  id: string;
  initialStatus: string;
}

export function StatusSelector({ id, initialStatus }: StatusSelectorProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const statuses = ['NEW', 'CONTACTED', 'QUOTATION_SENT', 'NEGOTIATION', 'WON', 'LOST'];

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus(newStatus);
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={status}
          disabled={loading}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`appearance-none bg-white border border-gray-200 text-xs font-bold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer disabled:opacity-50 transition-all shadow-sm ${
            status === 'NEW'
              ? 'text-amber-700 border-amber-200 bg-amber-50'
              : status === 'CONTACTED'
              ? 'text-blue-700 border-blue-200 bg-blue-50'
              : status === 'WON'
              ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
              : status === 'LOST'
              ? 'text-red-700 border-red-200 bg-red-50'
              : status === 'QUOTATION_SENT'
              ? 'text-cyan-700 border-cyan-200 bg-cyan-50'
              : 'text-purple-700 border-purple-200 bg-purple-50'
          }`}
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-white text-gray-900 font-sans text-sm font-normal">
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      {loading && <Loader2 size={14} className="animate-spin text-primary-500" />}
      {success && <Check size={14} className="text-emerald-500" />}
    </div>
  );
}
