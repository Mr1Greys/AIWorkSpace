'use client';

import Link from 'next/link';
import { 
  Briefcase, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  Clock,
  CheckCircle,
  TrendingUp,
  Send,
  Users,
  Eye,
} from 'lucide-react';
import { Button } from '@aiworkspace/ui';
import { ProfileProgress } from '@/components/dashboard/ProfileProgress';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ProjectCard, FreelancerCard, EventItem } from '@/components/shared/cards';
import { useRole } from '@/contexts/RoleContext';
import { useProjectStore } from '@/store/projectStore';

export default function DashboardOverviewPage() {
  const { currentRole } = useRole();
  
  // Показываем контент в зависимости от роли
  if (currentRole === 'freelancer') {
    return <FreelancerDashboard />;
  }
  
  return <ClientDashboard />;
}

// КОНТЕНТ ДЛЯ ИСПОЛНИТЕЛЯ
function FreelancerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать, Алекс 👋</h1>
          <span className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-xs font-semibold text-white">
            👤 Исполнитель
          </span>
        </div>
        <p className="mt-2 text-gray-600">Вот что происходит с вашими проектами:</p>
      </div>

      <ProfileProgress
        progress={75}
        completedSteps={['Основная информация добавлена', 'Email подтверждён', 'Добавлено фото профиля']}
        pendingSteps={['Добавьте навыки и теги', 'Заполните раздел "О себе"', 'Добавьте первый кейс в портфолио']}
      />

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Быстрые действия</h2>
        <QuickActions role="freelancer" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#3B82F6]" />
            <h2 className="text-xl font-semibold text-gray-900">Мои заказы</h2>
          </div>
          <Link
            href="/dashboard/my-projects"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Все проекты →
          </Link>
        </div>
        <div className="space-y-4">
          <ProjectCard id="1" title="Разработка чат-бота для Telegram" daysLeft={3} budget={600} status="in-progress" variant="freelancer" />
          <ProjectCard id="2" title="Лендинг для AI-компании" daysLeft={0} budget={850} status="awaiting-payment" variant="freelancer" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#3B82F6]" />
          <h2 className="text-xl font-semibold text-gray-900">Следующие действия</h2>
        </div>
        <div className="space-y-3">
          <ActionCard icon={<FileText className="h-5 w-5 text-primary-600" />} title="Добавьте кейс в портфолио" description="Клиенты чаще приглашают специалистов с примерами работ" actionText="Добавить кейс" actionLink="/dashboard/portfolio/new" />
          <ActionCard icon={<MessageSquare className="h-5 w-5 text-blue-600" />} title="Ответьте заказчику" description="Sarah Chen ожидает ответ на предложение уже 2 дня" actionText="Открыть чат" actionLink="/chat/5" urgent />
          <ActionCard icon={<TrendingUp className="h-5 w-5 text-green-600" />} title="Заполните профиль" description="Профиль заполнен на 75% — добавьте навыки для лучшего матчинга" actionText="Заполнить" actionLink="/dashboard/settings" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">📌 Последние события</h2>
        </div>
        <div className="space-y-3">
          <EventItem icon={<CheckCircle className="h-5 w-5 text-green-600" />} title="Получена выплата" description="$1,200 от John Doe (E-commerce Dashboard)" time="2 часа назад" />
          <EventItem icon={<MessageSquare className="h-5 w-5 text-blue-600" />} title="Новое сообщение" description="Sarah Chen ответила на отклик" time="5 часов назад" />
          <EventItem icon={<Briefcase className="h-5 w-5 text-purple-600" />} title="Проект завершён" description="'Mobile App Redesign' подтверждён клиентом" time="1 день назад" />
        </div>
      </div>
    </div>
  );
}

// КОНТЕНТ ДЛЯ ЗАКАЗЧИКА
function ClientDashboard() {
  const projects = useProjectStore((state) => state.projects);
  const hydrated = useProjectStore((state) => state.hydrated);
  const clientProjects = hydrated ? projects.filter(p => p.clientId === 'client-1').slice(0, 3) : [];
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать, Алекс 👋</h1>
          <span className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-xs font-semibold text-white">
            💼 Заказчик
          </span>
        </div>
        <p className="mt-2 text-gray-600">Управляйте своими заказами и исполнителями:</p>
      </div>

      <div>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">Быстрые действия</h2>
            <p className="mt-1.5 text-[13px] text-gray-500">Управляйте проектами и командой</p>
          </div>
          <Link
            href="/dashboard/my-projects/new"
            className="flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-[#2563EB] active:scale-[0.98]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Создать проект
          </Link>
        </div>
        <QuickActions role="client" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#3B82F6]" />
            <h2 className="text-xl font-semibold text-gray-900">Размещённые проекты</h2>
          </div>
          <Link
            href="/dashboard/my-projects"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Все проекты →
          </Link>
        </div>
        <div className="space-y-4">
          {clientProjects.length > 0 ? (
            clientProjects.map((project) => (
              <ProjectCard key={project.id} id={project.id} title={project.title} budgetMax={project.budgetMax} applicants={project.applicants} status={project.status === 'active' ? 'active' : project.status === 'completed' ? 'reviewing' : 'draft'} variant="client" />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500"><p>У вас пока нет проектов</p></div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#3B82F6]" />
          <h2 className="text-xl font-semibold text-gray-900">Активные исполнители</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FreelancerCard name="Иван Петров" role="Full-stack разработчик" currentProject="Разработка мобильного приложения" daysLeft={5} variant="grid" onMessageClick={() => {}} />
          <FreelancerCard name="Мария Сидорова" role="UI/UX дизайнер" currentProject="Дизайн лендинга для стартапа" daysLeft={12} variant="grid" onMessageClick={() => {}} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">📌 Последние события</h2>
        </div>
        <div className="space-y-3">
          <EventItem icon={<Send className="h-5 w-5 text-blue-600" />} title="Новый отклик" description="Алексей Иванов откликнулся на 'Интеграция платёжной системы'" time="1 час назад" />
          <EventItem icon={<CheckCircle className="h-5 w-5 text-green-600" />} title="Работа принята" description="Вы приняли работу по проекту 'Дизайн лендинга'" time="3 часа назад" />
          <EventItem icon={<MessageSquare className="h-5 w-5 text-purple-600" />} title="Новое сообщение" description="Иван Петров отправил обновление по проекту" time="5 часов назад" />
        </div>
      </div>
    </div>
  );
}

// Вспомогательный компонент
function ActionCard({ icon, title, description, actionText, actionLink, urgent }: { icon: React.ReactNode; title: string; description: string; actionText: string; actionLink: string; urgent?: boolean; }) {
  return (
    <div className={`flex items-start gap-4 rounded-lg border p-4 ${urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <div className="rounded-lg bg-white p-2 shadow-sm">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <Link href={actionLink}>
        <Button variant={urgent ? 'primary' : 'outline'} size="sm">{actionText}</Button>
      </Link>
    </div>
  );
}
