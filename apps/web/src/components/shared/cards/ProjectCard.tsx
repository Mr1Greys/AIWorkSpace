/**
 * ProjectCard - универсальный компонент для отображения карточки проекта
 * 
 * Используется в:
 * - Поиск проектов (/projects)
 * - Список проектов заказчика (/dashboard/client)
 * - Текущие заказы исполнителя (/dashboard/freelancer)
 * 
 * Варианты:
 * - client: Вид для заказчика (показывает отклики)
 * - freelancer: Вид для исполнителя (показывает дедлайн и эскроу)
 * - public: Публичный вид для всех
 */

'use client';

import Link from 'next/link';
import { DollarSign, Users, Clock, Eye, Send, Briefcase } from 'lucide-react';
import { Button, Badge } from '@aiworkspace/ui';

export interface ProjectCardProps {
  id: string;
  title: string;
  budget?: number;
  budgetMin?: number;
  budgetMax?: number;
  applicants?: number;
  daysLeft?: number;
  status?: 'active' | 'in-progress' | 'awaiting-payment' | 'completed' | 'reviewing' | 'draft';
  
  // Варианты отображения
  variant?: 'client' | 'freelancer' | 'public';
  
  // Дополнительные действия
  showActions?: boolean;
  onViewClick?: () => void;
  onSubmitClick?: () => void;
}

export function ProjectCard({
  id,
  title,
  budget,
  budgetMin,
  budgetMax,
  applicants = 0,
  daysLeft,
  status = 'active',
  variant = 'public',
  showActions = true,
}: ProjectCardProps) {
  
  // Конфигурация статусов
  const statusConfig = {
    active: { label: 'Активен', color: 'bg-green-100 text-green-700' },
    'in-progress': { label: 'Выполняется', color: 'bg-blue-100 text-blue-700' },
    'awaiting-payment': { label: 'Ожидает оплаты', color: 'bg-yellow-100 text-yellow-700' },
    completed: { label: 'Завершён', color: 'bg-gray-100 text-gray-700' },
    reviewing: { label: 'Рассмотрение откликов', color: 'bg-blue-100 text-blue-700' },
    draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-700' },
  };

  const config = statusConfig[status];
  
  // Форматирование бюджета
  const formatBudget = () => {
    if (budget) return `$${budget.toLocaleString()}`;
    if (budgetMin && budgetMax) return `$${budgetMin.toLocaleString()} - $${budgetMax.toLocaleString()}`;
    return 'Договорная';
  };

  // Вариант для заказчика
  if (variant === 'client') {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{formatBudget()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{applicants} откликов</span>
              </div>
            </div>
          </div>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Link href={`/projects/${id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Просмотреть
              </Button>
            </Link>
            {applicants > 0 && (
              <Link href={`/projects/${id}/applicants`}>
                <Button variant="primary" size="sm">
                  Отклики ({applicants})
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  // Вариант для исполнителя
  if (variant === 'freelancer') {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              {daysLeft !== undefined && daysLeft > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Осталось {daysLeft} дней</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{formatBudget()} в эскроу</span>
              </div>
            </div>
          </div>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        {showActions && (
          <div className="flex gap-2">
            {status === 'in-progress' && (
              <>
                <Link href={`/projects/${id}`}>
                  <Button variant="outline" size="sm">Открыть проект</Button>
                </Link>
                <Link href={`/projects/${id}/submit`}>
                  <Button variant="primary" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Отправить работу
                  </Button>
                </Link>
              </>
            )}
            {status === 'awaiting-payment' && (
              <Link href={`/cases/${id}`}>
                <Button variant="outline" size="sm">Просмотреть кейс</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  // Публичный вариант (по умолчанию)
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-md">
      <div className="mb-3">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="flex-1 text-lg font-semibold text-gray-900">{title}</h3>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1 font-medium text-gray-900">
            <DollarSign className="h-4 w-4" />
            <span>{formatBudget()}</span>
          </div>
          
          {applicants > 0 && (
            <>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{applicants} откликов</span>
              </div>
            </>
          )}
          
          {daysLeft !== undefined && (
            <>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{daysLeft} дней</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-2">
          <Link href={`/projects/${id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Подробнее
            </Button>
          </Link>
          <Link href={`/projects/${id}/apply`}>
            <Button variant="primary" size="sm">
              <Briefcase className="h-4 w-4 mr-1" />
              Откликнуться
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
