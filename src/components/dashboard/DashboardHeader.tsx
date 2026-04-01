"use client";

import Link from 'next/link';
import { Menu, Bell, LogOut, ChevronDown } from 'lucide-react';
import { DASHBOARD_USER, NOTIFICATIONS } from '@/lib/dashboard-data';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-sm font-semibold text-gray-800 hidden sm:block">
          Welcome back, <span className="text-primary-600">{DASHBOARD_USER.name.split(' ')[0]}</span>
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/dashboard/notifications"
          className="relative text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block" />

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-700">
              {DASHBOARD_USER.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 leading-tight">{DASHBOARD_USER.name}</p>
            <p className="text-xs text-gray-500 leading-tight">{DASHBOARD_USER.company}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
        </div>

        {/* Logout */}
        <Link
          href="/login"
          className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors ml-1"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
