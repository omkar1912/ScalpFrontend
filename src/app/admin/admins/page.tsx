"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import { 
  Plus, Search, Edit, Trash2, Shield, ShieldCheck, Eye, EyeOff,
  Users, Clock, FileText, X, Check, AlertTriangle
} from 'lucide-react';

const defaultPermissions = {
  users: true, listings: true, enquiries: true, content: true, settings: false, analytics: true, manageAdmins: false
};

export default function AdminManagement() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', companyName: '', password: '', permissions: defaultPermissions });

  useEffect(() => { fetchAdmins(); }, [page]);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (searchQuery) params.append('search', searchQuery);
      const response: any = await api.get(`/admin/admins?${params.toString()}`);
      const data = response.data;
      setAdmins(data.data || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err: any) { console.error('Failed to fetch admins:', err); }
    finally { setIsLoading(false); }
  };

  const handleSearch = () => { setPage(1); fetchAdmins(); };

  const openModal = (admin?: any) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({ name: admin.name, email: admin.email, phone: admin.phone || '', companyName: admin.companyName || '', password: '', permissions: admin.permissions || defaultPermissions });
    } else {
      setEditingAdmin(null);
      setFormData({ name: '', email: '', phone: '', companyName: '', password: '', permissions: defaultPermissions });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingAdmin(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingAdmin) {
        await api.put(`/admin/admins/${editingAdmin._id}`, { name: formData.name, phone: formData.phone, companyName: formData.companyName, permissions: formData.permissions });
      } else {
        await api.post('/admin/admins', formData);
      }
      closeModal(); fetchAdmins();
    } catch (err: any) { alert(err.message || 'Failed to save admin'); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this admin?')) return;
    try {
      await api.delete(`/admin/admins/${id}`);
      fetchAdmins();
    } catch (err: any) { alert(err.message || 'Failed to delete admin'); }
  };

  const togglePermission = (key: string) => {
    setFormData({ ...formData, permissions: { ...formData.permissions, [key]: !formData.permissions[key] } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage admin accounts with permissions</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium">
          <Plus className="w-4 h-4" /> Create Admin
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex gap-4">
          <div className="relative flex-grow"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="text" placeholder="Search admins..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl" /></div>
          <button onClick={handleSearch} className="px-4 py-2.5 text-sm bg-primary-600 text-white rounded-xl font-medium">Search</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50/80"><th className="px-6 py-4">Admin</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Permissions</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Created</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? <tr><td colSpan={6} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div></td></tr> : admins.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No admins found.</td></tr> : admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4"><div className="flex items-center gap-4"><div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold">{admin.name?.charAt(0)}</div><div><div className="font-medium text-gray-900">{admin.name}</div><div className="text-xs text-gray-500">{admin.email}</div></div></div></td>
                  <td className="px-6 py-4"><span className={cn("text-xs font-bold px-2 py-1 rounded-full uppercase", admin.role === 'superadmin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700')}>{admin.role}</span></td>
                  <td className="px-6 py-4"><div className="flex gap-1 flex-wrap">{Object.entries(admin.permissions || {}).filter(([k, v]) => v).map(([key]) => <span key={key} className="text-xs px-2 py-0.5 bg-gray-100 rounded">{key}</span>).slice(0, 3)}</div></td>
                  <td className="px-6 py-4"><span className={cn("text-xs font-bold px-2 py-1 rounded-full", admin.isBlocked ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700')}>{admin.isBlocked ? 'Blocked' : 'Active'}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-1">
                    <button onClick={() => openModal(admin)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                    {admin.role !== 'superadmin' && <button onClick={() => handleDelete(admin._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>}
                  </div></td>
                </tr>))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (<div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between"><span className="text-sm text-gray-500">Page {page} of {totalPages} ({total} admins)</span><div className="flex gap-2"><button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50">Previous</button><button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50">Next</button></div></div>)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">{editingAdmin ? 'Edit Admin' : 'Create Admin'}</h2>
              <button onClick={closeModal}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required /></div>
              <div><label className="block text-sm font-medium mb-1">Email *</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required disabled={!!editingAdmin} /></div>
              {!editingAdmin && <div><label className="block text-sm font-medium mb-1">Password *</label><input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required minLength={6} /></div>}
              <div><label className="block text-sm font-medium mb-1">Phone</label><input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Company</label><input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div>
              
              <div><label className="block text-sm font-medium mb-2">Permissions</label><div className="grid grid-cols-2 gap-2">
                {Object.keys(defaultPermissions).map(key => (
                  <label key={key} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" checked={formData.permissions[key as keyof typeof defaultPermissions]} onChange={() => togglePermission(key)} className="w-4 h-4" />
                    <span className="text-sm capitalize">{key}</span>
                  </label>
                ))}
              </div></div>
              
              <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={closeModal} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl">Cancel</button><button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl disabled:opacity-50">{isSubmitting ? 'Saving...' : (editingAdmin ? 'Update' : 'Create')}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}