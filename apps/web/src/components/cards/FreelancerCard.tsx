'use client';

export interface FreelancerData {
  id: number;
  name: string;
  avatar?: string;
  headline: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  location: string;
  timezone: string;
  skills: string[];
  availability: 'available' | 'busy' | 'team';
  verified: boolean;
  online: boolean;
  portfolioCount: number;
  profileType: 'freelancer' | 'team';
}

interface FreelancerCardProps {
  freelancer: FreelancerData;
  onMessageClick?: () => void;
  onProfileClick?: () => void;
  showActions?: boolean;
}

export function FreelancerCard({ 
  freelancer, 
  onMessageClick,
  onProfileClick,
  showActions = true 
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

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0px_4px_12px_rgba(0,0,0,0.06)] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-gradient-to-r hover:after:from-[#3B82F6] hover:after:to-[#6366F1]">
      
      {/* Header: Avatar + Name + Verification */}
      <div className="mb-4 flex items-center gap-4">
        {/* Avatar with online indicator */}
        <div className="relative flex-shrink-0">
          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-2 border-[#F0F0F0] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] shadow-sm transition-all duration-200 group-hover:border-[#3B82F6]">
            <span className="text-2xl font-semibold text-[#6B7280]">
              {getInitials(freelancer.name)}
            </span>
          </div>
          {/* Status indicator dot */}
          {freelancer.availability === 'available' && (
            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-[#10B981]">
              {freelancer.online && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-75"></span>
              )}
            </div>
          )}
          {freelancer.availability === 'team' && (
            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-[#FBBF24]"></div>
          )}
        </div>

        {/* Name + Profession */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-semibold text-[#1F2937] truncate">
              {freelancer.name}
            </h3>
            {freelancer.verified && (
              <div className="flex-shrink-0 group/verify relative">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  className="text-[#10B981]"
                >
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/verify:opacity-100">
                  Профиль подтверждён
                </span>
              </div>
            )}
          </div>
          <p className="mt-1 text-[14px] font-medium text-[#4B5563] line-clamp-1">
            {freelancer.headline}
          </p>
        </div>
      </div>

      {/* Stats: Rating, Experience, Portfolio */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[13px] text-[#6B7280]">
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#FBBF24]">
            <path d="M7 1L8.545 5.13L13 5.635L9.635 8.455L10.635 13L7 10.635L3.365 13L4.365 8.455L1 5.635L5.455 5.13L7 1Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold text-[#1F2937]">{freelancer.rating}</span>
          <span>({freelancer.reviewsCount})</span>
        </div>
        <span className="text-[#D1D5DB]">·</span>
        <span>{freelancer.experience} лет опыта</span>
        {freelancer.portfolioCount > 0 && (
          <>
            <span className="text-[#D1D5DB]">·</span>
            <span>{freelancer.portfolioCount} кейсов</span>
          </>
        )}
      </div>

      {/* Location */}
      <div className="mb-4 flex items-center gap-1.5 text-[13px] text-[#9CA3AF]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 12.5C7 12.5 11 9.5 11 6C11 3.79086 9.20914 2 7 2C4.79086 2 3 3.79086 3 6C3 9.5 7 12.5 7 12.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="6" r="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{freelancer.location}</span>
        <span className="text-[#D1D5DB]">({freelancer.timezone})</span>
      </div>

      {/* Skills tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {freelancer.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-[12px] font-medium text-[#374151] transition-colors hover:bg-[#F3F4F6]"
          >
            #{skill}
          </span>
        ))}
        {freelancer.skills.length > 5 && (
          <span className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-[12px] font-medium text-[#6B7280]">
            +{freelancer.skills.length - 5}
          </span>
        )}
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className="flex gap-3">
          {/* Profile button - outline */}
          <button
            onClick={onProfileClick}
            className="flex h-[44px] flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#374151] transition-all duration-200 hover:-translate-y-px hover:bg-[#F3F4F6] hover:text-[#111827] hover:shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="5" r="2.5" strokeLinecap="round"/>
              <path d="M3 13C3 10.7909 5.23858 9 8 9C10.7614 9 13 10.7909 13 13" strokeLinecap="round"/>
            </svg>
            Профиль
          </button>

          {/* Message button - soft blue */}
          <button
            onClick={onMessageClick}
            className="flex h-[44px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#E0E7FF] text-[14px] font-medium text-[#1E3A8A] transition-all duration-200 hover:-translate-y-px hover:bg-[#C7D2FE] hover:shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 5.5C2 4.11929 3.11929 3 4.5 3H11.5C12.8807 3 14 4.11929 14 5.5V10.5C14 11.8807 12.8807 13 11.5 13H4.5C3.11929 13 2 11.8807 2 10.5V5.5Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 6L8 9L14 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Написать
          </button>
        </div>
      )}
    </div>
  );
}
