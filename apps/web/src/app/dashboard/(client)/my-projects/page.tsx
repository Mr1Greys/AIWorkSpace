'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, DollarSign, Eye, Send, Briefcase, Plus } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';
import { useProjectStore, ProjectStatus } from '@/store/projectStore';
import { useRole } from '@/contexts/RoleContext';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const { currentRole } = useRole();
  const projects = useProjectStore((state) => state.projects);
  const hydrated = useProjectStore((state) => state.hydrated);
  
  // Фильтруем проекты по клиенту (для заказчика показываем только его проекты)
  const clientProjects = currentRole === 'client' 
    ? projects.filter(p => p.clientId === 'client-1') // TODO: Получать из контекста авторизации
    : projects;
  
  // Показываем загрузку пока не произошла гидрация
  if (!hydrated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3B82F6] border-r-transparent"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    active: { label: 'В работе', color: 'bg-blue-100 text-blue-700' },
    pending: { label: 'На рассмотрении', color: 'bg-yellow-100 text-yellow-700' },
    in_review: { label: 'На модерации', color: 'bg-yellow-100 text-yellow-700' },
    completed: { label: 'Завершённые', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Отменённые', color: 'bg-gray-100 text-gray-700' },
    draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-700' },
    disputed: { label: 'Спор', color: 'bg-rose-100 text-rose-700' },
  } as const;

  const filteredProjects = filter === 'all'
    ? clientProjects
    : clientProjects.filter((p) =>
        filter === 'pending'
          ? p.status === 'pending' || p.status === 'in_review'
          : p.status === filter
      );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-2">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Мои проекты</h1>
          </div>
          <p className="mt-2 text-gray-600">Управляйте всеми вашими заказами</p>
        </div>
        {currentRole === 'client' && (
          <Link
            href="/dashboard/my-projects/new"
            className="flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Создать проект
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Все ({clientProjects.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'active'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          В работе
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          На рассмотрении
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Завершённые
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <Badge className={statusConfig[project.status].color}>
                    {statusConfig[project.status].label}
                  </Badge>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  {currentRole === 'client' ? `Откликов: ${project.applicants}` : `Клиент: ${project.clientName}`}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold text-gray-900">${project.budgetMin} - ${project.budgetMax}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    Открыть
                  </Button>
                </Link>
                {project.status === 'active' && (
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                    Отправить работу
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
