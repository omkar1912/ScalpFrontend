"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, FileText, Bell, Recycle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const defaultMenuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Profile', href: '/dashboard/profile', icon: User },
  { name: 'My Enquiries', href: '/dashboard/enquiries', icon: FileText },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: { name: string; href: string; icon: any }[];
  title?: string;
}

export function Sidebar({ isOpen, onClose, menuItems = defaultMenuItems, title = "ScrapMarket" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-7 w-7 text-primary-600" />
            <span className="text-lg font-bold text-gray-900 tracking-tight">{title}</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-600" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-primary-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary-700 mb-1">Need Help?</p>
            <p className="text-xs text-primary-600/70 mb-3">Contact our support team for assistance.</p>
            <Link
              href="/contact"
              className="block text-center text-xs font-semibold text-white bg-primary-600 rounded-lg py-2 hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
