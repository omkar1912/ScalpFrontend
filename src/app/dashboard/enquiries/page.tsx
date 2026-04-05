"use client";

import { useState, useEffect } from 'react';
import { Eye, Trash2, RotateCcw, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { ALL_ENQUIRIES } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';

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

export default function EnquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: any = await api.get('/enquiries/my');
        const data = response.data?.data ?? response.data?.docs ?? response.data ?? [];
        setEnquiries(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error('Failed to fetch enquiries:', err);
        setError(err.message || 'Failed to fetch enquiries');
        // Fallback to mock data
        setEnquiries(ALL_ENQUIRIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter(enquiry => {
    const material = enquiry.material || '';
    const id = enquiry.id || enquiry._id || '';
    const matchesSearch = material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || enquiry.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Enquiries</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all your buy/sell enquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by material or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/80">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEnquiries.map((enquiry) => {
                const StatusIcon = statusIcons[enquiry.status as keyof typeof statusIcons] || Clock;
                return (
                  <tr key={enquiry.id || enquiry._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{enquiry.id || enquiry._id}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        enquiry.type === 'buy' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      )}>
                        {enquiry.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{enquiry.material}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{enquiry.quantity}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{enquiry.price || enquiry.expectedPrice}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
                        statusStyles[enquiry.status as keyof typeof statusStyles] || statusStyles.pending
                      )}>
                        <StatusIcon className="h-3 w-3" />
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(enquiry.date || enquiry.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {enquiry.status === 'rejected' && (
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Resubmit"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEnquiries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No enquiries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
