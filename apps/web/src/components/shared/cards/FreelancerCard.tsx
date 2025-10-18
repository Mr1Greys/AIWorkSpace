/**
 * FreelancerCard - универсальный компонент для отображения карточки исполнителя
 * 
 * Используется в:
 * - Поиск исполнителей (/freelancers)
 * - Список нанятых исполнителей (/dashboard/freelancers)
 * - Активные исполнители в dashboard заказчика
 * 
 * Варианты отображения:
 * - compact: Компактный вид для списков
 * - full: Полный вид с детальной информацией
 * - grid: Вид для сетки карточек
 */

'use client';

import Link from 'next/link';
import { Star, Briefcase, MessageSquare, Clock } from 'lucide-react';
import { Button, Badge } from '@aiworkspace/ui';

export interface FreelancerCardProps {
  id?: string;
  name: string;
  avatar?: string;
  headline?: string;
  role?: string;
  rating?: number;
  projects?: number;
  projectsCompleted?: number;
  status?: 'active' | 'completed' | 'online' | 'offline';
  
  // Для варианта с текущим проектом
  currentProject?: string;
  daysLeft?: number;
  
  // Варианты отображения
  variant?: 'compact' | 'full' | 'grid';
  
  // Опциональные действия
  showMessage?: boolean;
  showProfile?: boolean;
  onMessageClick?: () => void;
}

export function FreelancerCard({
  id,
  name,
  avatar,
  headline,
  role,
  rating = 0,
  projects = 0,
  projectsCompleted,
  status,
  currentProject,
  daysLeft,
  variant = 'full',
  showMessage = true,
  showProfile = true,
  onMessageClick,
}: FreelancerCardProps) {
  
  // Генерация инициалов для аватара
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Статус бейджи
  const statusConfig = {
    active: { label: 'Активен', color: 'bg-green-100 text-green-700' },
    completed: { label: 'Завершён', color: 'bg-gray-100 text-gray-700' },
    online: { label: 'Онлайн', color: 'bg-green-100 text-green-700' },
    offline: { label: 'Офлайн', color: 'bg-gray-100 text-gray-700' },
  };

  // Компактный вариант для списка
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-sm font-semibold text-gray-600">{getInitials(name)}</span>
              </div>
            )}
            {status === 'active' && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{headline || role}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              {rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{rating}</span>
                </div>
              )}
              {projects > 0 && (
                <>
                  <span>·</span>
                  <span>{projects} проектов</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {status && <Badge className={statusConfig[status].color}>{statusConfig[status].label}</Badge>}
          {showMessage && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onMessageClick}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          {showProfile && (
            <Link href={`/profile/${id || name.toLowerCase().replace(' ', '-')}`}>
              <Button variant="primary" size="sm">Профиль</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Grid вариант (для дашборда заказчика)
  if (variant === 'grid') {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
        <div className="mb-3 flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-sm font-semibold text-gray-600">{getInitials(name)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900">{name}</h3>
            <p className="truncate text-sm text-gray-600">{role || headline}</p>
          </div>
        </div>
        
        {currentProject && (
          <div className="mb-3">
            <p className="mb-2 line-clamp-1 text-xs text-gray-600">{currentProject}</p>
            {daysLeft !== undefined && (
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-xs text-gray-600">
                  {daysLeft} {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'} до завершения
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          {showProfile && (
            <Link href={`/profile/${id || name.toLowerCase().replace(' ', '-')}`}>
              <Button variant="outline" size="sm">Профиль</Button>
            </Link>
          )}
          {showMessage && (
            <Button variant="outline" size="sm" className="px-2" onClick={onMessageClick}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Full вариант (по умолчанию)
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
            <span className="text-xl font-semibold text-gray-600">{getInitials(name)}</span>
          </div>
          {/* Status indicator */}
          {status === 'active' && (
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75"></span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-base font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{headline || role}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{rating}</span>
              </div>
            )}
            {projects > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{projectsCompleted || projects} проектов</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {status && <Badge className={statusConfig[status].color}>{statusConfig[status].label}</Badge>}
        {showMessage && (
          <Button variant="outline" size="sm" onClick={onMessageClick}>
            <MessageSquare className="h-4 w-4" />
            Написать
          </Button>
        )}
        {showProfile && (
          <Link href={`/profile/${id || name.toLowerCase().replace(' ', '-')}`}>
            <Button variant="primary" size="sm">Профиль</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
