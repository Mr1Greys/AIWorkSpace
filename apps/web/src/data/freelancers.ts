export interface FreelancerPortfolioCase {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  views: number;
  likes: number;
}

export interface FreelancerProfile {
  id: string;
  name: string;
  headline: string;
  avatar?: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  location: string;
  timezone: string;
  skills: string[];
  availability: 'available' | 'busy' | 'team';
  verified: boolean;
  online: boolean;
  portfolioCount: number;
  profileType: 'freelancer' | 'team';
  bio: string;
  rate: { min: number; max: number };
  languages: { language: string; level: string }[];
  successRate: number;
  completedProjects: number;
  responseTime: string;
  categories: string[];
  portfolio: FreelancerPortfolioCase[];
}

export const freelancerDirectory: FreelancerProfile[] = [
  {
    id: 'alex-johnson',
    name: 'Алекс Джонсон',
    headline: 'Full-Stack разработчик и AI-инженер',
    avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=200&q=60',
    rating: 4.9,
    reviewsCount: 47,
    experience: 5,
    location: 'Москва',
    timezone: 'UTC+3',
    skills: ['NextJS', 'AI', 'NodeJS', 'React', 'Python', 'LangChain', 'TailwindCSS'],
    availability: 'available',
    verified: true,
    online: true,
    portfolioCount: 8,
    profileType: 'freelancer',
    bio: 'Full-stack инженер с упором на построение AI‑продуктов. Помогаю компаниям внедрять ML‑решения, интегрировать LLM и создавать удобные дашборды. Люблю быстрые итерации, чистый код и хорошую коммуникацию.',
    rate: { min: 45, max: 60 },
    languages: [
      { language: 'Русский', level: 'Носитель' },
      { language: 'Английский', level: 'C1 — Advanced' },
    ],
    successRate: 96,
    completedProjects: 32,
    responseTime: 'в течение 1 часа',
    categories: ['AI/ML', 'Веб-разработка'],
    portfolio: [
      {
        id: 'case-ecom-dashboard',
        title: 'AI-дэшборд для e-commerce',
        description:
          'Создал админ-панель для e-commerce проекта с аналитикой продаж, прогнозом на базе ML-модели и автоматизацией отчётности.',
        tags: ['NextJS', 'TypeScript', 'LangChain', 'TailwindCSS'],
        views: 1240,
        likes: 82,
      },
      {
        id: 'case-support-bot',
        title: 'LLM-бот поддержки',
        description:
          'Разработал чат-бота на базе GPT-4 для службы поддержки SaaS продукта. Интеграция с CRM, восстановление контекста и аналитика диалогов.',
        tags: ['OpenAI', 'NextJS', 'PostgreSQL', 'Redis'],
        views: 980,
        likes: 65,
      },
    ],
  },
  {
    id: 'sara-chen',
    name: 'Сара Чен',
    headline: 'Senior Backend Engineer',
    rating: 4.8,
    reviewsCount: 32,
    experience: 4,
    location: 'Санкт-Петербург',
    timezone: 'UTC+3',
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'TypeScript', 'GraphQL'],
    availability: 'available',
    verified: true,
    online: false,
    portfolioCount: 5,
    profileType: 'freelancer',
    bio: 'Бэкенд разработчик с опытом проектирования высоконагруженных микросервисов. Люблю писать понятный код, покрывать его тестами и автоматизировать всё, что можно.',
    rate: { min: 40, max: 55 },
    languages: [
      { language: 'Русский', level: 'Носитель' },
      { language: 'Английский', level: 'B2 — Upper Intermediate' },
    ],
    successRate: 92,
    completedProjects: 27,
    responseTime: 'в течение 3 часов',
    categories: ['Backend', 'Интеграции'],
    portfolio: [
      {
        id: 'case-subscription-platform',
        title: 'Платформа подписок',
        description:
          'Разработала ядро платформы подписок с биллингом, интеграцией Stripe и админ-панелью. Реализовала распределённые очереди отправки писем.',
        tags: ['Node.js', 'PostgreSQL', 'RabbitMQ', 'Stripe'],
        views: 760,
        likes: 54,
      },
    ],
  },
  {
    id: 'mike-rodriguez',
    name: 'Майк Родригес',
    headline: 'Blockchain Developer',
    rating: 5.0,
    reviewsCount: 28,
    experience: 6,
    location: 'Казань',
    timezone: 'UTC+3',
    skills: ['Solidity', 'Web3', 'Ethers.js', 'Hardhat', 'React'],
    availability: 'busy',
    verified: false,
    online: false,
    portfolioCount: 12,
    profileType: 'freelancer',
    bio: 'Помогаю запускать web3-продукты: смарт-контракты, NFT, DAO и DeFi. Внимательно отношусь к безопасности и тестированию.',
    rate: { min: 60, max: 80 },
    languages: [{ language: 'Английский', level: 'C1 — Advanced' }],
    successRate: 98,
    completedProjects: 18,
    responseTime: 'в течение 6 часов',
    categories: ['Web3'],
    portfolio: [
      {
        id: 'case-defi-protocol',
        title: 'DeFi-протокол стейкинга',
        description:
          'Разработал и провёл аудит смарт-контрактов протокола стейкинга с вознаграждениями, написал скрипты развёртывания и автоматизированные тесты.',
        tags: ['Solidity', 'Hardhat', 'TypeScript'],
        views: 540,
        likes: 47,
      },
    ],
  },
  {
    id: 'anna-petrova',
    name: 'Анна Петрова',
    headline: 'Frontend разработчик',
    rating: 4.9,
    reviewsCount: 41,
    experience: 3,
    location: 'Новосибирск',
    timezone: 'UTC+7',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'NextJS'],
    availability: 'available',
    verified: true,
    online: true,
    portfolioCount: 6,
    profileType: 'freelancer',
    bio: 'Делаю быстрые, отзывчивые интерфейсы и люблю отрисовывать дизайн-системы. Работаю в связке с дизайнерами и продуктом.',
    rate: { min: 30, max: 45 },
    languages: [
      { language: 'Русский', level: 'Носитель' },
      { language: 'Английский', level: 'B1 — Intermediate' },
    ],
    successRate: 94,
    completedProjects: 25,
    responseTime: 'в течение 2 часов',
    categories: ['Frontend', 'Дизайн-системы'],
    portfolio: [
      {
        id: 'case-saas-dashboard',
        title: 'Интерфейс SaaS-платформы',
        description:
          'Собрала дизайн-систему и реализовала фронтенд для CRM-платформы. 50+ переиспользуемых компонентов, тёмная тема, адаптивная верстка.',
        tags: ['React', 'TailwindCSS', 'Storybook'],
        views: 680,
        likes: 59,
      },
    ],
  },
  {
    id: 'dmitry-sokolov',
    name: 'Дмитрий Соколов',
    headline: 'UI/UX дизайнер и фронтенд',
    rating: 4.7,
    reviewsCount: 35,
    experience: 4,
    location: 'Екатеринбург',
    timezone: 'UTC+5',
    skills: ['Figma', 'React', 'Animation', 'Design', 'Prototyping'],
    availability: 'available',
    verified: false,
    online: false,
    portfolioCount: 9,
    profileType: 'freelancer',
    bio: 'Создаю визуально сильные интерфейсы и сразу же внедряю их в код. Специализация — промо-лендинги и SaaS.',
    rate: { min: 35, max: 50 },
    languages: [{ language: 'Русский', level: 'Носитель' }],
    successRate: 90,
    completedProjects: 22,
    responseTime: 'в течение 4 часов',
    categories: ['UI/UX', 'Frontend'],
    portfolio: [
      {
        id: 'case-landing-product',
        title: 'Лендинг для AI‑продукта',
        description:
          'Разработал концепт, прототип и анимации для лендинга сервиса распознавания изображений. Реализовал фронтенд с анимациями GSAP.',
        tags: ['Figma', 'React', 'GSAP'],
        views: 430,
        likes: 38,
      },
    ],
  },
  {
    id: 'elena-volkova',
    name: 'Елена Волкова',
    headline: 'Data Scientist & ML Engineer',
    rating: 4.9,
    reviewsCount: 52,
    experience: 7,
    location: 'Москва',
    timezone: 'UTC+3',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AI', 'Pandas', 'Jupyter'],
    availability: 'team',
    verified: true,
    online: true,
    portfolioCount: 15,
    profileType: 'team',
    bio: 'Разрабатываю ML‑модели и продакшен пайплайны. Фокус — рекомендации, NLP и компьютерное зрение.',
    rate: { min: 70, max: 90 },
    languages: [
      { language: 'Русский', level: 'Носитель' },
      { language: 'Английский', level: 'C1 — Advanced' },
    ],
    successRate: 97,
    completedProjects: 40,
    responseTime: 'в течение 1 часа',
    categories: ['AI/ML', 'Data'],
    portfolio: [
      {
        id: 'case-ml-recsys',
        title: 'Рекомендательная система для маркетплейса',
        description:
          'Спроектировала и внедрила ML‑пайплайн: ETL, обучение моделей, A/B‑тестирование и мониторинг качества. Конверсия выросла на 18%.',
        tags: ['Python', 'TensorFlow', 'Airflow', 'Docker'],
        views: 1320,
        likes: 95,
      },
    ],
  },
];
