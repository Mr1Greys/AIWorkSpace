'use client';

import { adminDisputes } from '@/data/admin';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const badge: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-rose-100 text-rose-700',
  resolved: 'bg-green-100 text-green-700',
};

export default function AdminDisputesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Управление спорами</h1>
        <p className="mt-1 text-sm text-gray-600">
          Контролируйте разрешение конфликтов и принимайте решения по выплатам.
        </p>
      </div>

      <div className="space-y-4">
        {adminDisputes.map((dispute) => (
          <div key={dispute.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wide text-gray-400">{dispute.id}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[dispute.status]}`}>
                    {dispute.status === 'in_progress'
                      ? 'В работе'
                      : dispute.status === 'resolved'
                      ? 'Закрыт'
                      : 'Новый спор'}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{dispute.projectTitle}</h2>
                <p className="text-sm text-gray-600">
                  Клиент: <span className="font-medium text-gray-900">{dispute.client}</span> · Исполнитель:{' '}
                  <span className="font-medium text-gray-900">{dispute.freelancer}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Открыт {formatDistanceToNow(new Date(dispute.openedAt), { addSuffix: true, locale: ru })}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-400">Сумма удержания</p>
                  <p className="text-xl font-semibold text-gray-900">{dispute.amount.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                    Детали сделки
                  </button>
                  <button className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md">
                    Принять решение
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
