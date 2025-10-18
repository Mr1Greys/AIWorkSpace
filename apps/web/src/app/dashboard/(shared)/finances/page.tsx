'use client';

import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button, Badge } from '@aiworkspace/ui';
import { useRole } from '@/contexts/RoleContext';

export default function FinancesPage() {
  const { currentRole } = useRole();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-2">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Финансы</h1>
          </div>
          <p className="mt-2 text-gray-600">
            {currentRole === 'freelancer' 
              ? 'Управляйте своими доходами и выплатами' 
              : 'Управляйте бюджетом и оплатами проектов'}
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Скачать отчёт
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#6B7280]">Баланс</p>
              <p className="mt-2 text-[28px] font-bold text-[#1F2937]">$2,450</p>
            </div>
            <div className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full" variant="primary">
              {currentRole === 'freelancer' ? 'Вывести средства' : 'Пополнить баланс'}
            </Button>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#6B7280]">
                {currentRole === 'freelancer' ? 'Заработано' : 'Потрачено'}
              </p>
              <p className="mt-2 text-[28px] font-bold text-[#1F2937]">$8,340</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mt-4 text-[13px] text-[#6B7280]">
            <span className="font-semibold text-green-600">+12%</span> за последний месяц
          </p>
        </div>

        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#6B7280]">В эскроу</p>
              <p className="mt-2 text-[28px] font-bold text-[#1F2937]">$1,200</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="mt-4 text-[13px] text-[#6B7280]">2 активных проекта</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
        <h2 className="mb-4 text-[18px] font-semibold text-[#1F2937]">История транзакций</h2>
        <div className="space-y-3">
          <TransactionItem
            type="income"
            title="Оплата за проект: Telegram бот"
            amount={700}
            date="15 окт 2025"
          />
          <TransactionItem
            type="expense"
            title="Вывод средств на карту"
            amount={500}
            date="12 окт 2025"
          />
          <TransactionItem
            type="income"
            title="Оплата за проект: RAG Assistant"
            amount={1200}
            date="8 окт 2025"
          />
        </div>
      </div>
    </div>
  );
}

function TransactionItem({ type, title, amount, date }: {
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#F3F4F6] p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
          {type === 'income' ? (
            <ArrowDownRight className={`h-5 w-5 text-green-600`} />
          ) : (
            <ArrowUpRight className={`h-5 w-5 text-red-600`} />
          )}
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#1F2937]">{title}</p>
          <p className="text-[13px] text-[#6B7280]">{date}</p>
        </div>
      </div>
      <p className={`text-[16px] font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'income' ? '+' : '-'}${amount}
      </p>
    </div>
  );
}
