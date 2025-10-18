'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Briefcase, User } from 'lucide-react';
import { UserRole } from '@/contexts/RoleContext';

interface RoleToggleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleToggle({ currentRole, onRoleChange }: RoleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleChange = (role: UserRole) => {
    onRoleChange(role);
    
    // Редирект на dashboard (route groups сами определят нужную страницу)
    if (pathname?.startsWith('/dashboard')) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="inline-flex items-center rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => handleRoleChange('freelancer')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          currentRole === 'freelancer'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <User className="h-4 w-4" />
        Исполнитель
      </button>
      <button
        onClick={() => handleRoleChange('client')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          currentRole === 'client'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Заказчик
      </button>
    </div>
  );
}
