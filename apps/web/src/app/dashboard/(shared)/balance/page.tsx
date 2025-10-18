'use client';

import { DollarSign, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@aiworkspace/ui';

const transactions = [
  {
    id: 1,
    type: 'incoming',
    title: 'Выплата за проект',
    description: 'E-commerce Dashboard - John Doe',
    amount: 1200,
    date: '16 окт 2025, 14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'escrow',
    title: 'Средства в эскроу',
    description: 'Telegram Bot - Sarah Chen',
    amount: 600,
    date: '15 окт 2025, 10:20',
    status: 'pending',
  },
  {
    id: 3,
    type: 'incoming',
    title: 'Выплата за проект',
    description: 'Mobile App Redesign - Mike Johnson',
    amount: 850,
    date: '14 окт 2025, 16:45',
    status: 'completed',
  },
  {
    id: 4,
    type: 'outgoing',
    title: 'Вывод средств',
    description: 'На карту **** 1234',
    amount: -500,
    date: '13 окт 2025, 12:00',
    status: 'completed',
  },
];

const escrowProjects = [
  {
    id: 1,
    project: 'Разработка чат-бота для Telegram',
    client: 'Sarah Chen',
    amount: 600,
    status: 'В работе',
  },
  {
    id: 2,
    project: 'Лендинг для AI-компании',
    client: 'Alex Morgan',
    amount: 850,
    status: 'Ожидает подтверждения',
  },
];

export default function BalancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">💰 Баланс</h1>
        <p className="mt-2 text-gray-600">Управление средствами и эскроу</p>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-green-50 p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">$8,450</div>
          <div className="mt-1 text-sm font-medium text-gray-600">Доступно к выводу</div>
          <Button className="mt-4 w-full" size="sm">
            <ArrowUpRight className="h-4 w-4" />
            Вывести средства
          </Button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-yellow-50 p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">$1,450</div>
          <div className="mt-1 text-sm font-medium text-gray-600">В эскроу</div>
          <p className="mt-2 text-xs text-gray-500">По {escrowProjects.length} проектам</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-blue-50 p-3">
              <ArrowDownLeft className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">$12,340</div>
          <div className="mt-1 text-sm font-medium text-gray-600">Всего заработано</div>
          <p className="mt-2 text-xs text-gray-500">За всё время</p>
        </div>
      </div>

      {/* Escrow Projects */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Средства в эскроу</h2>
        <div className="space-y-3">
          {escrowProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{project.project}</h3>
                <p className="text-sm text-gray-600">Клиент: {project.client}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">${project.amount}</div>
                <div className="text-xs text-gray-500">{project.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">История транзакций</h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50"
            >
              <div
                className={`rounded-lg p-2 ${
                  transaction.type === 'incoming'
                    ? 'bg-green-50'
                    : transaction.type === 'escrow'
                    ? 'bg-yellow-50'
                    : 'bg-red-50'
                }`}
              >
                {transaction.type === 'incoming' ? (
                  <ArrowDownLeft className="h-5 w-5 text-green-600" />
                ) : transaction.type === 'escrow' ? (
                  <Clock className="h-5 w-5 text-yellow-600" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{transaction.title}</h3>
                <p className="text-sm text-gray-600">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <div
                  className={`text-lg font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                </div>
                {transaction.status === 'completed' ? (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    Завершено
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-yellow-600">
                    <Clock className="h-3 w-3" />
                    В обработке
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
