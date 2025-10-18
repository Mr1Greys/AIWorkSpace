'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DollarSign, Clock, User, MessageSquare, Share2, Star, Image as ImageIcon, Eye } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const cases = usePortfolioStore((state) => state.cases);
  const portfolioCase = cases.find((c) => c.id === params.id);

  // Если кейс не найден, показываем сообщение
  if (!portfolioCase) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Кейс не найден</h1>
            <p className="mb-8 text-gray-600">К сожалению, этот кейс не существует или был удален.</p>
            <Link href="/dashboard/portfolio">
              <Button>Вернуться к портфолио</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Автор (для демо используем статичные данные)
  const author = {
    id: 1,
    name: 'Иван Петров',
    avatar: '👨‍💻',
    rating: 4.9,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard/portfolio" className="hover:text-primary-600">
              Портфолио
            </Link>
            <span>/</span>
            <span className="text-gray-900">{portfolioCase.title}</span>
          </div>

          {/* Main Content */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">{portfolioCase.title}</h1>

              {/* Author */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/profile/${author.id}`}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <div className="text-3xl">{author.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{author.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{author.rating}</span>
                    </div>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                    Поделиться
                  </Button>
                  <Link href="/dashboard/messages">
                    <Button>
                      <MessageSquare className="h-4 w-4" />
                      Связаться
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50">
              {portfolioCase.image ? (
                <img
                  src={portfolioCase.image}
                  alt={portfolioCase.title}
                  className="h-96 w-full object-cover"
                />
              ) : (
                <div className="flex h-96 items-center justify-center">
                  <ImageIcon className="h-24 w-24 text-gray-300" />
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mb-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="font-semibold text-gray-900">{portfolioCase.views} просмотров</span>
              </div>
              <div className="flex items-center gap-2">
                <span>❤️</span>
                <span className="font-semibold text-gray-900">{portfolioCase.likes} лайков</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioCase.tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Описание проекта</h3>
              <div className="whitespace-pre-line text-gray-700">{portfolioCase.description}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">Нужен похожий проект?</h2>
            <p className="mb-6 text-primary-100">
              Свяжитесь с {author.name} и обсудите детали вашего проекта
            </p>
            <div className="flex justify-center gap-4">
              <Link href={`/profile/${author.id}`}>
                <Button className="bg-white text-primary-600 hover:bg-gray-100">
                  Посмотреть профиль
                </Button>
              </Link>
              <Link href="/dashboard/messages">
                <Button className="border-2 border-white bg-transparent text-white hover:bg-white/10">
                  <MessageSquare className="h-4 w-4" />
                  Написать сообщение
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
