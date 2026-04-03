"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ADMIN_MENU_ITEMS, SUPERADMIN_MENU_ITEMS } from '@/lib/admin-data';
import { DASHBOARD_USER } from '@/lib/dashboard-data';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // In a real app, this would be determined by the user's role from auth
  const isAdmin = true; 
  const isSuperAdmin = DASHBOARD_USER.id === 'u1'; // Mock superadmin check

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        menuItems={isSuperAdmin ? SUPERADMIN_MENU_ITEMS : ADMIN_MENU_ITEMS}
        title="Admin Panel"
      />
      
      <div className="lg:pl-64">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
