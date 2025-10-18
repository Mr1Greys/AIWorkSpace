'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Star, Users, Briefcase, MessageSquare, DollarSign, Clock } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = {
    id: params.id,
    name: 'CodeNova',
    logo: '🚀',
    description: 'Мы — команда опытных разработчиков и дизайнеров, специализирующихся на создании современных веб-приложений. Работаем с передовыми технологиями и уделяем особое внимание качеству кода и UX.',
    specialization: 'Веб-разработка и дизайн',
    members: [
      { id: 1, name: 'Иван Петров', role: 'Tech Lead', avatar: '👨‍💻', skills: ['React', 'Node.js'] },
      { id: 2, name: 'Мария Сидорова', role: 'Frontend Dev', avatar: '👩‍💻', skills: ['Next.js', 'TypeScript'] },
      { id: 3, name: 'Алексей Иванов', role: 'Backend Dev', avatar: '👨‍🔧', skills: ['NestJS', 'PostgreSQL'] },
      { id: 4, name: 'Анна Смирнова', role: 'UI/UX Designer', avatar: '👩‍🎨', skills: ['Figma', 'Design'] },
      { id: 5, name: 'Дмитрий Козлов', role: 'DevOps', avatar: '👨‍💼', skills: ['Docker', 'AWS'] },
    ],
    skills: ['React', 'Next.js', 'Node.js', 'Figma', 'PostgreSQL', 'Docker'],
    rating: 4.9,
    projects: 24,
    completedProjects: 24,
    cases: [
      { id: 1, title: 'E-commerce платформа', image: '🛒', budget: 5000 },
      { id: 2, title: 'SaaS Dashboard', image: '📊', budget: 3500 },
      { id: 3, title: 'Mobile App', image: '📱', budget: 4200 },
    ],
    reviews: [
      {
        id: 1,
        author: 'Сергей Волков',
        rating: 5,
        text: 'Отличная команда! Сделали всё быстро и качественно. Рекомендую!',
        date: '2 недели назад',
      },
      {
        id: 2,
        author: 'Елена Новикова',
        rating: 5,
        text: 'Профессионалы своего дела. Всегда на связи, учитывают все пожелания.',
        date: '1 месяц назад',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/teams" className="hover:text-primary-600">
              Команды
            </Link>
            <span>/</span>
            <span className="text-gray-900">{team.name}</span>
          </div>

          {/* Header */}
          <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{team.logo}</div>
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-gray-900">{team.name}</h1>
                  <p className="mb-3 text-lg text-gray-600">{team.specialization}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{team.members.length} человек</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{team.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{team.projects} проектов</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button>
                <MessageSquare className="h-4 w-4" />
                Отправить заказ
              </Button>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="text-gray-700">{team.description}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {team.skills.map((skill) => (
                <Badge key={skill} variant="primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Участники команды</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="text-4xl">{member.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Портфолио команды</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.cases.map((caseItem) => (
                <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                  <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-primary-300 hover:shadow-lg">
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 text-5xl transition-transform group-hover:scale-105">
                      {caseItem.image}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 font-semibold text-gray-900">{caseItem.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-gray-900">${caseItem.budget}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Отзывы клиентов</h2>
            <div className="space-y-4">
              {team.reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{review.author}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
