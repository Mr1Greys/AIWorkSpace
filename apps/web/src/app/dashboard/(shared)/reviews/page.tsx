'use client';

import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Badge } from '@aiworkspace/ui';
import { useRole } from '@/contexts/RoleContext';

export default function ReviewsPage() {
  const { currentRole } = useRole();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-2">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Отзывы</h1>
        </div>
        <p className="mt-2 text-gray-600">
          {currentRole === 'freelancer'
            ? 'Отзывы от ваших заказчиков'
            : 'Отзывы об исполнителях'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Средний рейтинг" value="4.9" icon={<Star className="h-5 w-5" />} color="yellow" />
        <StatCard label="Всего отзывов" value="47" icon={<MessageSquare className="h-5 w-5" />} color="blue" />
        <StatCard label="Положительных" value="45" icon={<ThumbsUp className="h-5 w-5" />} color="green" />
        <StatCard label="Завершённых проектов" value="52" icon={<Star className="h-5 w-5" />} color="purple" />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <ReviewCard
          clientName="Джон Доу"
          clientAvatar="👨‍💼"
          rating={5}
          date="15 окт 2025"
          projectTitle="Telegram бот для бронирования"
          comment="Отличная работа! Бот работает стабильно, код чистый. Рекомендую!"
        />
        <ReviewCard
          clientName="Сара Чен"
          clientAvatar="👩‍💼"
          rating={5}
          date="8 окт 2025"
          projectTitle="RAG Support Assistant"
          comment="Профессиональный подход, быстрая коммуникация. Результат превзошёл ожидания."
        />
        <ReviewCard
          clientName="Майк Джонсон"
          clientAvatar="👨‍💻"
          rating={4}
          date="1 окт 2025"
          projectTitle="E-commerce Dashboard"
          comment="Хорошая работа, небольшие правки были нужны, но в целом всё отлично."
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'yellow' | 'blue' | 'green' | 'purple';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-[#6B7280]">{label}</p>
          <p className="mt-2 text-[28px] font-bold text-[#1F2937]">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ clientName, clientAvatar, rating, date, projectTitle, comment }: {
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
}) {
  return (
    <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-4xl">{clientAvatar}</div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#1F2937]">{clientName}</h3>
            <p className="text-[13px] text-[#6B7280]">{projectTitle}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-[13px] text-[#6B7280]">{date}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[14px] text-[#4B5563]">{comment}</p>
    </div>
  );
}
