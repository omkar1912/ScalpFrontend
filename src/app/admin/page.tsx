"use client";

import { DASHBOARD_STATS, RECENT_ENQUIRIES } from '@/lib/dashboard-data';
import { ADMIN_STATS } from '@/lib/admin-data';
import { 
  Users, 
  FileText, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: ADMIN_STATS.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Listings', value: ADMIN_STATS.activeListings, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending KYC', value: ADMIN_STATS.pendingKYC, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Revenue', value: ADMIN_STATS.totalRevenue, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of system performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Enquiries</h3>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ENQUIRIES.slice(0, 5).map((enquiry) => (
              <div key={enquiry.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    enquiry.type === 'buy' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  )}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{enquiry.material}</p>
                    <p className="text-xs text-gray-500">{enquiry.id} • {enquiry.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                  enquiry.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  enquiry.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-red-50 text-red-700 border-red-100'
                )}>
                  {enquiry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group">
                <CheckCircle className="h-6 w-6 text-emerald-600 mb-2" />
                <p className="text-sm font-bold text-gray-900">Approve KYC</p>
                <p className="text-xs text-gray-500">{ADMIN_STATS.pendingKYC} pending</p>
              </button>
              <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group">
                <ShoppingBag className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-sm font-bold text-gray-900">Review Listings</p>
                <p className="text-xs text-gray-500">12 new today</p>
              </button>
              <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <p className="text-sm font-bold text-gray-900">User Growth</p>
                <p className="text-xs text-gray-500">+15% this month</p>
              </button>
              <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group">
                <AlertCircle className="h-6 w-6 text-red-600 mb-2" />
                <p className="text-sm font-bold text-gray-900">System Alerts</p>
                <p className="text-xs text-gray-500">All systems normal</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
