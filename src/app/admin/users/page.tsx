"use client";

import { useState, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Check,
  X,
  User,
  ShieldCheck,
  Ban,
  MoreVertical,
  Mail,
  Phone
} from 'lucide-react';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

const kycStatusStyles = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

const kycStatusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: AlertCircle,
};

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: any = await api.get('/admin/users');
      const usersData = response.data?.data || response.data?.docs || response.data || [];
      
      const normalizedUsers = usersData.map((u: any) => ({
        ...u,
        company: u.companyName || u.company || 'N/A',
        kycStatus: u.kyc?.status || u.kycStatus || 'pending'
      }));
      
      setUsers(normalizedUsers);
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveKYC = async (id: string) => {
    setIsUpdating(id);
    try {
      await api.put(`/admin/users/${id}/approve-kyc`, {});
      await fetchUsers();
    } catch (err: any) {
      console.error('Failed to approve KYC:', err);
      alert(err.message || 'Failed to approve KYC');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleBlockUser = async (id: string, isBlocked: boolean) => {
    setIsUpdating(id);
    try {
      const endpoint = isBlocked ? `/admin/users/${id}/unblock` : `/admin/users/${id}/block`;
      await api.put(endpoint, {});
      await fetchUsers();
    } catch (err: any) {
      console.error('Failed to update block status:', err);
      alert(err.message || 'Failed to update block status');
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const name = user.name || '';
    const email = user.email || '';
    const company = user.company || '';
    
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           company.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage users, KYC status and permissions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50/80">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Company & Info</th>
                <th className="px-6 py-4">KYC Status</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
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
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : filteredUsers.map((user) => {
                const KycIcon = kycStatusIcons[user.kycStatus as keyof typeof kycStatusIcons] || Clock;
                return (
                  <tr key={user._id || user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 font-bold shadow-sm">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{user.name}</span>
                          <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{user.company || 'N/A'}</span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{user.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border",
                        kycStatusStyles[user.kycStatus as keyof typeof kycStatusStyles] || kycStatusStyles.pending
                      )}>
                        <KycIcon className="h-3 w-3" />
                        {user.kycStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                        user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === 'superadmin' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        'bg-gray-50 text-gray-700 border-gray-100'
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "h-2 w-2 rounded-full inline-block mr-2",
                        user.isBlocked ? 'bg-red-500' : 'bg-emerald-500'
                      )} />
                      <span className="text-sm text-gray-700">{user.isBlocked ? 'Blocked' : 'Active'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.kycStatus === 'pending' && (
                          <button
                            onClick={() => handleApproveKYC(user._id || user.id)}
                            disabled={isUpdating === (user._id || user.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve KYC"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleBlockUser(user._id || user.id, user.isBlocked)}
                          disabled={isUpdating === (user._id || user.id)}
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            user.isBlocked ? "text-emerald-600 hover:bg-emerald-50" : "text-red-600 hover:bg-red-50"
                          )}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
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
