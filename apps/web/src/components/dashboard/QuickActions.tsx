'use client';

import Link from 'next/link';
import { Plus, FileText, Send, Eye } from 'lucide-react';
import { UserRole } from '@/contexts/RoleContext';

interface QuickActionsProps {
  role: UserRole;
}

export function QuickActions({ role }: QuickActionsProps) {
  const freelancerActions = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: 'Добавить кейс',
      description: 'Покажите свои работы',
      href: '/dashboard/portfolio/new',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Найти проекты',
      description: 'Откликнитесь на заказы',
      href: '/projects',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: 'Мои отклики',
      description: 'Просмотрите статус',
      href: '/dashboard/my-bids',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const clientActions = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Найти специалистов',
      description: 'Выберите исполнителя',
      href: '/freelancers',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Мои проекты',
      description: 'Управляйте заказами',
      href: '/dashboard/my-projects',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const actions = role === 'freelancer' ? freelancerActions : clientActions;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {actions.map((action, index) => (
        <Link
          key={index}
          href={action.href}
          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-300 hover:bg-gray-50"
        >
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white`}
          >
            {action.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-gray-900">
              {action.title}
            </h3>
            <p className="mt-0.5 text-[13px] text-gray-500">
              {action.description}
            </p>
          </div>

          <svg 
            className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ))}
    </div>
  );
}
