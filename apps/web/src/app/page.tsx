'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  DollarSign,
  Clock,
  Star,
  Users,
  Briefcase,
  UserSearch,
  Gift,
  Gavel,
  UsersRound,
  TrendingDown,
  Sparkles,
  Zap
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Badge } from '@aiworkspace/ui';

const popularProjects = [
  {
    id: 1,
    title: 'Telegram-бот для бронирования',
    budget: 700,
    days: 6,
    tags: ['nestjs', 'telegram'],
    client: 'AI Travel',
  },
  {
    id: 2,
    title: 'Интеграция ChatGPT в CRM',
    budget: 900,
    days: 10,
    tags: ['python', 'openai'],
    client: 'DataHub',
  },
  {
    id: 3,
    title: 'NFT Marketplace на Ethereum',
    budget: 1500,
    days: 14,
    tags: ['solidity', 'react', 'web3'],
    client: 'CryptoArt',
  },
];

const topFreelancers = [
  {
    id: 1,
    name: 'Антон Петров',
    avatar: '👨‍💻',
    bio: 'Разрабатываю Telegram-ботов и AI-интеграции',
    rating: 4.9,
    tags: ['python', 'ai', 'telegram'],
    rate: 30,
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    avatar: '👩‍💻',
    bio: 'Frontend-разработчик с опытом в React и Next.js',
    rating: 4.8,
    tags: ['react', 'nextjs', 'typescript'],
    rate: 35,
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    avatar: '👨‍🔧',
    bio: 'Web3 и смарт-контракты на Solidity',
    rating: 4.9,
    tags: ['solidity', 'web3', 'hardhat'],
    rate: 40,
  },
];

const topTeams = [
  {
    id: 1,
    name: 'CodeNova',
    logo: '🚀',
    members: 5,
    tags: ['nextjs', 'figma', 'openai'],
    rating: 4.8,
    projects: 14,
  },
  {
    id: 2,
    name: 'AI Wizards',
    logo: '🧙',
    members: 4,
    tags: ['python', 'tensorflow', 'ai'],
    rating: 4.9,
    projects: 12,
  },
];

export default function HomePage() {
  const [specialistsTab, setSpecialistsTab] = useState<'freelancers' | 'teams'>('freelancers');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_50%)]"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            <h1 className="mb-8 text-6xl font-bold leading-tight text-gray-900 lg:text-7xl">
              Фриланс{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                нового поколения
              </span>
              .
            </h1>
            <p className="mb-12 text-2xl text-gray-700 leading-relaxed max-w-3xl font-medium">
              Проекты{' '}
              <span className="text-blue-600 font-semibold">быстрее</span>.
              {' '}Переговоры{' '}
              <span className="text-blue-600 font-semibold">проще</span>.
              {' '}Оплата{' '}
              <span className="text-blue-600 font-semibold">честнее</span>.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/freelancers">
                <Button size="lg" className="w-full sm:w-auto flex items-center gap-2 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                  <UserSearch className="h-5 w-5" />
                  Найти специалиста
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#6366F1] flex items-center gap-2 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                  <Briefcase className="h-5 w-5" />
                  Биржа проектов
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why AIWorkSpace */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Почему выбирают{' '}
              <span className="text-blue-600">AIWorkSpace</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {/* Месяц бесплатно */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <Gift className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                Месяц бесплатно
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Попробуй все функции без ограничений.
              </p>
            </div>

            {/* Комиссия 5% */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                5% комиссия
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Минимум бюрократии, максимум выгоды.
              </p>
            </div>

            {/* AI-подбор */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                AI-подбор
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Мы не продаём продвижение, мы показываем релевантных.
              </p>
            </div>

            {/* Аукционы */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <Gavel className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                Аукционы
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Только проверенные специалисты и прозрачные условия.
              </p>
            </div>

            {/* Команды */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <UsersRound className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                Команды
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Работай вместе, дели эскроу и собирай общий кейс.
              </p>
            </div>

            {/* UX нового поколения */}
            <div className="flex flex-col items-start">
              <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                UX нового поколения
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Быстро, понятно и без раздражающих мелочей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-900">🔥 Актуальные проекты</h2>
            <Link href="/freelancers">
              <Button variant="outline">
                Посмотреть все проекты
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                    🧩 {project.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-gray-900">${project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{project.days} дней</span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="default" size="sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    👤 Заказчик: <span className="font-medium">{project.client}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Specialists */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">💎 Лучшие специалисты и команды недели</h2>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 flex justify-center gap-4">
            <button
              onClick={() => setSpecialistsTab('freelancers')}
              className={`rounded-lg px-6 py-3 text-lg font-medium transition-colors ${
                specialistsTab === 'freelancers'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Фрилансеры
            </button>
            <button
              onClick={() => setSpecialistsTab('teams')}
              className={`rounded-lg px-6 py-3 text-lg font-medium transition-colors ${
                specialistsTab === 'teams'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Команды
            </button>
          </div>

          {/* Freelancers */}
          {specialistsTab === 'freelancers' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topFreelancers.map((freelancer) => (
                <Link key={freelancer.id} href={`/profile/${freelancer.id}`}>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="text-5xl">{freelancer.avatar}</div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-xl font-semibold text-gray-900">{freelancer.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{freelancer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">💬 "{freelancer.bio}"</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {freelancer.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      💰 от ${freelancer.rate}/час
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Teams */}
          {specialistsTab === 'teams' && (
            <div className="grid gap-6 md:grid-cols-2">
              {topTeams.map((team) => (
                <Link key={team.id} href={`/teams/${team.id}`}>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="text-5xl">{team.logo}</div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-xl font-semibold text-gray-900">🏢 Команда "{team.name}"</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{team.members} специалистов</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{team.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{team.projects} проектов</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href={specialistsTab === 'freelancers' ? '/freelancers' : '/teams'}>
              <Button variant="outline" size="lg">
                Смотреть всех специалистов
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
}
