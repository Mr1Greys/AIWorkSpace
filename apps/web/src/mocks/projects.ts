import { Project } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Разработка чат-бота для Telegram',
    description:
      'Добрый день! Нужно сверстать сайт-приглашение на свадьбу по готовому дизайну на Taplink. Дизайн современный, с анимациями и интерактивными элементами. Требуется адаптивная верстка под все устройства, интеграция форм обратной связи и карты проезда.',
    budgetMin: 500,
    budgetMax: 700,
    deadline: '7 дней',
    tags: ['python', 'telegram', 'aiogram'],
    requirements: ['Опыт с Telegram Bot API', 'Знание Python'],
    status: 'active',
    applicants: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    clientId: 'client-1',
    clientName: 'Алекс',
  },
  {
    id: '2',
    title: 'Лендинг для AI-компании',
    description:
      'Требуется разработать современный лендинг для AI-стартапа с плавными анимациями, интерактивными элементами и адаптивным дизайном. Необходимо реализовать секции: Hero, Features, Pricing, Testimonials, FAQ и Contact Form. Важна высокая производительность и SEO-оптимизация.',
    budgetMin: 800,
    budgetMax: 1000,
    deadline: '10 дней',
    tags: ['nextjs', 'react', 'tailwindcss'],
    requirements: ['Портфолио с лендингами', 'Опыт с анимациями'],
    status: 'completed',
    applicants: 5,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    clientId: 'client-1',
    clientName: 'Алекс',
  },
  {
    id: '3',
    title: 'E-commerce Dashboard',
    description:
      'Ищу опытного разработчика для создания админ-панели интернет-магазина. Нужна реализация дашборда с графиками продаж, управлением товарами, заказами и клиентами. Требуется интеграция с REST API, реализация фильтров, поиска и экспорта данных в Excel.',
    budgetMin: 1500,
    budgetMax: 2000,
    deadline: '14 дней',
    tags: ['react', 'dashboard', 'charts'],
    requirements: ['Опыт с дашбордами', 'Знание React'],
    status: 'pending',
    applicants: 8,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    clientId: 'client-1',
    clientName: 'Алекс',
  },
];
