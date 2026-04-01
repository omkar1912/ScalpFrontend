"use client";

import Link from 'next/link';
import { FileText, CheckCircle, Clock, AlertCircle, ArrowRight, Bell } from 'lucide-react';
import { DASHBOARD_USER, DASHBOARD_STATS, RECENT_ENQUIRIES, NOTIFICATIONS } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: AlertCircle,
};

export default function DashboardPage() {
  const recentNotifications = NOTIFICATIONS.filter(n => !n.read).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {DASHBOARD_USER.name}!
        </h1>
        <p className="text-primary-100 text-sm sm:text-base max-w-xl">
          Here&apos;s an overview of your activity on ScrapMarket. Manage your enquiries and stay updated with the latest market trends.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{DASHBOARD_STATS.totalEnquiries}</p>
          <p className="text-sm text-gray-500 mt-1">Total Enquiries</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{DASHBOARD_STATS.activeEnquiries}</p>
          <p className="text-sm text-gray-500 mt-1">Active Enquiries</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{DASHBOARD_STATS.completedEnquiries}</p>
          <p className="text-sm text-gray-500 mt-1">Completed</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{DASHBOARD_STATS.pendingApprovals}</p>
          <p className="text-sm text-gray-500 mt-1">Pending Approvals</p>
        </div>
      </div>

      {/* Recent Enquiries & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Enquiries</h2>
            <Link
              href="/dashboard/enquiries"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Material</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ENQUIRIES.map((enquiry) => {
                  const StatusIcon = statusIcons[enquiry.status];
                  return (
                    <tr key={enquiry.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{enquiry.id}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{enquiry.material}</td>
                      <td className="px-5 py-4">
                        <span className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-full",
                          enquiry.type === 'buy' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                        )}>
                          {enquiry.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
                          statusStyles[enquiry.status]
                        )}>
                          <StatusIcon className="h-3 w-3" />
                          {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <Link
              href="/dashboard/notifications"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 p-3 rounded-xl bg-primary-50/50 border border-primary-100/50"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{notification.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No new notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
