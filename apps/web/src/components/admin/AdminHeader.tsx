'use client';

import { Bell, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { adminCredentialsHint } from '@/contexts/AdminAuthContext';

export function AdminHeader() {
  const { logout } = useAdminAuth();
  const now = format(new Date(), "d MMMM yyyy, HH:mm", { locale: ru });

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Консоль администратора</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="h-4 w-4" />
            <span>{now}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500 sm:block">
            demo: {adminCredentialsHint.email} / {adminCredentialsHint.password}
          </div>
          <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
          </button>
          <button
            onClick={logout}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
