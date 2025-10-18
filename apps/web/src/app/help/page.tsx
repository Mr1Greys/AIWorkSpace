'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, ChevronDown, MessageCircle, Mail } from 'lucide-react';

const categories = [
  {
    id: 'getting-started',
    name: 'Начало работы',
    faqs: [
      {
        q: 'Как зарегистрироваться на платформе?',
        a: 'Нажмите кнопку "Регистрация" в правом верхнем углу. Выберите роль (заказчик или исполнитель) и войдите через GitHub, LinkedIn, Telegram или создайте аккаунт с email.',
      },
      {
        q: 'Какие документы нужны для работы?',
        a: 'Для начала работы достаточно заполнить профиль. Для вывода средств потребуется подтверждение личности.',
      },
    ],
  },
  {
    id: 'clients',
    name: 'Для заказчиков',
    faqs: [
      {
        q: 'Как создать задание?',
        a: 'Используйте брив-конструктор: опишите проект, выберите технологии, укажите бюджет и сроки. AI автоматически подберёт подходящих специалистов.',
      },
      {
        q: 'Как выбрать исполнителя?',
        a: 'Изучите профили, портфолио и отзывы. Обратите внимание на рейтинг и совпадение навыков с вашим проектом.',
      },
    ],
  },
  {
    id: 'freelancers',
    name: 'Для исполнителей',
    faqs: [
      {
        q: 'Как получить больше заказов?',
        a: 'Заполните профиль полностью, добавьте кейсы в портфолио, поддерживайте высокий рейтинг и быстро отвечайте на сообщения.',
      },
      {
        q: 'Какая комиссия платформы?',
        a: 'Free: 5%, Pro: 3%, Pro+: 0%. Подробнее на странице тарифов.',
      },
    ],
  },
  {
    id: 'payment',
    name: 'Оплата и эскроу',
    faqs: [
      {
        q: 'Как работает эскроу?',
        a: 'Заказчик вносит средства в смарт-контракт. После завершения работы и подтверждения, деньги автоматически переводятся исполнителю.',
      },
      {
        q: 'Какие способы оплаты доступны?',
        a: 'USDC на Base L2, банковские карты, Crypto Pay, Apple Pay, Google Pay.',
      },
    ],
  },
  {
    id: 'disputes',
    name: 'Споры',
    faqs: [
      {
        q: 'Что делать при возникновении спора?',
        a: 'Нажмите "Открыть спор" в чате. Администрация рассмотрит ситуацию и примет решение о распределении средств.',
      },
      {
        q: 'Сколько времени рассматривается спор?',
        a: 'Обычно 2-3 рабочих дня. В сложных случаях до 7 дней.',
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">Центр помощи</h1>
          <p className="text-xl text-gray-600">Найдите ответы на ваши вопросы</p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mx-auto max-w-4xl space-y-8">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{category.name}</h2>
              <div className="space-y-3">
                {category.faqs.map((faq, index) => {
                  const faqId = `${category.id}-${index}`;
                  return (
                    <div
                      key={faqId}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === faqId ? null : faqId)}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="font-semibold text-gray-900">{faq.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            openFaq === faqId ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === faqId && (
                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                          <p className="text-gray-700">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">Не нашли ответ?</h2>
          <p className="mb-6 text-primary-100">Свяжитесь с нашей службой поддержки</p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-gray-100">
              <MessageCircle className="h-5 w-5" />
              Открыть чат
            </button>
            <button className="flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              <Mail className="h-5 w-5" />
              support@aiworkspace.io
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
