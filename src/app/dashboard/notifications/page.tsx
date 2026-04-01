"use client";

import { Bell, TrendingUp, FileText, Settings, CheckCircle } from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

const typeIcons = {
  enquiry_update: FileText,
  price_update: TrendingUp,
  system: Settings,
};

const typeColors = {
  enquiry_update: 'bg-blue-50 text-blue-600',
  price_update: 'bg-amber-50 text-amber-600',
  system: 'bg-purple-50 text-purple-600',
};

export default function NotificationsPage() {
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {NOTIFICATIONS.map((notification) => {
          const Icon = typeIcons[notification.type];
          return (
            <div
              key={notification.id}
              className={cn(
                "flex gap-4 p-5 transition-colors",
                !notification.read ? "bg-primary-50/30" : "hover:bg-gray-50/50"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                typeColors[notification.type]
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn(
                    "text-sm font-medium",
                    !notification.read ? "text-gray-900" : "text-gray-700"
                  )}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(notification.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {NOTIFICATIONS.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-lg font-medium text-gray-900 mb-1">No notifications yet</p>
          <p className="text-sm text-gray-500">You&apos;ll be notified when there are updates to your enquiries or price changes.</p>
        </div>
      )}
    </div>
  );
}
