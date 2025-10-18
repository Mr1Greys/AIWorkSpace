'use client';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleProvider } from '@/contexts/RoleContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
