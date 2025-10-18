'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Check, 
  X, 
  Zap, 
  Brain, 
  MessageSquare, 
  Briefcase, 
  DollarSign,
  ChevronDown,
  Sparkles,
  Shield,
  TrendingUp
} from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    icon: '🆓',
    description: 'Для новых пользователей',
    subtitle: 'Можно откликаться на 5 проектов в месяц и вести 1 активную сделку',
    price: 'Бесплатно',
    priceAmount: 0,
    buttonText: 'Использовать бесплатно',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: '⚡',
    description: 'Для активных специалистов',
    subtitle: 'Приоритет в поиске, неограниченные отклики, аналитика и без комиссии',
    price: 'от 990 ₽',
    priceAmount: 990,
    period: '/ мес',
    buttonText: 'Оформить подписку',
    buttonVariant: 'primary' as const,
    popular: true,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    icon: '🏆',
    description: 'Для команд и экспертов',
    subtitle: 'Доступ к AI-аналитике, продвинутым фильтрам, продвижение кейсов',
    price: 'от 2 490 ₽',
    priceAmount: 2490,
    period: '/ мес',
    buttonText: 'Начать 7-дневный тест',
    buttonVariant: 'primary' as const,
    popular: false,
  },
];

const features = [
  {
    name: 'Количество откликов в месяц',
    free: '5',
    pro: 'Без ограничений',
    proPlus: 'Без ограничений',
  },
  {
    name: 'Активные сделки',
    free: '1',
    pro: '10',
    proPlus: 'Неограниченно',
  },
  {
    name: 'Приоритет в выдаче (AI-матчинг)',
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: 'Комиссия платформы',
    free: '5%',
    pro: '3%',
    proPlus: '0%',
  },
  {
    name: 'Доступ к AI-подбору проектов',
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: 'Аналитика и статистика профиля',
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: 'Продвижение кейсов в каталоге',
    free: false,
    pro: false,
    proPlus: true,
  },
  {
    name: 'Поддержка 24/7',
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: 'Доступ к командам / студиям',
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: 'Прямые приглашения от заказчиков',
    free: true,
    pro: true,
    proPlus: true,
  },
];

const benefits = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Мгновенное одобрение откликов',
    description: 'Ваши предложения видят первыми',
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'Более точные AI-рекомендации',
    description: 'Алгоритм подбирает идеальные проекты',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Приоритет в чате и приглашениях',
    description: 'Заказчики видят вас в топе списка',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Видимость в каталоге выше',
    description: 'Ваш профиль показывается чаще',
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Без комиссии при работе через эскроу',
    description: 'Получайте 100% от стоимости проекта',
  },
];

const faqs = [
  {
    question: 'Что происходит, если не продлить подписку?',
    answer: 'Аккаунт остаётся активным, но доступ ограничивается возможностями тарифа Free. Все ваши данные, кейсы и история сохраняются.',
  },
  {
    question: 'Можно ли оплачивать криптой?',
    answer: 'Да, мы принимаем оплату через USDC на сети Base или традиционными способами — банковской картой через безопасный платёжный шлюз.',
  },
  {
    question: 'Есть ли возврат средств?',
    answer: 'Да, мы предоставляем возврат средств в течение 3 дней при неактивированном периоде подписки. Просто свяжитесь с поддержкой.',
  },
  {
    question: 'Можно ли переключаться между тарифами?',
    answer: 'Конечно! Вы можете повысить или понизить тариф в любой момент. При повышении разница будет пересчитана пропорционально.',
  },
  {
    question: 'Есть ли скидки для команд?',
    answer: 'Да, для команд от 3 человек мы предоставляем специальные корпоративные условия. Свяжитесь с нами для индивидуального предложения.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            <Sparkles className="h-4 w-4" />
            <span>Прозрачные тарифы без скрытых платежей</span>
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            💼 Тарифы AIWorkSpace
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Выберите удобный формат работы — начинайте бесплатно, развивайтесь профессионально
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 bg-white p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? 'scale-105 border-primary-500 shadow-xl'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              style={{
                animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-1 text-sm font-semibold text-white">
                  Популярный
                </div>
              )}

              <div className="mb-6 text-center">
                <div className="mb-3 text-5xl">{plan.icon}</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm font-medium text-gray-600">{plan.description}</p>
                <p className="mt-2 text-sm text-gray-500">{plan.subtitle}</p>
              </div>

              <div className="mb-6 text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg font-normal text-gray-500">{plan.period}</span>
                  )}
                </div>
              </div>

              <Link href="/auth/signin" className="block">
                <button
                  className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border-2 border-gray-300 bg-white text-gray-900 hover:border-primary-500 hover:text-primary-600'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Сравнение тарифов
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Возможности
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Pro
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Pro+
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.free === 'boolean' ? (
                        feature.free ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-300" />
                        )
                      ) : (
                        <span className="text-sm text-gray-900">{feature.free}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-300" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-gray-900">{feature.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.proPlus === 'boolean' ? (
                        feature.proPlus ? (
                          <Check className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-300" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {feature.proPlus}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Почему пользователи выбирают Pro
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600">
            Получите больше возможностей для роста и развития
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 text-primary-600">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Удобные способы оплаты
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
              <Shield className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Банковская карта</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
              <DollarSign className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">USDC (Base)</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Crypto Pay</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-gray-900">Apple Pay / Google Pay</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Частые вопросы
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-primary-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">
            🔓 Откройте больше возможностей с AIWorkSpace Pro
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Создавайте, развивайтесь, зарабатывайте без ограничений
          </p>
          <Link href="/auth/signin">
            <button className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-colors hover:bg-gray-100">
              Перейти на Pro
            </button>
          </Link>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
