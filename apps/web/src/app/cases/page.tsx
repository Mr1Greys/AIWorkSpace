'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, DollarSign, Clock, User } from 'lucide-react';
import { Badge } from '@aiworkspace/ui';

const cases = [
  {
    id: 1,
    title: 'Ассистент поддержки с RAG-архитектурой',
    image: '🤖',
    author: 'Иван Петров',
    authorId: 1,
    skills: ['Python', 'LangChain', 'FastAPI'],
    budget: 1200,
    duration: 7,
    category: 'ai',
  },
  {
    id: 2,
    title: 'E-commerce платформа на Next.js',
    image: '🛒',
    author: 'Мария Сидорова',
    authorId: 2,
    skills: ['Next.js', 'PostgreSQL', 'Stripe'],
    budget: 3500,
    duration: 21,
    category: 'web',
  },
  {
    id: 3,
    title: 'NFT Marketplace на Ethereum',
    image: '🎨',
    author: 'Алексей Иванов',
    authorId: 3,
    skills: ['Solidity', 'React', 'Web3'],
    budget: 5000,
    duration: 30,
    category: 'web3',
  },
];

const categories = ['Все', 'Веб', 'AI', 'Дизайн', 'Web3', 'Мобильная'];

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Портфолио специалистов</h1>
          <p className="mt-2 text-lg text-gray-600">
            Изучите реальные проекты и найдите подходящего исполнителя
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или технологиям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Категория</label>
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
        </div>

        {/* Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
              <div className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-primary-300 hover:shadow-lg">
                {/* Image */}
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 text-6xl transition-transform group-hover:scale-105">
                  {caseItem.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                    {caseItem.title}
                  </h3>

                  {/* Skills */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {caseItem.skills.map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-gray-900">${caseItem.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{caseItem.duration} дней</span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                    <User className="h-4 w-4 text-gray-400" />
                    <Link
                      href={`/profile/${caseItem.authorId}`}
                      className="text-sm font-medium text-gray-700 hover:text-primary-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {caseItem.author}
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
