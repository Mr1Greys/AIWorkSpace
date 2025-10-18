'use client';

import { AdminStatCard } from '@/components/admin/AdminStatCard';
import {
  adminStats,
  adminProjects,
  adminDisputes,
  adminUsers,
  adminPayouts,
  adminSubscriptions,
} from '@/data/admin';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function AdminDashboardPage() {
  const recentProjects = adminProjects.slice(0, 4);
  const latestUsers = adminUsers.slice(0, 4);
  const openDisputes = adminDisputes.filter((d) => d.status !== 'resolved');
  const upcomingPayouts = adminPayouts.slice(0, 3);
  const recurringSubs = adminSubscriptions.slice(0, 3);

  const subscriptionRevenue = adminSubscriptions
    .filter((sub) => sub.status !== 'cancelled')
    .reduce((sum, sub) => sum + sub.amount, 0);

  const commissionRevenue = adminPayouts.reduce((sum, payout) => sum + payout.commission, 0);
  const totalRevenue = commissionRevenue + subscriptionRevenue;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          title="GMV за всё время"
          value={`${adminStats.totalGMV.toLocaleString('ru-RU')} ₽`}
          change={{ label: '+12% за 30 дней', trend: 'up' }}
          accent="blue"
        />
        <AdminStatCard
          title="Активные проекты"
          value={String(adminStats.activeProjects)}
          change={{ label: '5 в ожидании модерации', trend: 'flat' }}
          accent="purple"
        />
        <AdminStatCard
          title="Новые пользователи"
          value={`+${adminStats.newUsersToday}`}
          change={{ label: 'за последние 24 часа', trend: 'up' }}
          accent="green"
        />
        <AdminStatCard
          title="Открытые споры"
          value={String(adminStats.disputesOpen)}
          change={{ label: '2 требуют эскалации', trend: 'down' }}
          accent="rose"
        />
        <AdminStatCard
          title="Доход платформы"
          value={`${totalRevenue.toLocaleString('ru-RU')} ₽`}
          change={{ label: '5% комиссий + тариф 990 ₽', trend: 'up' }}
          accent="purple"
          description={`Комиссии: ${commissionRevenue.toLocaleString('ru-RU')} ₽ · Подписки: ${subscriptionRevenue.toLocaleString('ru-RU')} ₽`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="flex flex-col gap-2 border-b border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Последние проекты</h2>
              <p className="text-sm text-gray-500">Мониторинг подачи откликов и статусов</p>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              {adminStats.avgProjectBudget.toLocaleString('ru-RU')} $ · средний бюджет
            </span>
          </header>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Проект</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Клиент</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Бюджет</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Отклики</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {recentProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{project.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.clientName}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {project.budgetMin.toLocaleString('ru-RU')} ₽ – {project.budgetMax.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{project.proposals}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'in_review'
                            ? 'bg-yellow-100 text-yellow-700'
                            : project.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : project.status === 'disputed'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.status === 'in_review'
                          ? 'На модерации'
                          : project.status === 'draft'
                          ? 'Черновик'
                          : project.status === 'disputed'
                          ? 'Спор'
                          : project.status === 'completed'
                          ? 'Завершён'
                          : 'Активен'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="flex flex-col gap-2 border-b border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Приоритетные действия</h2>
              <p className="text-sm text-gray-500">Споры и заявки, требующие внимания</p>
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              {openDisputes.length} открыто
            </span>
          </header>
          <div className="space-y-4 px-6 py-4">
            {openDisputes.map((dispute) => (
              <div key={dispute.id} className="rounded-xl border border-rose-100 bg-rose-50/60 px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-rose-900">{dispute.projectTitle}</h3>
                    <p className="mt-1 text-sm text-rose-700">
                      Клиент: <span className="font-medium">{dispute.client}</span> · Исполнитель:{' '}
                      <span className="font-medium">{dispute.freelancer}</span>
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-rose-500">
                      Сумма спора: {dispute.amount.toLocaleString('ru-RU')} ₽ · открыт{' '}
                      {format(new Date(dispute.openedAt), 'd MMMM', { locale: ru })}
                    </p>
                  </div>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                    {dispute.status === 'in_progress' ? 'В работе' : 'Новый'}
                  </span>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <p className="font-semibold text-gray-800">Последние регистрации</p>
              <ul className="mt-2 space-y-1 text-sm">
                {latestUsers.map((user) => (
                  <li key={user.id} className="flex items-center justify-between">
                    <span>{user.name}</span>
                    <span className="text-xs text-gray-400">
                      {format(new Date(user.createdAt), 'd MMM', { locale: ru })}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                Открыть чат поддержки
              </button>
            </div>
          </div>
        </section>
      </div>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="flex flex-col gap-2 border-b border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Сводка платежей и удержаний</h2>
              <p className="text-sm text-gray-500">Комиссии 5% и подписка 990 ₽/мес</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                Комиссии: {commissionRevenue.toLocaleString('ru-RU')} ₽
              </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Подписки: {subscriptionRevenue.toLocaleString('ru-RU')} ₽
            </span>
            <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
              Экспортировать отчёт
            </button>
          </div>
        </header>
        <div className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">Выплаты в очереди</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{adminStats.payoutQueue}</p>
            <p className="mt-1 text-sm text-gray-500">Требуют подтверждения службы безопасности</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">Конверсия заявок</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{adminStats.conversionRate}%</p>
            <p className="mt-1 text-sm text-gray-500">Отклики → заказы за последние 14 дней</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">Ликвидация споров</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">72%</p>
            <p className="mt-1 text-sm text-gray-500">Закрыты в досудебном порядке</p>
          </div>
        </div>

        <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Предстоящие выплаты</h3>
              <span className="text-xs text-gray-400">Первые 3 записи</span>
            </div>
            <div className="space-y-3">
              {upcomingPayouts.map((payout) => (
                <div key={payout.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{payout.projectTitle}</p>
                      <p className="text-xs text-gray-500">Исполнитель: {payout.freelancer}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      payout.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : payout.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {payout.status === 'processing'
                        ? 'Обработка'
                        : payout.status === 'completed'
                        ? 'Выплачено'
                        : 'Запланировано'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>{payout.amount.toLocaleString('ru-RU')} ₽</span>
                    <span>Комиссия: {payout.commission.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(payout.scheduledAt), { addSuffix: true, locale: ru })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Подписки клиентов</h3>
              <span className="text-xs text-gray-400">Активные планы</span>
            </div>
            <div className="space-y-3">
              {recurringSubs.map((sub) => (
                <div key={sub.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{sub.client}</p>
                      <p className="text-xs text-gray-500">План: {sub.plan === 'pro' ? 'Pro' : 'Standard'}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : sub.status === 'trial'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {sub.status === 'active' ? 'Активна' : sub.status === 'trial' ? 'Пробный период' : 'Отменена'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>{sub.amount.toLocaleString('ru-RU')} ₽</span>
                    <span>Период: {sub.period}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    С {format(new Date(sub.startedAt), 'd MMM yyyy', { locale: ru })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
