export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  status: 'active' | 'pending' | 'suspended';
  projects: number;
  totalSpend?: number;
  totalEarned?: number;
  lastLogin: string;
  createdAt: string;
  verified: boolean;
}

export interface AdminProject {
  id: string;
  title: string;
  clientName: string;
  budgetMin: number;
  budgetMax: number;
  status: 'draft' | 'active' | 'in_review' | 'completed' | 'disputed';
  proposals: number;
  createdAt: string;
  deadlineDays: number;
  tags: string[];
}

export interface AdminDispute {
  id: string;
  projectTitle: string;
  client: string;
  freelancer: string;
  openedAt: string;
  amount: number;
  status: 'new' | 'in_progress' | 'resolved';
}

export interface AdminPayout {
  id: string;
  projectTitle: string;
  freelancer: string;
  amount: number;
  commission: number;
  status: 'scheduled' | 'processing' | 'completed';
  scheduledAt: string;
}

export interface AdminSubscription {
  id: string;
  client: string;
  plan: 'standard' | 'pro';
  amount: number;
  period: string;
  status: 'active' | 'trial' | 'cancelled';
  startedAt: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: 'u-001',
    name: 'Алексей Смирнов',
    email: 'alexey@client.io',
    role: 'client',
    status: 'active',
    projects: 12,
    totalSpend: 385_000,
    lastLogin: '2025-01-18T09:32:00Z',
    createdAt: '2023-08-14T12:41:00Z',
    verified: true,
  },
  {
    id: 'u-002',
    name: 'Дарья Ковалёва',
    email: 'daria@freelance.io',
    role: 'freelancer',
    status: 'active',
    projects: 26,
    totalEarned: 540_000,
    lastLogin: '2025-01-18T07:12:00Z',
    createdAt: '2022-11-02T08:15:00Z',
    verified: true,
  },
  {
    id: 'u-003',
    name: 'Иван Волков',
    email: 'ivan.volkov@client.io',
    role: 'client',
    status: 'pending',
    projects: 1,
    totalSpend: 0,
    lastLogin: '2025-01-17T19:01:00Z',
    createdAt: '2025-01-16T10:21:00Z',
    verified: false,
  },
  {
    id: 'u-004',
    name: 'Анна Чернова',
    email: 'anna.chernova@freelance.io',
    role: 'freelancer',
    status: 'suspended',
    projects: 9,
    totalEarned: 180_000,
    lastLogin: '2024-12-28T11:44:00Z',
    createdAt: '2021-05-30T09:18:00Z',
    verified: false,
  },
  {
    id: 'u-005',
    name: 'Мария Бондарь',
    email: 'maria@client.io',
    role: 'client',
    status: 'active',
    projects: 7,
    totalSpend: 190_000,
    lastLogin: '2025-01-18T05:17:00Z',
    createdAt: '2024-02-25T14:11:00Z',
    verified: true,
  },
];

export const adminProjects: AdminProject[] = [
  {
    id: 'p-1203',
    title: 'AI-помощник для службы поддержки',
    clientName: 'Мария Бондарь',
    budgetMin: 280_000,
    budgetMax: 420_000,
    status: 'active',
    proposals: 14,
    createdAt: '2025-01-12T09:00:00Z',
    deadlineDays: 35,
    tags: ['AI', 'LLM', 'NextJS'],
  },
  {
    id: 'p-1198',
    title: 'Редизайн лендинга для SaaS',
    clientName: 'Алексей Смирнов',
    budgetMin: 145_000,
    budgetMax: 210_000,
    status: 'in_review',
    proposals: 7,
    createdAt: '2025-01-09T11:30:00Z',
    deadlineDays: 20,
    tags: ['UI/UX', 'Figma', 'Animation'],
  },
  {
    id: 'p-1185',
    title: 'ML-модели для прогнозирования спроса',
    clientName: 'Мария Бондарь',
    budgetMin: 520_000,
    budgetMax: 720_000,
    status: 'completed',
    proposals: 18,
    createdAt: '2024-11-28T16:45:00Z',
    deadlineDays: 45,
    tags: ['Python', 'TensorFlow', 'Data Science'],
  },
  {
    id: 'p-1179',
    title: 'Telegram-бот для брокерского сервиса',
    clientName: 'Марина Савельева',
    budgetMin: 120_000,
    budgetMax: 180_000,
    status: 'draft',
    proposals: 0,
    createdAt: '2025-01-17T09:55:00Z',
    deadlineDays: 30,
    tags: ['Telegram', 'Node.js'],
  },
  {
    id: 'p-1163',
    title: 'Дашборд продаж для e-commerce',
    clientName: 'Иван Волков',
    budgetMin: 210_000,
    budgetMax: 310_000,
    status: 'disputed',
    proposals: 11,
    createdAt: '2024-12-10T10:05:00Z',
    deadlineDays: 28,
    tags: ['React', 'Prisma', 'PostgreSQL'],
  },
];

export const adminDisputes: AdminDispute[] = [
  {
    id: 'd-001',
    projectTitle: 'Дашборд продаж для e-commerce',
    client: 'Иван Волков',
    freelancer: 'Дарья Ковалёва',
    openedAt: '2025-01-14T14:00:00Z',
    amount: 210_000,
    status: 'in_progress',
  },
  {
    id: 'd-002',
    projectTitle: 'Мобильное приложение для фитнеса',
    client: 'Ольга Мартынова',
    freelancer: 'Анна Чернова',
    openedAt: '2024-12-20T18:30:00Z',
    amount: 160_000,
    status: 'resolved',
  },
];

export const adminStats = {
  totalGMV: 13_250_000,
  activeProjects: 42,
  newUsersToday: 18,
  disputesOpen: 3,
  conversionRate: 28,
  avgProjectBudget: 420_000,
  payoutQueue: 7,
  platformRevenue: 1_678_500,
  commissionShare: 0.05,
  subscriptionPrice: 990,
};

export const adminPayouts: AdminPayout[] = [
  {
    id: 'pay-001',
    projectTitle: 'AI-помощник для службы поддержки',
    freelancer: 'Дарья Ковалёва',
    amount: 360000,
    commission: 18000,
    status: 'processing',
    scheduledAt: '2025-01-18T14:00:00Z',
  },
  {
    id: 'pay-002',
    projectTitle: 'ML-модели для прогнозирования спроса',
    freelancer: 'Елена Волкова',
    amount: 680000,
    commission: 34000,
    status: 'scheduled',
    scheduledAt: '2025-01-20T11:00:00Z',
  },
  {
    id: 'pay-003',
    projectTitle: 'Редизайн лендинга для SaaS',
    freelancer: 'Анна Чернова',
    amount: 130000,
    commission: 6500,
    status: 'completed',
    scheduledAt: '2025-01-16T09:00:00Z',
  },
];

export const adminSubscriptions: AdminSubscription[] = [
  {
    id: 'sub-101',
    client: 'Мария Бондарь',
    plan: 'pro',
    amount: 990,
    period: 'январь 2025',
    status: 'active',
    startedAt: '2024-11-02T08:00:00Z',
  },
  {
    id: 'sub-102',
    client: 'Алексей Смирнов',
    plan: 'standard',
    amount: 990,
    period: 'январь 2025',
    status: 'active',
    startedAt: '2024-07-15T10:00:00Z',
  },
  {
    id: 'sub-103',
    client: 'Иван Волков',
    plan: 'standard',
    amount: 0,
    period: 'январь 2025',
    status: 'trial',
    startedAt: '2025-01-16T10:21:00Z',
  },
];
