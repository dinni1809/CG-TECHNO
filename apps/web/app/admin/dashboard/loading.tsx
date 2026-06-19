import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header Skeleton Mock */}
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="h-6 w-36 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-pulse">
        {/* Welcome Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-250 rounded-xl"></div>
            <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-11 w-44 bg-gray-250 rounded-xl"></div>
        </div>

        {/* Section Heading: Enquiry KPIs */}
        <div className="space-y-4">
          <div className="h-5 w-40 bg-gray-250 rounded-lg"></div>
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="h-3.5 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-250 rounded-lg"></div>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-xl border border-gray-150"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading: Application KPIs */}
        <div className="space-y-4">
          <div className="h-5 w-40 bg-gray-250 rounded-lg"></div>
          {/* 5 Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-12 bg-gray-250 rounded"></div>
                </div>
                <div className="h-8 w-8 bg-gray-100 rounded-lg border border-gray-150"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading: Analytics Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-5 w-48 bg-gray-250 rounded-lg"></div>
                <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
              </div>
              {/* Chart Plot Area Skeleton */}
              <div className="h-64 bg-gray-100 rounded-xl border border-gray-150 flex items-center justify-center">
                <div className="h-8 w-32 bg-gray-200 rounded-lg animate-bounce"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Services (Col 1) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 lg:col-span-1">
            <div className="h-5 w-40 bg-gray-250 rounded-lg mb-6"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-8 bg-gray-250 rounded-lg"></div>
              </div>
            ))}
          </div>

          {/* Recent Activity (Col 2 & 3) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 lg:col-span-2">
            <div className="h-5 w-40 bg-gray-250 rounded-lg mb-6"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-start py-3">
                <div className="h-9 w-9 bg-gray-100 border border-gray-200 rounded-full shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 bg-gray-250 rounded"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Skeletons */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="h-5 w-44 bg-gray-250 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 w-full bg-gray-100 rounded-lg"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
