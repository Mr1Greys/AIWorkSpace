'use client';

import Link from 'next/link';
import { Users, Star, Briefcase, MessageSquare } from 'lucide-react';
import { Button, Badge } from '@aiworkspace/ui';
import { FreelancerCard } from '@/components/shared/cards';

export default function ClientFreelancersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Исполнители</h1>
          </div>
          <p className="mt-2 text-gray-600">Нанятые и приглашённые специалисты</p>
        </div>
        <Link href="/freelancers">
          <Button variant="primary">Найти исполнителей</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <p className="text-[13px] font-medium text-[#6B7280]">Активных</p>
          <p className="mt-2 text-[28px] font-bold text-[#1F2937]">3</p>
        </div>
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <p className="text-[13px] font-medium text-[#6B7280]">Завершённых</p>
          <p className="mt-2 text-[28px] font-bold text-[#1F2937]">12</p>
        </div>
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <p className="text-[13px] font-medium text-[#6B7280]">Средний рейтинг</p>
          <p className="mt-2 text-[28px] font-bold text-[#1F2937]">4.8</p>
        </div>
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <p className="text-[13px] font-medium text-[#6B7280]">Приглашённых</p>
          <p className="mt-2 text-[28px] font-bold text-[#1F2937]">5</p>
        </div>
      </div>

      {/* Freelancers List */}
      <div className="space-y-4">
        <FreelancerCard
          name="Алекс Джонсон"
          headline="Full-Stack разработчик"
          rating={4.9}
          projects={3}
          status="active"
          variant="compact"
          onMessageClick={() => {}}
        />
        <FreelancerCard
          name="Сара Чен"
          headline="Senior Backend Engineer"
          rating={4.8}
          projects={2}
          status="active"
          variant="compact"
          onMessageClick={() => {}}
        />
        <FreelancerCard
          name="Майк Смит"
          headline="UI/UX Designer"
          rating={5.0}
          projects={1}
          status="completed"
          variant="compact"
          onMessageClick={() => {}}
        />
      </div>
    </div>
  );
}
