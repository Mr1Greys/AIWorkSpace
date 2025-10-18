'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Briefcase,
  Folder,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  DollarSign,
  Star,
  FileText,
  Search,
} from 'lucide-react';
import { cn } from '@aiworkspace/ui';
import { useRole } from '@/contexts/RoleContext';

// Навигация для исполнителя
const freelancerNavigation = [
  { name: 'Обзор', href: '/dashboard', icon: Home, badge: null },
  { name: 'Мои отклики', href: '/dashboard/my-bids', icon: Search, badge: 3 },
  { name: 'Портфолио', href: '/dashboard/portfolio', icon: Folder, badge: null },
  { name: 'Команды', href: '/dashboard/teams', icon: Users, badge: 1 },
  { name: 'Сообщения', href: '/dashboard/messages', icon: MessageSquare, badge: 5 },
  { name: 'Отзывы', href: '/dashboard/reviews', icon: Star, badge: null },
  { name: 'Финансы', href: '/dashboard/finances', icon: DollarSign, badge: null },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings, badge: null },
];

// Навигация для заказчика
const clientNavigation = [
  { name: 'Обзор', href: '/dashboard', icon: Home, badge: null },
  { name: 'Мои проекты', href: '/dashboard/my-projects', icon: Briefcase, badge: 5 },
  { name: 'Исполнители', href: '/dashboard/hired-freelancers', icon: Users, badge: null },
  { name: 'Сообщения', href: '/dashboard/messages', icon: MessageSquare, badge: 3 },
  { name: 'Финансы', href: '/dashboard/finances', icon: DollarSign, badge: null },
  { name: 'Отзывы', href: '/dashboard/reviews', icon: Star, badge: null },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings, badge: null },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole } = useRole();
  const navigation = currentRole === 'freelancer' ? freelancerNavigation : clientNavigation;

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-[#F3F4F6] bg-white">
      <nav className="flex h-full flex-col p-4">
        <div className="flex-1 space-y-1">
          {navigation.map((item) => {
            // Точное совпадение для /dashboard, иначе проверка начала пути
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' || pathname?.startsWith('/dashboard/overview')
              : pathname?.startsWith(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center justify-between rounded-[10px] px-3 py-2.5 text-[14px] font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                    : 'text-[#4B5563] hover:bg-[#F3F4F6]'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
                {item.badge && item.badge > 0 && (
                  <span className={cn(
                    'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EF4444] text-white'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-[#F3F4F6] pt-4">
          <Link
            href="/auth/signin"
            className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium text-[#EF4444] transition-all duration-200 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Выход
          </Link>
        </div>
      </nav>
    </aside>
  );
}
