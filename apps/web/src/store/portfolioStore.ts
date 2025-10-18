import { create } from 'zustand';

export interface PortfolioCase {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
}

interface PortfolioStore {
  cases: PortfolioCase[];
  hydrated: boolean;
  addCase: (caseData: Omit<PortfolioCase, 'id' | 'views' | 'likes' | 'createdAt'>) => void;
  updateCase: (id: string, caseData: Partial<PortfolioCase>) => void;
  deleteCase: (id: string) => void;
  setHydrated: () => void;
}

export const usePortfolioStore = create<PortfolioStore>()((set) => ({
  cases: [
    {
      id: '1',
      title: 'AI-powered чат-бот для e-commerce',
      description: 'Разработка интеллектуального чат-бота с интеграцией GPT-4 для автоматизации поддержки клиентов',
      image: null,
      tags: ['#AI', '#Node.js', '#React', '#TelegramBot'],
      views: 234,
      likes: 18,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Лендинг для AI-стартапа',
      description: 'Современный лендинг с анимациями и интерактивными элементами',
      image: null,
      tags: ['#React', '#TailwindCSS', '#Framer'],
      views: 189,
      likes: 24,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Dashboard для аналитики данных',
      description: 'Интерактивный дашборд с визуализацией данных и real-time обновлениями',
      image: null,
      tags: ['#TypeScript', '#Next.js', '#D3.js'],
      views: 156,
      likes: 15,
      createdAt: new Date().toISOString(),
    },
  ],
  hydrated: true,

  addCase: (caseData) =>
    set((state) => ({
      cases: [
        {
          ...caseData,
          id: Date.now().toString(),
          views: 0,
          likes: 0,
          createdAt: new Date().toISOString(),
        },
        ...state.cases,
      ],
    })),

  updateCase: (id, caseData) =>
    set((state) => ({
      cases: state.cases.map((c) => (c.id === id ? { ...c, ...caseData } : c)),
    })),

  deleteCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((c) => c.id !== id),
    })),

  setHydrated: () => set({ hydrated: true }),
}));
