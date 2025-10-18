'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Briefcase, Users, ShieldCheck, LogOut, FileWarning, Coins } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const navItems = [
  { label: 'Обзор', href: '/admin', icon: BarChart3 },
  { label: 'Пользователи', href: '/admin/users', icon: Users },
  { label: 'Проекты', href: '/admin/projects', icon: Briefcase },
  { label: 'Споры', href: '/admin/disputes', icon: FileWarning },
  { label: 'Финансы', href: '/admin/finance', icon: Coins },
  { label: 'Безопасность', href: '/admin/security', icon: ShieldCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <aside className="hidden w-72 flex-shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-gray-200 p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] text-white font-semibold">
            AI
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">AIWorkSpace</div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Admin Console
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#3B82F6]/10 to-[#6366F1]/10 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
