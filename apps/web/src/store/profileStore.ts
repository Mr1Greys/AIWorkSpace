import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Профиль исполнителя
export interface FreelancerProfile {
  // Основная информация
  name: string;
  email: string;
  telegram: string;
  avatar: string | null;
  
  // Профессиональная информация
  headline: string; // Заголовок (например: "Full-stack разработчик")
  bio: string; // О себе
  experience: number; // Опыт работы в годах
  hourlyRate: number; // Ставка в час
  
  // Локация
  city: string;
  country: string;
  timezone: string;
  
  // Навыки и направления
  skills: string[]; // Навыки (например: ["React", "Node.js"])
  categories: string[]; // Направления (например: ["AI", "Web"])
  
  // Дополнительная информация
  languages: { language: string; level: string }[]; // Языки
  education: {
    institution: string;
    degree: string;
    field: string;
    year: number;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: number;
  }[];
  
  // Статистика
  completedProjects: number;
  rating: number;
  reviewsCount: number;
  
  // Настройки
  availability: 'available' | 'busy' | 'unavailable';
  verified: boolean;
  
  // Даты
  createdAt: string;
  updatedAt: string;
}

// Профиль заказчика
export interface ClientProfile {
  // Основная информация
  name: string;
  email: string;
  telegram: string;
  avatar: string | null;
  
  // Тип заказчика
  clientType: 'individual' | 'company' | 'entrepreneur'; // физ. лицо, компания, ИП
  
  // Информация о компании (для company и entrepreneur)
  companyName: string;
  companyWebsite: string;
  companySize: string; // "1-10", "11-50", "51-200", "201-500", "500+"
  industry: string;
  
  // Локация
  city: string;
  country: string;
  timezone: string;
  
  // О себе/компании
  bio: string;
  
  // Статистика
  projectsPosted: number;
  activeProjects: number;
  rating: number;
  reviewsCount: number;
  
  // Настройки
  verified: boolean;
  
  // Даты
  createdAt: string;
  updatedAt: string;
}

interface ProfileStore {
  freelancerProfile: FreelancerProfile | null;
  clientProfile: ClientProfile | null;
  hydrated: boolean;
  
  // Freelancer profile actions
  updateFreelancerProfile: (profile: Partial<FreelancerProfile>) => void;
  setFreelancerProfile: (profile: FreelancerProfile) => void;
  initializeFreelancerProfile: (name: string, email: string) => void;
  
  // Client profile actions
  updateClientProfile: (profile: Partial<ClientProfile>) => void;
  setClientProfile: (profile: ClientProfile) => void;
  initializeClientProfile: (name: string, email: string) => void;
  
  // Utility
  resetProfiles: () => void;
  setHydrated: () => void;
  calculateFreelancerCompletion: () => number;
  calculateClientCompletion: () => number;
}

// Дефолтный профиль исполнителя
const defaultFreelancerProfile: FreelancerProfile = {
  name: '',
  email: '',
  telegram: '',
  avatar: null,
  headline: '',
  bio: '',
  experience: 0,
  hourlyRate: 0,
  city: '',
  country: '',
  timezone: 'UTC+3',
  skills: [],
  categories: [],
  languages: [],
  education: [],
  certifications: [],
  completedProjects: 0,
  rating: 0,
  reviewsCount: 0,
  availability: 'available',
  verified: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Дефолтный профиль заказчика
const defaultClientProfile: ClientProfile = {
  name: '',
  email: '',
  telegram: '',
  avatar: null,
  clientType: 'individual', // По умолчанию физ. лицо
  companyName: '',
  companyWebsite: '',
  companySize: '',
  industry: '',
  city: '',
  country: '',
  timezone: 'UTC+3',
  bio: '',
  projectsPosted: 0,
  activeProjects: 0,
  rating: 0,
  reviewsCount: 0,
  verified: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      freelancerProfile: defaultFreelancerProfile,
      clientProfile: defaultClientProfile,
      hydrated: false,

      updateFreelancerProfile: (profile) =>
        set((state) => ({
          freelancerProfile: state.freelancerProfile
            ? {
                ...state.freelancerProfile,
                ...profile,
                updatedAt: new Date().toISOString(),
              }
            : null,
        })),

      setFreelancerProfile: (profile) =>
        set({
          freelancerProfile: {
            ...profile,
            updatedAt: new Date().toISOString(),
          },
        }),

      initializeFreelancerProfile: (name, email) =>
        set({
          freelancerProfile: {
            ...defaultFreelancerProfile,
            name,
            email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),

      updateClientProfile: (profile) =>
        set((state) => ({
          clientProfile: state.clientProfile
            ? {
                ...state.clientProfile,
                ...profile,
                updatedAt: new Date().toISOString(),
              }
            : null,
        })),

      setClientProfile: (profile) =>
        set({
          clientProfile: {
            ...profile,
            updatedAt: new Date().toISOString(),
          },
        }),

      initializeClientProfile: (name, email) =>
        set({
          clientProfile: {
            ...defaultClientProfile,
            name,
            email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),

      resetProfiles: () =>
        set({
          freelancerProfile: {
            ...defaultFreelancerProfile,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          clientProfile: {
            ...defaultClientProfile,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),

      setHydrated: () => set({ hydrated: true }),

      // Расчет процента заполнения профиля исполнителя
      calculateFreelancerCompletion: () => {
        const profile = get().freelancerProfile;
        if (!profile) return 0;

        let completed = 0;
        const total = 10; // Общее количество важных полей

        // Основная информация (30%)
        if (profile.name) completed += 1;
        if (profile.email) completed += 1;
        if (profile.telegram) completed += 1;

        // Аватар (20%)
        if (profile.avatar) completed += 2;

        // Профессиональная информация (30%)
        if (profile.headline) completed += 1;
        if (profile.bio && profile.bio.length > 50) completed += 1;
        if (profile.experience > 0) completed += 1;

        // Навыки и направления (20%)
        if (profile.skills.length >= 3) completed += 1;
        if (profile.categories.length >= 1) completed += 1;

        return Math.round((completed / total) * 100);
      },

      // Расчет процента заполнения профиля заказчика
      calculateClientCompletion: () => {
        const profile = get().clientProfile;
        if (!profile) return 0;

        let completed = 0;
        const total = 8; // Общее количество важных полей

        // Основная информация (40%)
        if (profile.name) completed += 1;
        if (profile.email) completed += 1;
        if (profile.telegram) completed += 1;

        // Аватар (20%)
        if (profile.avatar) completed += 2;

        // Информация о компании (40%)
        if (profile.companyName) completed += 1;
        if (profile.industry) completed += 1;
        if (profile.bio && profile.bio.length > 50) completed += 1;

        return Math.round((completed / total) * 100);
      },
    }),
    {
      name: 'profile-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
