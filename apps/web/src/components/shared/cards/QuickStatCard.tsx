/**
 * QuickStatCard - компонент для отображения быстрой статистики
 * 
 * Используется в:
 * - Dashboard исполнителя (статистика заработка, проектов)
 * - Dashboard заказчика (статистика проектов, бюджета)
 * - Страницы аналитики
 */

'use client';

import React from 'react';

export interface QuickStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
  alert?: boolean;
  trend?: 'up' | 'down';
  trendValue?: string;
  onClick?: () => void;
}

export function QuickStatCard({
  icon,
  label,
  value,
  subtitle,
  color,
  alert,
  trend,
  trendValue,
  onClick,
}: QuickStatCardProps) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  const trendColorMap = {
    up: 'text-green-600',
    down: 'text-red-600',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`relative rounded-xl border border-gray-200 bg-white p-4 transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-lg' : 'hover:shadow-md'
      }`}
    >
      {alert && (
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></span>
        </div>
      )}
      
      <div className={`mb-3 inline-flex rounded-lg p-2 ${colorMap[color]}`}>
        {icon}
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColorMap[trend]}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </div>
      
      <div className="mt-1 text-sm font-medium text-gray-900">{label}</div>
      <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
    </Component>
  );
}
