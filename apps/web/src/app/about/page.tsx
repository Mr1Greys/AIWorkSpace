import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Shield, Zap, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@aiworkspace/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">О платформе AIWorkSpace</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Мы создаём будущее фриланса, где технологии, прозрачность и безопасность работают вместе
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Наша миссия</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Мы верим, что каждый талантливый специалист заслуживает справедливой оплаты и прозрачных условий работы. 
              AIWorkSpace использует искусственный интеллект и блокчейн-технологии, чтобы сделать фриланс честным, 
              безопасным и эффективным для всех участников.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Как это работает</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: '1', title: 'Создайте задание', desc: 'Опишите проект в брив-конструкторе' },
              { step: '2', title: 'AI подберёт специалистов', desc: 'Алгоритм найдёт лучших кандидатов' },
              { step: '3', title: 'Работайте безопасно', desc: 'Средства в эскроу до завершения' },
              { step: '4', title: 'Оцените результат', desc: 'Оставьте отзыв и получите кейс' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* For Clients */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Для заказчиков</h2>
              <div className="space-y-4">
                {[
                  { icon: <Sparkles />, text: 'AI подбирает идеальных специалистов' },
                  { icon: <Shield />, text: 'Безопасные сделки через эскроу' },
                  { icon: <Zap />, text: 'Быстрый отклик и старт работы' },
                  { icon: <TrendingUp />, text: 'Прозрачная аналитика и отчёты' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary-100 p-2 text-primary-600">{item.icon}</div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For Freelancers */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Для исполнителей</h2>
              <div className="space-y-4">
                {[
                  { icon: <Users />, text: 'Доступ к качественным проектам' },
                  { icon: <Shield />, text: 'Гарантия оплаты через смарт-контракты' },
                  { icon: <Heart />, text: 'Низкие комиссии и честные условия' },
                  { icon: <TrendingUp />, text: 'Рост репутации и портфолио' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="rounded-lg bg-secondary-100 p-2 text-secondary-600">{item.icon}</div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: '10,000+', label: 'Пользователей' },
              { number: '5,000+', label: 'Проектов' },
              { number: '$2M+', label: 'Выплачено' },
              { number: '4.9', label: 'Средний рейтинг' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-4xl font-bold">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Присоединяйтесь к AIWorkSpace</h2>
          <p className="mb-8 text-lg text-gray-600">
            Начните работать с лучшими специалистами уже сегодня
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Создать аккаунт</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
