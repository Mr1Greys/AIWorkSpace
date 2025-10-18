'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useProjectStore } from '@/store/projectStore';
import { formatCurrency, formatRelativeTime } from '@/utils/format';
import { DollarSign, Clock, Star, MessageSquare, ArrowLeft } from 'lucide-react';

const statusConfig: Record<
  string,
  { label: string; badgeClass: string }
> = {
  active: { label: 'В работе', badgeClass: 'bg-green-100 text-green-700' },
  pending: { label: 'На рассмотрении', badgeClass: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Завершён', badgeClass: 'bg-blue-100 text-blue-700' },
  cancelled: { label: 'Отменён', badgeClass: 'bg-gray-100 text-gray-700' },
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = useMemo(() => {
    const value = params?.id;
    if (!value) return '';
    return Array.isArray(value) ? value[0] : value;
  }, [params]);

  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );
  const hydrated = useProjectStore((state) => state.hydrated);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent" />
          <p className="text-gray-600">Загружаем проект…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">Проект не найден</h1>
            <p className="mt-3 text-gray-600">
              Возможно, он был удалён или вы перешли по неверной ссылке.
            </p>
            <Link
              href="/dashboard/my-projects"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться к списку проектов
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const status = statusConfig[project.status] ?? statusConfig.pending;
  const postedAgo = project.createdAt ? formatRelativeTime(project.createdAt) : '—';
  const budgetRange = `${formatCurrency(project.budgetMin)} — ${formatCurrency(project.budgetMax)}`;
  const applicantLabel =
    project.applicants === 1 ? '1 отклик' : `${project.applicants} откликов`;
  const clientInitials = project.clientName
    ? project.clientName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'CL';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/my-projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к проектам
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                  <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                    <span>Опубликовано {postedAgo}</span>
                    <span className="text-gray-300">•</span>
                    <span>{applicantLabel}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${status.badgeClass}`}
                >
                  {status.label}
                </span>
              </div>

              {project.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Описание проекта</h2>
              <div className="whitespace-pre-line text-gray-600">{project.description}</div>
            </div>

            {project.requirements.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Требования</h2>
                <ul className="space-y-2">
                  {project.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Детали проекта</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-sm text-gray-600">Бюджет</div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <DollarSign className="h-6 w-6" />
                    {budgetRange}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">Срок</div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Clock className="h-5 w-5" />
                    {project.deadline || 'Не указан'}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <button className="w-full rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg">
                  Откликнуться
                </button>
                <button className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-medium text-[#374151] transition-all duration-200 hover:bg-[#F3F4F6]">
                  Сохранить проект
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">О заказчике</h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full border-2 border-[#F0F0F0] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] shadow-sm">
                  <span className="text-lg font-semibold text-[#6B7280]">{clientInitials}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{project.clientName}</div>
                  <div className="text-sm text-gray-600">ID клиента: {project.clientId}</div>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Рейтинг</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Откликов</span>
                  <span className="font-semibold text-gray-900">{project.applicants}</span>
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-all duration-200 hover:bg-[#F3F4F6]">
                <MessageSquare className="h-4 w-4" />
                Написать заказчику
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
