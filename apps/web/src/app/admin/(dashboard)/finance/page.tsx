'use client';

import { adminPayouts, adminSubscriptions } from '@/data/admin';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function AdminFinancePage() {
  const totalCommission = adminPayouts.reduce((sum, payout) => sum + payout.commission, 0);
  const totalPayouts = adminPayouts.reduce((sum, payout) => sum + payout.amount, 0);
  const recurringRevenue = adminSubscriptions
    .filter((sub) => sub.status !== 'cancelled')
    .reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Финансы и доход</h1>
          <p className="text-sm text-gray-600">
            Анализ комиссий, подписок и выплат исполнителям. Тариф — 990 ₽ в месяц, комиссия 5%.
          </p>
        </div>
        <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
          Скачать отчёт за месяц
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-500">Комиссии</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalCommission.toLocaleString('ru-RU')} ₽</p>
          <p className="mt-1 text-sm text-gray-500">5% от завершённых проектов</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-500">Подписки</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{recurringRevenue.toLocaleString('ru-RU')} ₽</p>
          <p className="mt-1 text-sm text-gray-500">Тариф 990 ₽ · активные клиенты</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-500">Выплаты исполнителям</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalPayouts.toLocaleString('ru-RU')} ₽</p>
          <p className="mt-1 text-sm text-gray-500">Очередь к перечислению по эскроу</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Журнал комиссий</h2>
              <p className="text-sm text-gray-500">Проекты, которые формируют доход платформы</p>
            </div>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Проект</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Исполнитель</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Сумма</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Комиссия 5%</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {adminPayouts.map((payout) => (
                  <tr key={payout.id}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payout.projectTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payout.freelancer}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">{payout.amount.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{payout.commission.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {payout.status === 'completed'
                        ? 'Выплачено'
                        : payout.status === 'processing'
                        ? 'В обработке'
                        : 'Запланировано'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Подписки клиентов</h2>
              <p className="text-sm text-gray-500">Отслеживайте выручку по тарифу</p>
            </div>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Клиент</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">План</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Сумма</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Период</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {adminSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{sub.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.plan === 'pro' ? 'Pro' : 'Standard'}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">{sub.amount.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{sub.period}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {sub.status === 'active'
                        ? 'Активна'
                        : sub.status === 'trial'
                        ? 'Пробный период'
                        : 'Отменена'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
