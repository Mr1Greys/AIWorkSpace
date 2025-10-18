'use client';

import { useState } from 'react';
import Link from 'next/link';
import { POPULAR_TAGS } from '@aiworkspace/shared';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, Filter, X, DollarSign, Clock, User, Star, Briefcase, ThumbsUp, ThumbsDown, HelpCircle, Wrench, Bot, Globe, Smartphone, Palette, BarChart3 } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';

// Категории проектов
const categories = [
  { id: 'all', label: 'Все категории', icon: Wrench, tags: [] },
  { id: 'ai', label: 'AI & ML', icon: Bot, tags: ['Python', 'LangChain', 'LLM', 'RAG', 'OpenAI'] },
  { id: 'web', label: 'Веб-разработка', icon: Globe, tags: ['NextJS', 'React', 'TypeScript', 'TailwindCSS'] },
  { id: 'telegram', label: 'Telegram-боты', icon: Smartphone, tags: ['Python', 'aiogram', 'Telegram Bot API', 'Node.js'] },
  { id: 'design', label: 'Дизайн', icon: Palette, tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'] },
  { id: 'data', label: 'Data & Аналитика', icon: BarChart3, tags: ['Python', 'Pandas', 'SQL', 'Jupyter', 'Visualization'] },
];

const additionalTags = [
  'LangChain',
  'OpenAI',
  'LLM',
  'RAG',
  'Telegram Bot API',
  'aiogram',
  'TensorFlow',
  'PyTorch',
  'Pandas',
  'SQL',
  'Jupyter',
];

const allTags = Array.from(new Set<string>([...POPULAR_TAGS, ...additionalTags]));

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 10000]);
  const [deadlineFilter, setDeadlineFilter] = useState<string>('all'); // all, week, month, custom
  const [levelFilter, setLevelFilter] = useState<string[]>([]); // junior, middle, senior
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'relevance' | 'popular'>('date');
  
  const projects = useProjectStore((state) => state.projects);
  const hydrated = useProjectStore((state) => state.hydrated);

  // Фильтрация проектов
  const filteredProjects = projects.filter((project) => {
    // Поиск
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Категория
    if (selectedCategory !== 'all') {
      const categoryTags = categories.find(c => c.id === selectedCategory)?.tags || [];
      const hasMatch = project.tags.some(tag => 
        categoryTags.some(catTag => tag.toLowerCase().includes(catTag.toLowerCase()))
      );
      if (!hasMatch) return false;
    }

    // Теги
    if (selectedTags.length > 0) {
      const hasAllTags = selectedTags.every(selectedTag =>
        project.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      );
      if (!hasAllTags) return false;
    }

    // Бюджет
    if (project.budgetMax < budgetRange[0] || project.budgetMin > budgetRange[1]) {
      return false;
    }

    return true;
  });

  // Сортировка
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'budget':
        return b.budgetMax - a.budgetMax;
      case 'popular':
        return b.applicants - a.applicants;
      case 'relevance':
      default:
        return 0;
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleLevel = (level: string) => {
    setLevelFilter(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3B82F6] border-r-transparent"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Биржа проектов
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Найдите интересный проект и начните зарабатывать уже сегодня
          </p>
        </div>

        {/* Поиск */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="🔍 Поиск по названию, описанию или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Панель фильтров */}
          <div className="rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2.5">
              <Filter className="h-5 w-5 text-[#6B7280]" />
              <h3 className="text-[16px] font-semibold text-[#1F2937]">Фильтры</h3>
            </div>

            {/* Категории */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">
                Категория
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-md'
                          : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Бюджет */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">
                Бюджет ($)
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={budgetRange[0]}
                    onChange={(e) => setBudgetRange([Number(e.target.value), budgetRange[1]])}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="От"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="number"
                    value={budgetRange[1]}
                    onChange={(e) => setBudgetRange([budgetRange[0], Number(e.target.value)])}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="До"
                  />
                </div>
              </div>
            </div>

            {/* Сроки */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">
                Срок выполнения
              </label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'Любой срок' },
                  { id: 'week', label: 'До 1 недели' },
                  { id: 'month', label: 'До 1 месяца' },
                  { id: 'custom', label: 'Более месяца' },
                ].map((deadline) => (
                  <label key={deadline.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deadline"
                      checked={deadlineFilter === deadline.id}
                      onChange={() => setDeadlineFilter(deadline.id)}
                      className="h-4 w-4 text-primary-600"
                    />
                    <span className="text-[14px] text-[#6B7280]">{deadline.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Уровень */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">
                Требуемый уровень
              </label>
              <div className="space-y-2">
                {['Junior', 'Middle', 'Senior'].map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={levelFilter.includes(level)}
                      onChange={() => toggleLevel(level)}
                      className="h-4 w-4 rounded text-primary-600"
                    />
                    <span className="text-[14px] text-[#6B7280]">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Теги */}
            <div className="mb-6">
              <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">
                Технологии
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Сброс фильтров */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTags([]);
                setBudgetRange([0, 10000]);
                setDeadlineFilter('all');
                setLevelFilter([]);
                setSearchQuery('');
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Сбросить все
            </button>
          </div>

          {/* Список проектов */}
          <div>
            {/* Верхняя панель */}
            <div className="mb-6 flex items-center justify-between rounded-xl border border-[#F3F4F6] bg-white p-4 shadow-sm">
              <div className="text-[14px] text-[#6B7280]">
                Найдено проектов: <span className="font-semibold text-[#1F2937]">{sortedProjects.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-[#6B7280]">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-[13px] font-medium text-[#1F2937]"
                >
                  <option value="date">По дате</option>
                  <option value="budget">По бюджету</option>
                  <option value="relevance">По релевантности</option>
                  <option value="popular">По популярности</option>
                </select>
              </div>
            </div>

            {/* Активные фильтры */}
            {(selectedTags.length > 0 || selectedCategory !== 'all') && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (() => {
                  const selectedCat = categories.find(c => c.id === selectedCategory);
                  const IconComponent = selectedCat?.icon;
                  return (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EEF2FF] px-3 py-1.5 text-[13px] font-medium text-[#4F46E5]">
                      {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                      {selectedCat?.label}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })()}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#EEF2FF] px-3 py-1.5 text-[13px] font-medium text-[#4F46E5]"
                  >
                    #{tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Карточки проектов */}
            <div className="space-y-4">
              {sortedProjects.length === 0 ? (
                <div className="rounded-2xl border border-[#F3F4F6] bg-white p-12 text-center">
                  <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Проекты не найдены
                  </h3>
                  <p className="text-gray-600">
                    Попробуйте изменить фильтры или поисковый запрос
                  </p>
                </div>
              ) : (
                sortedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Компонент карточки проекта
function ProjectCard({ project }: { project: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isLongDescription = project.description.length > 100;

  // Вычисляем оставшееся время
  const getTimeLeft = () => {
    const created = new Date(project.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `Осталось: ${diffDays} д. ${diffHours} ч.`;
    } else {
      return `Осталось: ${diffHours} ч.`;
    }
  };

  return (
    <div className="group rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Заголовок и бюджет */}
      <div className="mb-4 flex items-start justify-between gap-6">
        <div className="flex-1">
          <Link href={`/projects/${project.id}`}>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-[#3B82F6]">
              {project.title}
            </h3>
          </Link>
          
          {/* Описание - рядом с заголовком */}
          <div className="max-w-[65%]">
            <p className={`text-[15px] leading-relaxed text-[#6B7280] ${!showFullDescription && isLongDescription ? 'line-clamp-2' : ''}`}>
              {project.description}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-1 text-[13px] font-medium text-[#3B82F6] hover:text-[#2563EB] hover:underline"
              >
                {showFullDescription ? 'Скрыть' : 'Показать полностью'}
              </button>
            )}
          </div>
        </div>
        
        <div className="ml-4 text-right">
          <div className="text-[12px] text-[#6B7280]">Желаемый бюджет: до</div>
          <div className="text-[20px] font-bold text-[#3B82F6]">
            ${project.budgetMax}
          </div>
        </div>
      </div>

      {/* Теги */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 5).map((tag: string) => (
          <span
            key={tag}
            className="rounded-lg bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium text-[#6B7280]"
          >
            #{tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="rounded-lg bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium text-[#6B7280]">
            +{project.tags.length - 5}
          </span>
        )}
      </div>

      {/* Информация о заказчике */}
      <div className="mb-4 flex items-center gap-3 border-t border-[#F3F4F6] pt-4">
        {/* Аватар заказчика с синей обводкой */}
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#3B82F6] bg-[#F3F4F6] text-[18px] font-semibold text-[#6B7280]">
            {project.clientName.substring(0, 2).toUpperCase()}
          </div>
          {/* Зеленая точка онлайн */}
          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22C55E]"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#6B7280]">Заказчик:</span>
            <span className="font-medium text-[#1F2937]">{project.clientName}</span>
          </div>
          <div className="text-[13px] text-[#6B7280]">
            Размещено проектов на бирже: {Math.floor(Math.random() * 10) + 1}
          </div>
        </div>
      </div>

      {/* Нижняя панель: время и предложения */}
      <div className="mb-4 flex items-center justify-between text-[13px] text-[#6B7280]">
        <div>{getTimeLeft()}</div>
        <div>Предложений: {project.applicants}</div>
      </div>

      {/* Кнопка и иконки реакций */}
      <div className="flex items-center justify-between gap-3">
        {/* Кнопка откликнуться - СЛЕВА */}
        <Link href={`/projects/${project.id}`}>
          <button className="rounded-xl bg-[#EEF2FF] px-8 py-3 text-[14px] font-semibold text-[#3B82F6] transition-all duration-200 hover:bg-[#E0E7FF]">
            Откликнуться
          </button>
        </Link>

        {/* Иконки реакций - СПРАВА */}
        <div className="flex gap-2">
          <button 
            className="peer/like relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-all hover:border-[#22C55E] hover:bg-[#F0FDF4]"
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.remove('opacity-0');
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.add('opacity-0');
            }}
          >
            <ThumbsUp className="h-4 w-4 text-[#6B7280] transition-colors peer-hover/like:text-[#22C55E]" />
            <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity pointer-events-none">
              Хороший проект
            </span>
          </button>
          <button 
            className="peer/dislike relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-all hover:border-[#EF4444] hover:bg-[#FEF2F2]"
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.remove('opacity-0');
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.add('opacity-0');
            }}
          >
            <ThumbsDown className="h-4 w-4 text-[#6B7280] transition-colors peer-hover/dislike:text-[#EF4444]" />
            <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity pointer-events-none">
              Низкая цена
            </span>
          </button>
          <button 
            className="peer/help relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-all hover:border-[#F59E0B] hover:bg-[#FFFBEB]"
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.remove('opacity-0');
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) tooltip.classList.add('opacity-0');
            }}
          >
            <HelpCircle className="h-4 w-4 text-[#6B7280] transition-colors peer-hover/help:text-[#F59E0B]" />
            <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity pointer-events-none">
              Неясное описание
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
