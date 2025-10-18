'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/contexts/RoleContext';

export default function DashboardPage() {
  const { currentRole } = useRole();
  const router = useRouter();

  useEffect(() => {
    // Редирект на overview (страница сама адаптируется под роль)
    router.replace('/dashboard/overview');
  }, [currentRole, router]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-4xl">⏳</div>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  );
}
