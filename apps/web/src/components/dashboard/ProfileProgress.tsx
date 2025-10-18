'use client';

import { CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';

interface ProfileProgressProps {
  progress: number;
  completedSteps: string[];
  pendingSteps: string[];
}

export function ProfileProgress({ progress, completedSteps, pendingSteps }: ProfileProgressProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Заполнение профиля</h3>
          <p className="mt-1 text-sm text-gray-600">
            Завершите профиль для лучшего матчинга с проектами
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600">{progress}%</div>
          <div className="text-xs text-gray-500">завершено</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {completedSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-gray-700 line-through">{step}</span>
          </div>
        ))}
        {pendingSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <Circle className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{step}</span>
          </div>
        ))}
      </div>

      {progress < 100 && (
        <Link
          href="/dashboard/settings"
          className="mt-4 block w-full rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2.5 text-center text-sm font-medium text-white transition-all hover:shadow-lg"
        >
          Завершить профиль
        </Link>
      )}
    </div>
  );
}
