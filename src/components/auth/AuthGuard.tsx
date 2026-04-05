'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if current path is a protected route
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isAdminRoute = pathname.startsWith('/admin');

    if (isDashboardRoute || isAdminRoute) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        setAuthorized(false);
        router.push('/login');
        return;
      }

      const user = JSON.parse(userStr);

      // Check for Admin routes
      if (isAdminRoute && user.role !== 'admin' && user.role !== 'superadmin') {
        setAuthorized(false);
        router.push('/dashboard');
        return;
      }

      setAuthorized(true);
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
