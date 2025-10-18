'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, X, Wrench, Bot, Globe, Smartphone, Palette, BarChart3 } from 'lucide-react';
import { freelancerDirectory, FreelancerProfile } from '@/data/freelancers';
import { useAuth } from '@/contexts/AuthContext';

// Направления (пресеты)
const categories = [
  { id: 'all', label: 'Все направления', icon: Wrench, tags: [] },
  { id: 'ai', label: 'AI', icon: Bot, tags: ['Python', 'LangChain', 'LLM', 'RAG', 'OpenAI'] },
  { id: 'web', label: 'Веб-разработка', icon: Globe, tags: ['NextJS', 'React', 'TypeScript', 'TailwindCSS'] },
  { id: 'telegram', label: 'Telegram-боты', icon: Smartphone, tags: ['Python', 'aiogram', 'Telegram Bot API', 'Node.js'] },
  { id: 'design', label: 'Дизайн', icon: Palette, tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'] },
  { id: 'data', label: 'Data/Аналитика', icon: BarChart3, tags: ['Python', 'Pandas', 'SQL', 'Jupyter', 'Visualization'] },
];

const allSkills = [
  'Python', 'TypeScript', 'JavaScript', 'React', 'NextJS', 'Node.js',
  'AI', 'LangChain', 'OpenAI', 'LLM', 'RAG',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
  'Figma', 'UI/UX', 'Design Systems', 'Prototyping',
  'Web3', 'Solidity', 'Ethers.js',
  'TailwindCSS', 'Pandas', 'TensorFlow', 'PyTorch',
];

const cities = [
  'Москва', 'Санкт-Петербург', 'Алматы', 'Минск', 'Тбилиси', 
  'Ереван', 'Бишкек', 'Ташкент', 'Казань', 'Новосибирск', 'Екатеринбург'
];

export default function FreelancersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('active'); // active = available + team
  const [profileTypeFilter, setProfileTypeFilter] = useState<string[]>([]);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'activity'>('relevance');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'message' | 'profile'>('message');

  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category && category.tags.length > 0) {
      setSelectedSkills(category.tags);
    } else {
      setSelectedSkills([]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSkills([]);
    setStatusFilter('active');
    setProfileTypeFilter([]);
    setCityFilter('');
    setVerifiedOnly(false);
    setHasPortfolio(false);
    setMinRating(0);
  };

  const hasActiveFilters = 
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedSkills.length > 0 ||
    statusFilter !== 'active' ||
    profileTypeFilter.length > 0 ||
    cityFilter !== '' ||
    verifiedOnly ||
    hasPortfolio ||
    minRating > 0;

  const filteredFreelancers = useMemo(
    () =>
      freelancerDirectory.filter((f) => {
    // Поиск
    const matchesSearch = searchQuery === '' || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Навыки
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => f.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
    
    // Статус
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && (f.availability === 'available' || f.availability === 'team')) ||
      f.availability === statusFilter;
    
    // Тип профиля
    const matchesProfileType = profileTypeFilter.length === 0 ||
      profileTypeFilter.includes(f.profileType);
    
    // Город
    const matchesCity = cityFilter === '' || f.location === cityFilter;
    
    // Верификация
    const matchesVerified = !verifiedOnly || f.verified;
    
    // Портфолио
    const matchesPortfolio = !hasPortfolio || f.portfolioCount > 0;
    
    // Рейтинг
    const matchesRating = minRating === 0 || f.rating >= minRating;

    return matchesSearch && matchesSkills && matchesStatus && matchesProfileType && 
           matchesCity && matchesVerified && matchesPortfolio && matchesRating;
      }),
    [
      searchQuery,
      selectedCategory,
      selectedSkills,
      statusFilter,
      profileTypeFilter,
      cityFilter,
      verifiedOnly,
      hasPortfolio,
      minRating,
    ]
  );

  // Сортировка
  const sortedFreelancers = useMemo(() => {
    const result = [...filteredFreelancers];
    result.sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'activity') {
      if (a.online && !b.online) return -1;
      if (!a.online && b.online) return 1;
      return 0;
    }
    // relevance - пока просто по рейтингу, в будущем AI
    return b.rating - a.rating;
    });
    return result;
  }, [filteredFreelancers, sortBy]);

  const handleProfileOpen = (freelancerId: string) => {
    if (!isAuthenticated) {
      setAuthAction('profile');
      setShowAuthModal(true);
      return;
    }
    router.push(`/freelancers/${freelancerId}`);
  };

  const handleMessageOpen = (freelancerId: string) => {
    if (!isAuthenticated) {
      setAuthAction('message');
      setShowAuthModal(true);
      return;
    }
    router.push(`/chat/${freelancerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">Найдите проверенных специалистов для вашего проекта</h1>
          <p className="mt-3 text-xl text-gray-600">
            ИИ поможет подобрать исполнителя по навыкам, опыту и отзывам.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="🔍 Поиск по навыку, тегу или имени..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6B7280]">
                <path d="M3 6H17M6 10H14M8 14H12" strokeLinecap="round"/>
              </svg>
              <h3 className="text-[16px] font-semibold text-[#1F2937]">Фильтры</h3>
            </div>

            {/* 1. Направление */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Направление</label>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                          : 'bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Навыки и теги */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Навыки и теги</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 12).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillClick(skill)}
                    className={`rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-all duration-200 ${
                      selectedSkills.includes(skill)
                        ? 'border-[#3B82F6] bg-[#E0E7FF] text-[#1E3A8A]'
                        : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    #{skill}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Доступность */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Доступность</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                    statusFilter === 'active'
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#10B981]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#FBBF24]"></div>
                  </div>
                  Доступен / В команде
                </button>

                <button
                  onClick={() => setStatusFilter('available')}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                    statusFilter === 'available'
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="h-3 w-3 rounded-full bg-[#10B981]"></div>
                  Доступен к сотрудничеству
                </button>

                <button
                  onClick={() => setStatusFilter('team')}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                    statusFilter === 'team'
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="h-3 w-3 rounded-full bg-[#FBBF24]"></div>
                  В команде
                </button>

                <button
                  onClick={() => setStatusFilter('all')}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                    statusFilter === 'all'
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="h-3 w-3 rounded-full bg-[#D1D5DB]"></div>
                  Показать всех
                </button>
              </div>
            </div>

            {/* 4. Кого ищем */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Кого ищем</label>
              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB]">
                  <input
                    type="checkbox"
                    checked={profileTypeFilter.includes('freelancer')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfileTypeFilter([...profileTypeFilter, 'freelancer']);
                      } else {
                        setProfileTypeFilter(profileTypeFilter.filter(t => t !== 'freelancer'));
                      }
                    }}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                  <span className="text-[14px] font-medium text-[#374151]">Фрилансер</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB]">
                  <input
                    type="checkbox"
                    checked={profileTypeFilter.includes('team')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfileTypeFilter([...profileTypeFilter, 'team']);
                      } else {
                        setProfileTypeFilter(profileTypeFilter.filter(t => t !== 'team'));
                      }
                    }}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                  <span className="text-[14px] font-medium text-[#374151]">Команда</span>
                </label>
              </div>
            </div>

            {/* 5. Город */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Часовой пояс / Город</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#374151] transition-all focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0"
              >
                <option value="">Все города</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* 6. Надёжность */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Надёжность</label>
              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB]">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#10B981] focus:ring-2 focus:ring-[#10B981] focus:ring-offset-0"
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#10B981]">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[14px] font-medium text-[#374151]">Верифицирован</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB]">
                  <input
                    type="checkbox"
                    checked={hasPortfolio}
                    onChange={(e) => setHasPortfolio(e.target.checked)}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0"
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6B7280]">
                    <rect x="2" y="4" width="12" height="9" rx="1"/>
                    <path d="M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[14px] font-medium text-[#374151]">Есть кейсы (≥1)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB]">
                  <input
                    type="checkbox"
                    checked={minRating === 4.5}
                    onChange={(e) => setMinRating(e.target.checked ? 4.5 : 0)}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24] focus:ring-offset-0"
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#FBBF24]">
                    <path d="M8 1L9.545 5.63L14 6.135L10.635 9.455L11.635 14L8 11.635L4.365 14L5.365 9.455L2 6.135L6.455 5.63L8 1Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[14px] font-medium text-[#374151]">Рейтинг 4.5+</span>
                </label>
              </div>
            </div>

            {/* Reset button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#6B7280] transition-all duration-200 hover:-translate-y-px hover:bg-[#F9FAFB] hover:shadow-sm"
              >
                <X className="h-4 w-4" />
                Сбросить фильтры
              </button>
            )}
          </div>

          {/* Main content */}
          <div>
            {/* Active filters chips */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {selectedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillClick(skill)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-200"
                  >
                    #{skill}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {statusFilter !== 'active' && (
                  <button
                    onClick={() => setStatusFilter('active')}
                    className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 transition-colors hover:bg-green-200"
                  >
                    {statusFilter === 'available' ? '🟢 Доступен' : statusFilter === 'team' ? '🟡 В команде' : 'Все статусы'}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {verifiedOnly && (
                  <button
                    onClick={() => setVerifiedOnly(false)}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200"
                  >
                    ✅ Верифицирован
                    <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  Очистить всё
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Найдено специалистов: <span className="font-semibold text-gray-900">{sortedFreelancers.length}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Сортировать:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="relevance">По релевантности</option>
                  <option value="rating">По рейтингу</option>
                  <option value="activity">По активности</option>
                </select>
              </div>
            </div>

            {/* Freelancers Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedFreelancers.map((freelancer) => (
                <FreelancerCard
                  key={freelancer.id}
                  freelancer={freelancer}
                  onMessageClick={() => handleMessageOpen(freelancer.id)}
                  onProfileClick={() => handleProfileOpen(freelancer.id)}
                />
              ))}
            </div>

            {sortedFreelancers.length === 0 && (
              <div className="py-12 text-center">
                <p className="mb-4 text-lg font-semibold text-gray-900">Ничего не найдено</p>
                <p className="mb-6 text-gray-600">Попробуйте убрать часть фильтров или изменить параметры поиска.</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          action={authAction}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}

function FreelancerCard({
  freelancer,
  onMessageClick,
  onProfileClick,
}: {
  freelancer: FreelancerProfile;
  onMessageClick: () => void;
  onProfileClick: () => void;
}) {
  const availabilityConfig = {
    available: { label: '🟢 Доступен к сотрудничеству', color: 'bg-green-100 text-green-700' },
    busy: { label: '🟡 Занят', color: 'bg-yellow-100 text-yellow-700' },
    team: { label: '👥 В команде', color: 'bg-blue-100 text-blue-700' },
  };

  const config = availabilityConfig[freelancer.availability as keyof typeof availabilityConfig];

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
            {freelancer.avatar ? (
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-[#6B7280]">
                {getInitials(freelancer.name)}
              </span>
            )}
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

        {/* Message button - soft blue (Variant B) */}
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
    </div>
  );
}

function AuthModal({ action, onClose }: { action: 'message' | 'profile'; onClose: () => void }) {
  const content = {
    message: {
      title: '💬 Хотите связаться с исполнителем?',
      description: 'Создайте бесплатный аккаунт, чтобы начать диалог.',
    },
    profile: {
      title: '🔒 Подробное портфолио доступно после регистрации',
      description: 'Создайте аккаунт, чтобы увидеть полное портфолио, кейсы и контакты специалиста.',
    },
  };

  const current = content[action];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">{current.title}</h2>
        <p className="mb-6 text-gray-600">{current.description}</p>

        <div className="space-y-3">
          <Link 
            href="/auth/signup"
            className="flex h-[48px] w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Зарегистрироваться
          </Link>
          <Link 
            href="/auth/signin"
            className="flex h-[48px] w-full items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white text-[15px] font-medium text-[#374151] transition-all duration-200 hover:bg-[#F3F4F6]"
          >
            Уже есть аккаунт? Войти
          </Link>
          <button
            onClick={onClose}
            className="w-full rounded-lg px-4 py-3 text-[14px] font-medium text-[#6B7280] transition-colors hover:bg-[#F9FAFB]"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
