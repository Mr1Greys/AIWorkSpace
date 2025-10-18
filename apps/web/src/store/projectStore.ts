import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockProjects } from '@/mocks/projects';
import { Project, ProjectStatus } from '@/types/project';
import { useAdminModerationStore } from './adminModerationStore';

interface ProjectStore {
  projects: Project[];
  hydrated: boolean;
  addProject: (project: Omit<Project, 'id' | 'status' | 'applicants' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectsByClient: (clientId: string) => Project[];
  applyToProject: (id: string) => void;
  setHydrated: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      hydrated: false,
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: Date.now().toString(),
          status: 'in_review' as ProjectStatus,
          applicants: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          projects: [newProject, ...state.projects],
        }));
        // Добавляем проект в очередь модерации администратора
        if (typeof window !== 'undefined') {
          // избегаем обращения к store на сервере
          useAdminModerationStore
            .getState()
            .addPendingProject(newProject, { clientEmail: `${projectData.clientId || 'client'}@example.com` });
        }
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },
      applyToProject: (id) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  applicants: project.applicants + 1,
                }
              : project
          ),
        }));
      },
      getProjectsByClient: (clientId) => {
        return get().projects.filter((p) => p.clientId === clientId);
      },
      setHydrated: () => {
        set({ hydrated: true });
      },
    }),
    {
      name: 'project-storage-v2',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export type { ProjectStatus, Project };
