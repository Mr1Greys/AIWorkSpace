'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Star,
  MapPin,
  MessageSquare,
  Briefcase,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { freelancerDirectory } from '@/data/freelancers';
import { formatCurrency } from '@/utils/format';

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const freelancer = useMemo(
    () => freelancerDirectory.find((f) => f.id === params.id),
    [params.id]
  );

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Профиль не найден</h1>
            <p className="mb-8 text-gray-600">
              Возможно, специалист удалил профиль или ссылка устарела.
            </p>
            <Link
              href="/freelancers"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white transition-all hover:shadow-lg"
            >
              Вернуться к каталогу
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const initials = freelancer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative flex-shrink-0">
                  {freelancer.avatar ? (
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#F0F0F0] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] shadow-sm">
                      <span className="text-3xl font-semibold text-[#6B7280]">{initials}</span>
                    </div>
                  )}
                  {freelancer.availability === 'available' && (
                    <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-[#10B981]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-75" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">{freelancer.name}</h1>
                    {freelancer.verified && <CheckCircle2 className="h-6 w-6 text-[#10B981]" />}
                  </div>
                  <p className="mt-2 text-lg font-medium text-[#4B5563]">{freelancer.headline}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{freelancer.rating}</span>
                      <span>({freelancer.reviewsCount})</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span>{freelancer.experience} лет опыта</span>
                    <span className="text-gray-300">·</span>
                    <span>{freelancer.portfolioCount} кейсов</span>
                    <span className="text-gray-300">·</span>
                    <span>{freelancer.successRate}% успешных проектов</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <MapPin className="h-4 w-4" />
                    <span>{freelancer.location}</span>
                    <span className="text-gray-300">({freelancer.timezone})</span>
                    <span className="text-gray-300">·</span>
                    <span>Ответ: {freelancer.responseTime}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
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

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">О специалисте</h2>
              <p className="leading-relaxed text-gray-600">{freelancer.bio}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs uppercase text-gray-500">Ставка</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {formatCurrency(freelancer.rate.min)} — {formatCurrency(freelancer.rate.max)} / час
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs uppercase text-gray-500">Выполнено проектов</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {freelancer.completedProjects}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs uppercase text-gray-500">Языки</div>
                  <div className="mt-1 space-y-1 text-sm text-gray-700">
                    {freelancer.languages.map((lang) => (
                      <div key={lang.language}>
                        {lang.language} — <span className="text-gray-500">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Навыки</h2>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-sm font-medium text-[#374151]"
                  >
                    #{skill}
                  </span>
                ))}
              </div>

              {freelancer.categories.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">Направления</h3>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">Портфолио</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {freelancer.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mb-4 h-32 w-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-200">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{item.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
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
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.likes} отметок</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {freelancer.portfolio.length === 0 && (
                <p className="text-sm text-gray-500">Портфолио пока пусто.</p>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Параметры сотрудничества</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>⏱ Связь: {freelancer.responseTime}</li>
                <li>👥 Выполнено проектов: {freelancer.completedProjects}</li>
                <li>✅ Успешность: {freelancer.successRate}%</li>
                <li>📍 Локация: {freelancer.location}</li>
                <li>🕑 Часовой пояс: {freelancer.timezone}</li>
              </ul>
            </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Готов обсудить проект</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Оставьте запрос, и специалист свяжется с вами в течение рабочего дня.
                </p>
                <button className="w-full rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg">
                  Оставить заявку
                </button>
              </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Другие специалисты</h3>
              <div className="space-y-3">
                {freelancerDirectory
                  .filter((f) => f.id !== freelancer.id)
                  .slice(0, 3)
                  .map((alt) => (
                    <Link
                      key={alt.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-transparent hover:bg-gray-100"
                      href={`/freelancers/${alt.id}`}
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                        {alt.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-gray-900">{alt.name}</div>
                        <div className="truncate text-xs text-gray-500">{alt.headline}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
