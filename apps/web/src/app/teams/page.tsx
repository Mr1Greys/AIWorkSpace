'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CreateTeamModal } from '@/components/shared/modals/CreateTeamModal';
import { Search, Users, Star, Briefcase, MessageSquare, Plus, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@aiworkspace/ui';

const teams = [
  {
    id: 1,
    name: 'CodeNova',
    logo: '🚀',
    members: 5,
    maxMembers: 8,
    specialization: 'Веб-разработка и дизайн',
    skills: ['React', 'Next.js', 'Figma', 'Node.js'],
    rating: 4.9,
    projects: 24,
    category: 'web',
    status: 'open',
  },
  {
    id: 2,
    name: 'AI Wizards',
    logo: '🧙',
    members: 4,
    maxMembers: 6,
    specialization: 'Машинное обучение и AI',
    skills: ['Python', 'TensorFlow', 'LangChain', 'FastAPI'],
    rating: 4.8,
    projects: 18,
    category: 'ai',
    status: 'open',
  },
  {
    id: 3,
    name: 'Web3 Builders',
    logo: '⛓️',
    members: 6,
    maxMembers: 6,
    specialization: 'Блокчейн и смарт-контракты',
    skills: ['Solidity', 'Web3', 'Hardhat', 'React'],
    rating: 4.7,
    projects: 15,
    category: 'web3',
    status: 'closed',
  },
];

const categories = ['Все', 'Веб', 'Мобильная', 'AI', 'Web3', 'Дизайн'];
const teamSizes = ['Все', '2-5', '6-10', '10+'];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedSize, setSelectedSize] = useState('Все');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CreateTeamModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Команды специалистов</h1>
            <p className="mt-2 text-lg text-gray-600">
              Найдите готовую команду профессионалов для вашего проекта
            </p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-gray-50"
          >
            <Plus className="h-5 w-5" />
            Создать команду
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или навыкам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Направление</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Размер команды</label>
              <div className="flex flex-wrap gap-2">
                {teamSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{team.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{team.members} / {team.maxMembers}</span>
                    </div>
                  </div>
                </div>
                {team.status === 'open' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Открыт к сотрудничеству
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    <Clock className="h-3 w-3" />
                    Набор закрыт
                  </span>
                )}
              </div>

              {/* Specialization */}
              <p className="mb-4 text-sm text-gray-600">{team.specialization}</p>

              {/* Skills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {team.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="default" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{team.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{team.projects} проектов</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/teams/${team.id}`} className="flex-1">
                  <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                    Подробнее
                  </button>
                </Link>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                  <MessageSquare className="h-4 w-4" />
                  Пригласить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
