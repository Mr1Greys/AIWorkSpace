'use client';

import { ShieldCheck, ShieldAlert, Lock, Server } from 'lucide-react';

const checks = [
  {
    icon: ShieldCheck,
    title: '2FA для администраторов',
    status: 'Включено',
    description: 'Все аккаунты администраторов обязаны использовать двухфакторную аутентификацию.',
    badge: 'bg-green-100 text-green-700',
  },
  {
    icon: Lock,
    title: 'Защита API ключей',
    status: 'Мониторинг',
    description: 'Еженедельная проверка использования ключей и автоматическая ревокация неиспользуемых.',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Server,
    title: 'Резервные копии БД',
    status: 'Ежедневно',
    description: 'Бэкапы сохраняются в зашифрованном виде на отдельном S3 бакете.',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    icon: ShieldAlert,
    title: 'События безопасности',
    status: '3 предупреждения',
    description: 'Обнаружены попытки входа с неизвестных IP. Требуется review.',
    badge: 'bg-rose-100 text-rose-700',
  },
];

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Безопасность и комплаенс</h1>
        <p className="mt-1 text-sm text-gray-600">
          Следите за правами доступа, состоянием системы и соблюдением регламентов.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {checks.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-10 w-10 rounded-2xl bg-primary-50 p-2 text-primary-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{item.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                  Настройки
                </button>
                <button className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md">
                  Отчёт
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
