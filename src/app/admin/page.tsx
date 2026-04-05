"use client";

import { useState, useEffect } from 'react';
import { 
  Users, FileText, ShoppingBag, TrendingUp, Clock, 
  CheckCircle, AlertCircle, DollarSign, BarChart3, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const statsResponse: any = await api.get('/admin/dashboard');
        setStats(statsResponse.data);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      }
      try {
        const enquiriesResponse: any = await api.get('/enquiries?limit=5');
        const data = enquiriesResponse.data?.data || enquiriesResponse.data || [];
        setRecentEnquiries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch enquiries:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats?.users?.total || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Approved Listings', value: stats?.listings?.approved || 0, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Listings', value: stats?.listings?.pending || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Enquiries', value: stats?.enquiries?.total || 0, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const chartData = stats?.monthlyEnquiries || [];
  const maxCount = Math.max(...chartData.map((d: any) => d.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of system performance and activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}><stat.icon className={cn("h-6 w-6", stat.color)} /></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{isLoading ? '-' : stat.value}</p>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Enquiries Trend (Last 6 Months)</h3>
          <div className="flex items-end gap-2 h-40">
            {chartData.map((d: any, idx: number) => {
              const height = (d.count / maxCount) * 100;
              const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary-100 rounded-t-lg relative" style={{ height: `${height}%`, minHeight: '4px' }}>
                    <div className="absolute bottom-0 w-full bg-primary-500 rounded-t-lg transition-all" style={{ height: '100%' }} />
                  </div>
                  <span className="text-xs text-gray-500">{monthNames[d.month - 1]}</span>
                  <span className="text-xs font-bold text-gray-700">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Enquiries</h3>
            <Link href="/admin/enquiries" className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {isLoading ? <div className="p-6 text-center text-gray-500">Loading...</div> : recentEnquiries.length === 0 ? <div className="p-6 text-center text-gray-500">No enquiries yet</div> : recentEnquiries.map((enquiry: any) => (
              <div key={enquiry._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", enquiry.type === 'buy' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600')}><FileText className="h-5 w-5" /></div>
                  <div><p className="text-sm font-semibold text-gray-900">{enquiry.material || enquiry.category}</p><p className="text-xs text-gray-500">{enquiry._id?.slice(-6)} • {new Date(enquiry.createdAt).toLocaleDateString()}</p></div>
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border", enquiry.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : enquiry.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700')}>{enquiry.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/listings" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <ShoppingBag className="h-6 w-6 text-purple-600 mb-2" /><p className="text-sm font-bold text-gray-900">Review Listings</p><p className="text-xs text-gray-500">{stats?.listings?.pending || 0} pending</p>
              </Link>
              <Link href="/admin/users" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <Users className="h-6 w-6 text-blue-600 mb-2" /><p className="text-sm font-bold text-gray-900">User Management</p><p className="text-xs text-gray-500">{stats?.users?.total || 0} users</p>
              </Link>
              <Link href="/admin/content" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <FileText className="h-6 w-6 text-emerald-600 mb-2" /><p className="text-sm font-bold text-gray-900">Content & Blog</p><p className="text-xs text-gray-500">Manage posts</p>
              </Link>
              <Link href="/admin/settings" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <AlertCircle className="h-6 w-6 text-amber-600 mb-2" /><p className="text-sm font-bold text-gray-900">Site Settings</p><p className="text-xs text-gray-500">Configure site</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
