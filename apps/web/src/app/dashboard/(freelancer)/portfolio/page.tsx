'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, ExternalLink, Edit, Trash2, Eye, Image as ImageIcon } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function PortfolioPage() {
  const cases = usePortfolioStore((state) => state.cases);
  const deleteCase = usePortfolioStore((state) => state.deleteCase);
  const hydrated = usePortfolioStore((state) => state.hydrated);
  const [filter, setFilter] = useState('all');

  const portfolioCases = hydrated ? cases : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🎨 Портфолио</h1>
          <p className="mt-2 text-gray-600">Управление вашими кейсами и работами</p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Добавить кейс
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Всего кейсов</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">{portfolioCases.length}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Просмотры</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            {portfolioCases.reduce((sum, c) => sum + c.views, 0)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Лайки</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            {portfolioCases.reduce((sum, c) => sum + c.likes, 0)}
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('ai')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'ai'
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          #AI
        </button>
        <button
          onClick={() => setFilter('react')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'react'
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          #React
        </button>
        <button
          onClick={() => setFilter('ui')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'ui'
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          #UI
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl"
          >
            {/* Image/Icon */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
              {caseItem.image ? (
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-300" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-2 font-semibold text-gray-900">{caseItem.title}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-gray-600">{caseItem.description}</p>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {caseItem.views}
                </div>
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  {caseItem.likes}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/portfolio/${caseItem.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  Редактировать
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Удалить этот кейс?')) {
                      deleteCase(caseItem.id);
                    }
                  }}
                  className="flex items-center justify-center rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <Link
                  href={`/cases/${caseItem.id}`}
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg transition-transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4" />
                  Посмотреть кейс
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <Link
          href="/dashboard/portfolio/new"
          className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-primary-500 hover:bg-primary-50"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <Plus className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-900">Добавить новый кейс</p>
          <p className="mt-1 text-xs text-gray-500">Покажите свои лучшие работы</p>
        </Link>
      </div>

      {/* Empty State (if no cases) */}
      {portfolioCases.length === 0 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-12">
          <div className="text-6xl">📁</div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Портфолио пусто</h3>
          <p className="mt-2 text-center text-gray-600">
            Добавьте свои работы, чтобы заказчики могли оценить ваши навыки
          </p>
          <Link
            href="/dashboard/portfolio/new"
            className="mt-6 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Добавить первый кейс
          </Link>
        </div>
      )}
    </div>
  );
}
