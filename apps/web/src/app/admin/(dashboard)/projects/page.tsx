'use client';

import { useState } from 'react';
import { adminProjects } from '@/data/admin';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatCurrency } from '@/utils/format';
import { useAdminModerationStore } from '@/store/adminModerationStore';
import { useProjectStore } from '@/store/projectStore';

const statusBadge: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  in_review: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  disputed: 'bg-rose-100 text-rose-700',
};

export default function AdminProjectsPage() {
  const { pendingProjects, moderationLog, approveProject, rejectProject } = useAdminModerationStore();
  const updateProject = useProjectStore((state) => state.updateProject);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState('');

  const handleApprove = (projectId: string) => {
    updateProject(projectId, { status: 'active' });
    approveProject(projectId);
  };

  const handleRejectConfirm = () => {
    if (!rejectId) return;
    if (!rejectComment.trim()) {
      alert('Пожалуйста, укажите комментарий для заказчика.');
      return;
    }
    updateProject(rejectId, { status: 'cancelled' });
    rejectProject(rejectId, rejectComment);
    setRejectComment('');
    setRejectId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Проекты и модерация</h1>
          <p className="text-sm text-gray-600">
            Отслеживайте публикации, управляйте модерацией и контролируйте качество сделок.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
            Показать фильтры
          </button>
          <button className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md">
            Создать проект вручную
          </button>
        </div>
      </div>

      {pendingProjects.length > 0 && (
        <section className="space-y-4 rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-yellow-900">Новые проекты ждут модерации</h2>
              <p className="text-sm text-yellow-700">
                Проверите описание, бюджет и утвердите публикацию или отклоните с комментарием.
              </p>
            </div>
            <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">
              {pendingProjects.length} в очереди
            </span>
          </div>

          <div className="space-y-4">
            {pendingProjects.map((project) => (
              <div key={project.id} className="rounded-xl border border-yellow-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-400">{project.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-500">
                      Клиент: <span className="font-medium text-gray-900">{project.clientName}</span>
                    </p>
                    <p className="text-sm text-gray-500">{project.description.slice(0, 160)}…</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-gray-100 px-2.5 py-1 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-[220px] space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Бюджет</span>
                      <span className="font-semibold text-gray-900">
                        {project.budgetMin.toLocaleString('ru-RU')} ₽ – {project.budgetMax.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Срок</span>
                      <span>{project.deadline || 'Не указан'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Отправлено</span>
                      <span>{format(new Date(project.createdAt), 'd MMM HH:mm', { locale: ru })}</span>
                    </div>
                  </div>
                </div>

                {rejectId === project.id ? (
                  <div className="mt-4 space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
                    <label className="block text-sm font-medium text-rose-700">
                      Причина отклонения
                    </label>
                    <textarea
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="Опишите, что нужно исправить, чтобы повторно опубликовать проект"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleRejectConfirm}
                        className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                      >
                        Отклонить проект
                      </button>
                      <button
                        onClick={() => {
                          setRejectId(null);
                          setRejectComment('');
                        }}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApprove(project.id)}
                      className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      Подтвердить публикацию
                    </button>
                    <button
                      onClick={() => setRejectId(project.id)}
                      className="flex-1 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {moderationLog.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">История модерации</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {moderationLog.slice(0, 5).map((log) => (
              <li key={log.actedAt} className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  Проект {log.id} — {log.action === 'approved' ? 'утверждён' : 'отклонён'}
                  {log.comment ? ` (${log.comment})` : ''}
                </span>
                <span className="text-xs text-gray-400">
                  {format(new Date(log.actedAt), 'd MMM HH:mm', { locale: ru })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminProjects.map((project) => (
          <div key={project.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">{project.id}</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">{project.title}</h2>
                <p className="text-sm text-gray-500">Заказчик: {project.clientName}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[project.status]}`}>
                {project.status === 'draft'
                  ? 'Черновик'
                  : project.status === 'in_review'
                  ? 'На модерации'
                  : project.status === 'completed'
                  ? 'Завершён'
                  : project.status === 'disputed'
                  ? 'Спор'
                  : 'Активен'}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Бюджет</span>
                <span className="font-semibold text-gray-900">
                  {project.budgetMin.toLocaleString('ru-RU')} ₽ – {project.budgetMax.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Откликов</span>
                <span className="font-semibold text-gray-900">{project.proposals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Создан</span>
                <span>{format(new Date(project.createdAt), 'd MMM yyyy', { locale: ru })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Дедлайн</span>
                <span>{project.deadlineDays} дней</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <button className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                Просмотреть
              </button>
              <button className="flex-1 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                Модерировать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
