'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ChartDataPoint {
  date: string;
  count: number;
}

interface DashboardChartsProps {
  enquiry7Days: ChartDataPoint[];
  enquiry30Days: ChartDataPoint[];
  application7Days: ChartDataPoint[];
  application30Days: ChartDataPoint[];
}

export function DashboardCharts({
  enquiry7Days,
  enquiry30Days,
  application7Days,
  application30Days,
}: DashboardChartsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [enquiryPeriod, setEnquiryPeriod] = useState<'7' | '30'>('7');
  const [applicationPeriod, setApplicationPeriod] = useState<'7' | '30'>('7');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentEnquiryData = enquiryPeriod === '7' ? enquiry7Days : enquiry30Days;
  const currentApplicationData = applicationPeriod === '7' ? application7Days : application30Days;

  // Render a clean loading skeleton if component is not mounted yet in the browser
  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-5 w-40 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center text-sm text-gray-400 font-medium">
              Loading charts...
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render empty state if there is no data at all
  const isEnquiryEmpty = currentEnquiryData.every(d => d.count === 0);
  const isApplicationEmpty = currentApplicationData.every(d => d.count === 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 1. Lead Generation (Enquiry) Chart */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="flex flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">Lead Generation Trend</h3>
            <p className="text-xs text-gray-500 mt-0.5">Enquiries submitted over time</p>
          </div>
          <div className="inline-flex bg-slate-100 border border-gray-200 p-0.5 rounded-lg">
            <button
              onClick={() => setEnquiryPeriod('7')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                enquiryPeriod === '7'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setEnquiryPeriod('30')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                enquiryPeriod === '30'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {isEnquiryEmpty ? (
          <div className="h-64 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-gray-200 rounded-xl text-gray-400 font-medium">
            <p className="text-sm font-semibold">No enquiry data logged</p>
            <p className="text-xs mt-1 text-gray-400">Enquiries will plot once submitted</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentEnquiryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnquiry" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: '#1e293b' }}
                  itemStyle={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Enquiries"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorEnquiry)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* 2. Recruitment (Application) Chart */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="flex flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">Recruitment Trend</h3>
            <p className="text-xs text-gray-500 mt-0.5">Career applications submitted over time</p>
          </div>
          <div className="inline-flex bg-slate-100 border border-gray-200 p-0.5 rounded-lg">
            <button
              onClick={() => setApplicationPeriod('7')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                applicationPeriod === '7'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setApplicationPeriod('30')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                applicationPeriod === '30'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {isApplicationEmpty ? (
          <div className="h-64 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-gray-200 rounded-xl text-gray-400 font-medium">
            <p className="text-sm font-semibold">No application data logged</p>
            <p className="text-xs mt-1 text-gray-400">Applications will plot once submitted</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentApplicationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplication" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: '#1e293b' }}
                  itemStyle={{ fontSize: '12px', color: '#7c3aed', fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Applications"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorApplication)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
