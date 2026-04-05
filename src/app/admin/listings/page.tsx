"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Eye, Trash2, Search, Filter, CheckCircle, Clock, AlertCircle,
  Check, X, Star, ShoppingBag, TrendingUp, Edit, DollarSign,
  BarChart3, Package, XCircle
} from 'lucide-react';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons = { pending: Clock, approved: CheckCircle, rejected: AlertCircle };

const CATEGORIES = ['Metals', 'Plastics', 'Paper', 'Electronics', 'Textiles', 'Glass', 'Rubber', 'Construction', 'Automotive', 'Other'];
const SECTORS = ['Ferrous', 'Non-Ferrous', 'Aluminum', 'Copper', 'Steel', 'Brass', 'Plastic Scrap', 'Paper Scrap', 'E-Waste', 'Textile Scrap'];

interface Listing {
  _id: string; title: string; description: string; price: number; unit: string; minOrder: number;
  category: string; subCategory: string; sector: string; material: string; grade: string;
  quantity: number; availableQuantity: number; location: string; city: string; state: string;
  images: string[]; status: string; isFeatured: boolean; views: number; inquiries: number;
  userId: { name: string; email: string; companyName?: string; }; createdAt: string; updatedAt: string;
}

export default function AdminListingManagement() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [priceData, setPriceData] = useState({ price: '', unit: '' });

  useEffect(() => { fetchListings(); fetchStats(); }, [filterStatus, filterCategory, page]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString()); params.append('limit', '10');
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterCategory) params.append('category', filterCategory);
      if (searchQuery) params.append('search', searchQuery);
      const response: any = await api.get(`/listings/admin/all?${params.toString()}`);
      const data = response.data;
      setListings(data.data || []); setTotalPages(data.totalPages || 1); setTotal(data.total || 0);
    } catch (err: any) { console.error('Failed to fetch listings:', err); }
    finally { setIsLoading(false); }
  };

  const fetchStats = async () => {
    try { const response: any = await api.get('/listings/admin/stats'); setStats(response.data); }
    catch (err) { console.error('Failed to fetch stats:', err); }
  };

  const handleSearch = () => { setPage(1); fetchListings(); };

  const handleUpdateStatus = async (id: string, status: string) => {
    setIsUpdating(id);
    try { await api.put(`/listings/${id}/status`, { status }); fetchListings(); fetchStats(); }
    catch (err: any) { alert(err.message || 'Failed to update status'); }
    finally { setIsUpdating(null); }
  };

  const handleToggleFeatured = async (id: string) => {
    setIsUpdating(id);
    try { await api.patch(`/listings/${id}/featured`); fetchListings(); }
    catch (err: any) { alert(err.message || 'Failed to toggle featured'); }
    finally { setIsUpdating(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing?')) return;
    try { await api.delete(`/listings/${id}`); fetchListings(); fetchStats(); }
    catch (err: any) { alert(err.message || 'Failed to delete'); }
  };

  const openEditModal = (listing: Listing) => { setEditingListing({ ...listing }); setIsEditModalOpen(true); };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.put(`/listings/${editingListing!._id}`, editingListing); setIsEditModalOpen(false); setEditingListing(null); fetchListings(); }
    catch (err: any) { alert(err.message || 'Failed to update'); }
  };

  const openPriceModal = (listing: Listing) => { setEditingListing(listing); setPriceData({ price: listing.price.toString(), unit: listing.unit }); setIsPriceModalOpen(true); };
  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.patch(`/listings/${editingListing!._id}/price`, { price: parseFloat(priceData.price), unit: priceData.unit }); setIsPriceModalOpen(false); fetchListings(); }
    catch (err: any) { alert(err.message || 'Failed to update price'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listing Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage all marketplace listings</p>
        </div>
        <button onClick={() => setShowAnalytics(!showAnalytics)} className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
          <BarChart3 className="w-4 h-4" />{showAnalytics ? 'Hide Analytics' : 'View Analytics'}
        </button>
      </div>

      {showAnalytics && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-primary-50 rounded-lg"><ShoppingBag className="w-5 h-5 text-primary-600" /></div><div><p className="text-xs text-gray-500 uppercase">Total</p><p className="text-xl font-bold">{stats.total}</p></div></div></div>
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-lg"><Clock className="w-5 h-5 text-amber-600" /></div><div><p className="text-xs text-gray-500 uppercase">Pending</p><p className="text-xl font-bold">{stats.pending}</p></div></div></div>
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle className="w-5 h-5 text-emerald-600" /></div><div><p className="text-xs text-gray-500 uppercase">Approved</p><p className="text-xl font-bold">{stats.approved}</p></div></div></div>
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-red-50 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600" /></div><div><p className="text-xs text-gray-500 uppercase">Rejected</p><p className="text-xl font-bold">{stats.rejected}</p></div></div></div>
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-purple-50 rounded-lg"><Star className="w-5 h-5 text-purple-600" /></div><div><p className="text-xs text-gray-500 uppercase">Featured</p><p className="text-xl font-bold">{stats.featured}</p></div></div></div>
          <div className="bg-white rounded-xl border border-gray-100 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-50 rounded-lg"><TrendingUp className="w-5 h-5 text-blue-600" /></div><div><p className="text-xs text-gray-500 uppercase">Avg Price</p><p className="text-xl font-bold">₹{Math.round(stats.avgPrice || 0)}</p></div></div></div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="text" placeholder="Search by title, category or seller..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20" /></div>
          <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-gray-400" /><select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5"><option value="all">All Status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select><select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }} className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5"><option value="">All Categories</option>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select><button onClick={handleSearch} className="px-4 py-2.5 text-sm bg-primary-600 text-white rounded-xl font-medium">Search</button></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50/80"><th className="px-6 py-4">Listing</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Seller</th><th className="px-6 py-4">Price/Unit</th><th className="px-6 py-4">Qty</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Featured</th><th className="px-6 py-4">Views</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? <tr><td colSpan={9} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div></td></tr> : listings.length === 0 ? <tr><td colSpan={9} className="px-6 py-12 text-center text-gray-500">No listings found.</td></tr> : listings.map((listing) => { const StatusIcon = statusIcons[listing.status as keyof typeof statusIcons] || Clock; return (
                <tr key={listing._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden">{listing.images?.[0] ? <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-gray-400" /></div>}</div><div className="flex flex-col"><span className="text-sm font-bold text-gray-900 line-clamp-1">{listing.title}</span><span className="text-xs text-gray-500">{listing.sector || listing.category}</span></div></div></td>
                  <td className="px-6 py-4"><span className="text-xs font-medium text-gray-600 uppercase">{listing.category}</span></td>
                  <td className="px-6 py-4"><div className="flex flex-col"><span className="text-sm font-medium text-gray-900">{listing.userId?.name || 'Unknown'}</span><span className="text-xs text-gray-500">{listing.userId?.companyName || listing.userId?.email}</span></div></td>
                  <td className="px-6 py-4"><div className="flex flex-col"><span className="text-sm font-bold text-gray-900">₹{listing.price}</span><span className="text-xs text-gray-500">per {listing.unit}</span></div></td>
                  <td className="px-6 py-4"><span className="text-sm text-gray-700">{listing.availableQuantity || listing.quantity || 0} {listing.unit}</span></td>
                  <td className="px-6 py-4"><span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border", statusStyles[listing.status as keyof typeof statusStyles] || statusStyles.pending)}><StatusIcon className="h-3 w-3" />{listing.status}</span></td>
                  <td className="px-6 py-4"><button onClick={() => handleToggleFeatured(listing._id)} className={cn("p-2 rounded-lg", listing.isFeatured ? "bg-amber-50 text-amber-600" : "text-gray-400 hover:bg-gray-100")}><Star className={cn("w-4 h-4", listing.isFeatured && "fill-current")} /></button></td>
                  <td className="px-6 py-4"><span className="text-sm text-gray-700">{listing.views || 0}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-1">
                    {listing.status === 'pending' && (<><button onClick={() => handleUpdateStatus(listing._id, 'approved')} disabled={isUpdating === listing._id} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Approve"><Check className="w-4 h-4" /></button><button onClick={() => handleUpdateStatus(listing._id, 'rejected')} disabled={isUpdating === listing._id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Reject"><X className="w-4 h-4" /></button></>)}
                    <button onClick={() => openPriceModal(listing)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit Price"><DollarSign className="w-4 h-4" /></button>
                    <button onClick={() => openEditModal(listing)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg" title="Edit"><Edit className="w-4 h-4" /></button>
                    <Link href={`/marketplace/${listing._id}`} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Eye className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(listing._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>);})}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (<div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between"><span className="text-sm text-gray-500">Page {page} of {totalPages} ({total} listings)</span><div className="flex gap-2"><button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50">Previous</button><button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50">Next</button></div></div>)}
      </div>

      {isEditModalOpen && editingListing && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl"><h2 className="text-xl font-bold">Edit Listing</h2><button onClick={() => { setIsEditModalOpen(false); setEditingListing(null); }}><XCircle className="w-5 h-5" /></button></div><form onSubmit={handleEditSubmit} className="p-6 space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Title *</label><input type="text" value={editingListing.title} onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required /></div><div><label className="block text-sm font-medium mb-1">Category *</label><select value={editingListing.category} onChange={(e) => setEditingListing({ ...editingListing, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required><option value="">Select Category</option>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div><div><label className="block text-sm font-medium mb-1">Sector</label><select value={editingListing.sector || ''} onChange={(e) => setEditingListing({ ...editingListing, sector: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"><option value="">Select Sector</option>{SECTORS.map(sec => <option key={sec} value={sec}>{sec}</option>)}</select></div><div><label className="block text-sm font-medium mb-1">Material</label><input type="text" value={editingListing.material || ''} onChange={(e) => setEditingListing({ ...editingListing, material: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div><div><label className="block text-sm font-medium mb-1">Grade</label><input type="text" value={editingListing.grade || ''} onChange={(e) => setEditingListing({ ...editingListing, grade: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div><div><label className="block text-sm font-medium mb-1">Quantity</label><input type="number" value={editingListing.quantity || ''} onChange={(e) => setEditingListing({ ...editingListing, quantity: parseInt(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div><div><label className="block text-sm font-medium mb-1">Unit</label><input type="text" value={editingListing.unit} onChange={(e) => setEditingListing({ ...editingListing, unit: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div><div><label className="block text-sm font-medium mb-1">Location</label><input type="text" value={editingListing.location || ''} onChange={(e) => setEditingListing({ ...editingListing, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div><div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea value={editingListing.description || ''} onChange={(e) => setEditingListing({ ...editingListing, description: e.target.value })} rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" /></div></div><div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => { setIsEditModalOpen(false); setEditingListing(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl">Cancel</button><button type="submit" className="px-6 py-2.5 bg-primary-600 text-white rounded-xl">Save Changes</button></div></form></div></div>)}

      {isPriceModalOpen && editingListing && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl shadow-xl w-full max-w-md"><div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl"><h2 className="text-xl font-bold">Update Price</h2><button onClick={() => { setIsPriceModalOpen(false); setEditingListing(null); }}><XCircle className="w-5 h-5" /></button></div><form onSubmit={handlePriceSubmit} className="p-6 space-y-4"><div><label className="block text-sm font-medium mb-1">Price *</label><input type="number" value={priceData.price} onChange={(e) => setPriceData({ ...priceData, price: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required min="0" step="0.01" /></div><div><label className="block text-sm font-medium mb-1">Unit *</label><select value={priceData.unit} onChange={(e) => setPriceData({ ...priceData, unit: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" required><option value="kg">per kg</option><option value="ton">per ton</option><option value="unit">per unit</option><option value="piece">per piece</option><option value="liter">per liter</option></select></div><div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => { setIsPriceModalOpen(false); setEditingListing(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl">Cancel</button><button type="submit" className="px-6 py-2.5 bg-primary-600 text-white rounded-xl">Update Price</button></div></form></div></div>)}
    </div>
  );
}