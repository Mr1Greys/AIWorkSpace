/**
 * EventItem - компонент для отображения события в ленте активности
 * 
 * Используется в:
 * - Dashboard исполнителя (последние события)
 * - Dashboard заказчика (последние события)
 * - Страница активности
 */

'use client';

import React from 'react';

export interface EventItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  onClick?: () => void;
}

export function EventItem({ icon, title, description, time, onClick }: EventItemProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
        onClick ? 'cursor-pointer hover:bg-gray-100' : 'hover:bg-gray-50'
      }`}
    >
      <div className="rounded-lg bg-white p-2 shadow-sm">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="flex-shrink-0 text-xs text-gray-500">{time}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Component>
  );
}
