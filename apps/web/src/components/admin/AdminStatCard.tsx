'use client';

interface AdminStatCardProps {
  title: string;
  value: string;
  change?: { label: string; trend: 'up' | 'down' | 'flat' };
  accent?: 'blue' | 'green' | 'purple' | 'rose';
  description?: string;
}

const accentMap = {
  blue: 'from-[#3B82F6]/10 to-[#6366F1]/10 text-[#3B82F6]',
  green: 'from-[#22C55E]/10 to-[#10B981]/10 text-[#047857]',
  purple: 'from-[#8B5CF6]/10 to-[#A855F7]/10 text-[#6D28D9]',
  rose: 'from-[#FB7185]/10 to-[#F43F5E]/10 text-[#BE123C]',
};

export function AdminStatCard({
  title,
  value,
  change,
  accent = 'blue',
  description,
}: AdminStatCardProps) {
  const accentClass = accentMap[accent];

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
        {change && (
          <span
            className={`rounded-full bg-gradient-to-r ${accentClass} px-3 py-1 text-xs font-semibold`}
          >
            {change.trend === 'up' ? '▲' : change.trend === 'down' ? '▼' : '•'} {change.label}
          </span>
        )}
      </div>
      {description && <p className="mt-4 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
