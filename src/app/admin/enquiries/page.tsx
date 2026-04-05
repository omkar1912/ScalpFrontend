"use client";

import { useState, useEffect } from 'react';
import { 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { api } from '@/lib/api-client';
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

export default function AdminEnquiryManagement() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = filterStatus === 'all' ? '/enquiries/all' : `/enquiries/all?status=${filterStatus}`;
      const response: any = await api.get(url);
      const data = response.data?.data ?? response.data?.docs ?? response.data ?? [];
        setEnquiries(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to fetch enquiries:', err);
      setError(err.message || 'Failed to fetch enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setIsUpdating(id);
    try {
      await api.put(`/enquiries/${id}/status`, { status });
      await fetchEnquiries();
    } catch (err: any) {
      console.error('Failed to update status:', err);
      alert(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const material = enquiry.material || '';
    const name = enquiry.name || (enquiry.userId?.name) || '';
    const email = enquiry.email || (enquiry.userId?.email) || '';
    
    return material.toLowerCase().includes(searchQuery.toLowerCase()) ||
           name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleExportCSV = () => {
    // Basic CSV export logic
    const headers = ['ID', 'Type', 'Name', 'Email', 'Material', 'Status', 'Date'];
    const rows = filteredEnquiries.map(e => [
      e._id || e.id,
      e.type,
      e.name || e.userId?.name || 'N/A',
      e.email || e.userId?.email || 'N/A',
      e.material,
      e.status,
      new Date(e.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(r => r.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `enquiries_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiry Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage all buy/sell enquiries</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by material, name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50/80">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : filteredEnquiries.map((enquiry) => {
                const StatusIcon = statusIcons[enquiry.status as keyof typeof statusIcons] || Clock;
                return (
                  <tr key={enquiry._id || enquiry.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{enquiry.name || enquiry.userId?.name || 'Guest'}</span>
                        <span className="text-xs text-gray-500">{enquiry.email || enquiry.userId?.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                        enquiry.type === 'buy' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      )}>
                        {enquiry.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{enquiry.material}</span>
                        <span className="text-xs text-gray-500">{enquiry.quantity} {enquiry.unit || 'kg'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border",
                        statusStyles[enquiry.status as keyof typeof statusStyles] || statusStyles.pending
                      )}>
                        <StatusIcon className="h-3 w-3" />
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {enquiry.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(enquiry._id || enquiry.id, 'approved')}
                              disabled={isUpdating === (enquiry._id || enquiry.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(enquiry._id || enquiry.id, 'rejected')}
                              disabled={isUpdating === (enquiry._id || enquiry.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
