'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Star, MapPin, Clock, MessageSquare, Briefcase, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useProfileStore } from '@/store/profileStore';
import { usePortfolioStore } from '@/store/portfolioStore';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { freelancerProfile } = useProfileStore();
  const { cases } = usePortfolioStore();

  // Для демо используем профиль из store
  // В реальном приложении здесь был бы запрос к API по params.id
  const profile = freelancerProfile;

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Профиль не найден</h1>
            <p className="mb-8 text-gray-600">К сожалению, этот профиль не существует или был удален.</p>
            <Link
              href="/freelancers"
              className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white transition-all hover:shadow-lg"
            >
              Вернуться к поиску
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Генерация инициалов
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 rounded-2xl border border-[#F3F4F6] bg-white p-8">
              <div className="flex items-start gap-6">
                {/* Avatar with initials and online status */}
                <div className="relative flex-shrink-0">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-24 w-24 rounded-full border-2 border-[#F0F0F0] object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#F0F0F0] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] shadow-sm">
                      <span className="text-3xl font-semibold text-[#6B7280]">
                        {getInitials(profile.name || 'АП')}
                      </span>
                    </div>
                  )}
                  {/* Online indicator */}
                  {profile.availability === 'available' && (
                    <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-2 border-white bg-[#10B981]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-75"></span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    {profile.verified && (
                      <CheckCircle2 className="h-6 w-6 text-[#10B981]" />
                    )}
                  </div>
                  <p className="mt-2 text-lg font-medium text-[#4B5563]">{profile.headline || 'Специалист'}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-[#1F2937]">{profile.rating || 0}</span>
                      <span>({profile.reviewsCount || 0})</span>
                    </div>
                    <span className="text-[#D1D5DB]">·</span>
                    <span>{profile.experience || 0} лет опыта</span>
                    <span className="text-[#D1D5DB]">·</span>
                    <span>{cases.length} кейсов</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.city || 'Не указано'}</span>
                    <span className="text-[#D1D5DB]">({profile.timezone || 'UTC+3'})</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="flex items-center gap-2 rounded-[10px] bg-[#E0E7FF] px-6 py-3 text-sm font-medium text-[#1E3A8A] transition-all hover:bg-[#C7D2FE]">
                      <MessageSquare className="h-4 w-4" />
                      Написать
                    </button>
                    <button className="flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-medium text-[#374151] transition-all hover:bg-[#F3F4F6]">
                      Пригласить в проект
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="mb-8 rounded-2xl border border-[#F3F4F6] bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">О себе</h2>
              <p className="text-gray-600 leading-relaxed">{profile.bio || 'Информация не указана'}</p>
            </div>

            {/* Skills */}
            <div className="mb-8 rounded-2xl border border-[#F3F4F6] bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Навыки</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-sm font-medium text-[#374151]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Навыки не указаны</p>
                )}
              </div>
            </div>

            {/* Portfolio */}
            <div className="mb-8 rounded-2xl border border-[#F3F4F6] bg-white p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Портфолио</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {cases && cases.length > 0 ? (
                  cases.map((item) => (
                    <Link
                      key={item.id}
                      href={`/cases/${item.id}`}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="mb-4 h-32 w-full rounded-lg object-cover" />
                      ) : (
                        <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-200">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mb-4 line-clamp-2 text-sm text-gray-600">{item.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded bg-white px-2 py-1 text-xs font-medium text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{item.views} просмотров</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-gray-500">Портфолио пусто</p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-[#F3F4F6] bg-white p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Отзывы</h2>
              <div className="space-y-6">
                {profile.reviewsCount && profile.reviewsCount > 0 ? (
                  <p className="text-gray-500">Отзывы появятся после завершения проектов</p>
                ) : (
                  <p className="text-gray-500">Отзывов пока нет</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Availability Status */}
            <div className="rounded-2xl border border-[#F3F4F6] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Доступность</h3>
              <div className="space-y-3">
                {profile.availability === 'available' && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-700">Доступен к сотрудничеству</span>
                  </div>
                )}
                {profile.availability === 'busy' && (
                  <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">Занят</span>
                  </div>
                )}
                {profile.availability === 'unavailable' && (
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                    <div className="h-3 w-3 rounded-full bg-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Недоступен</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
