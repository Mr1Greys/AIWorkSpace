'use client';

import { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface BalanceDropdownProps {
  balance: number;
  currency?: string;
}

export function BalanceDropdown({ balance, currency = 'USDC' }: BalanceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedBalance = isMounted ? balance.toLocaleString() : balance.toString();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 text-white transition-all hover:shadow-lg"
      >
        <Wallet className="h-4 w-4" />
        <span className="font-semibold">${formattedBalance}</span>
        <span className="text-xs opacity-80">{currency}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-4">
            <div className="text-sm text-gray-600">Доступный баланс</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">${formattedBalance}</div>
            <div className="text-xs text-gray-500">{currency} on Base</div>
          </div>

          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Plus className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Пополнить</div>
                <div className="text-xs text-gray-500">Добавить средства</div>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <ArrowUpRight className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Вывести</div>
                <div className="text-xs text-gray-500">Перевести на кошелёк</div>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <ArrowDownLeft className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">История</div>
                <div className="text-xs text-gray-500">Все транзакции</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
