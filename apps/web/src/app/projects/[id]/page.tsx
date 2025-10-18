'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DollarSign, Clock, Star, User, MessageSquare, FileText } from 'lucide-react';

const projectData = {
  id: '1',
  title: 'Разработка E-commerce Dashboard',
  description: `Нам нужна современная, адаптивная админ-панель для нашей e-commerce платформы. 
  
  Ключевые функции:
  - Аналитика и графики в реальном времени
  - Интерфейс управления товарами
  - Система отслеживания заказов
  - Управление клиентами
  - Отчёты о доходах
  
  Панель должна быть построена на React/Next.js и интегрирована с нашим существующим REST API.`,
  budget: { min: 1800, max: 2500 },
  deadline: '14 дней',
  tags: ['react', 'nextjs', 'tailwindcss', 'charts', 'dashboard'],
  client: {
    name: 'Джон Доу',
    avatar: '👨‍💼',
    rating: 4.8,
    projectsCompleted: 12,
    memberSince: 'Янв 2024',
  },
  status: 'Открыт',
  applicants: 8,
  postedDate: '2 дня назад',
  requirements: [
    'Минимум 3 года опыта работы с React',
    'Портфолио с проектами дашбордов',
    'Готовность начать немедленно',
    'Хорошие коммуникативные навыки',
  ],
  attachments: [
    { name: 'design-mockup.fig', size: '2.4 МБ' },
    { name: 'api-documentation.pdf', size: '1.1 МБ' },
  ],
};

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{projectData.title}</h1>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <span>Опубликовано {projectData.postedDate}</span>
                    <span>•</span>
                    <span>{projectData.applicants} откликов</span>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  {projectData.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {projectData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Описание проекта</h2>
              <div className="whitespace-pre-line text-gray-600">{projectData.description}</div>
            </div>

            {/* Requirements */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Требования</h2>
              <ul className="space-y-2">
                {projectData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Attachments */}
            {projectData.attachments.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Вложения</h2>
                <div className="space-y-2">
                  {projectData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.size}</div>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        Скачать
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Budget & Timeline */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Детали проекта</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-sm text-gray-600">Бюджет</div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                    <DollarSign className="h-6 w-6" />
                    {projectData.budget.min} - ${projectData.budget.max}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">Срок</div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Clock className="h-5 w-5" />
                    {projectData.deadline}
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

            {/* Client Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">О заказчике</h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full border-2 border-[#F0F0F0] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] shadow-sm">
                  <span className="text-lg font-semibold text-[#6B7280]">
                    {projectData.client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{projectData.client.name}</div>
                  <div className="text-sm text-gray-600">
                    Участник с {projectData.client.memberSince}
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Рейтинг</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{projectData.client.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Завершено проектов</span>
                  <span className="font-semibold text-gray-900">
                    {projectData.client.projectsCompleted}
                  </span>
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
