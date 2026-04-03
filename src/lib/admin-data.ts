import { DASHBOARD_USER, DASHBOARD_STATS, RECENT_ENQUIRIES } from './dashboard-data';
import { LayoutDashboard, FileText, ShoppingBag, Users, Settings, Newspaper, PieChart, ShieldCheck } from 'lucide-react';

export const ADMIN_MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Enquiry Management', href: '/admin/enquiries', icon: FileText },
  { name: 'Listing Management', href: '/admin/listings', icon: ShoppingBag },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Content & Blog', href: '/admin/content', icon: Newspaper },
  { name: 'Analytics', href: '/admin/analytics', icon: PieChart },
];

export const SUPERADMIN_MENU_ITEMS = [
  ...ADMIN_MENU_ITEMS,
  { name: 'Admin Management', href: '/admin/admins', icon: ShieldCheck },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export const ADMIN_STATS = {
  totalUsers: 1250,
  pendingKYC: 45,
  totalRevenue: '₹45,20,000',
  activeListings: 320,
};
