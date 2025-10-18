'use client';

import { adminUsers } from '@/data/admin';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const statusStyle: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-rose-100 text-rose-700',
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Управление пользователями</h1>
        <p className="mt-1 text-sm text-gray-600">
          Просматривайте динамику, верифицируйте новых участников и следите за активностью.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-gray-700">Всего пользователей</p>
            <p className="text-xl font-semibold text-gray-900">{adminUsers.length}</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
              Экспорт CSV
            </button>
            <button className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md">
              Добавить клиента
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Пользователь</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Роль</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Статус</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Проекты</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Финансы</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Последний вход</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {adminUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                    {user.role === 'client' ? 'Клиент' : 'Исполнитель'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyle[user.status]
                    }`}>
                      {user.status === 'pending' ? 'На проверке' : user.status === 'suspended' ? 'Заблокирован' : 'Активен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{user.projects}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">
                    {user.role === 'client'
                      ? `${(user.totalSpend || 0).toLocaleString('ru-RU')} $`
                      : `${(user.totalEarned || 0).toLocaleString('ru-RU')} $`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(user.lastLogin), "d MMM yyyy, HH:mm", { locale: ru })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                      Действия
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
