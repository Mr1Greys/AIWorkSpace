'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Project } from '@/types/project';

export interface PendingProject extends Project {
  submittedAt: string;
  clientEmail?: string;
  notes?: string;
}

interface AdminModerationStore {
  pendingProjects: PendingProject[];
  moderationLog: { id: string; action: 'approved' | 'rejected'; comment?: string; actedAt: string }[];
  addPendingProject: (project: Project, payload?: Partial<PendingProject>) => void;
  approveProject: (id: string) => void;
  rejectProject: (id: string, reason: string) => void;
}

export const useAdminModerationStore = create<AdminModerationStore>()(
  persist(
    (set) => ({
      pendingProjects: [],
      moderationLog: [],
      addPendingProject: (project, payload) =>
        set((state) => ({
          pendingProjects: [
            {
              ...project,
              submittedAt: new Date().toISOString(),
              ...payload,
            },
            ...state.pendingProjects,
          ],
        })),
      approveProject: (id) =>
        set((state) => ({
          pendingProjects: state.pendingProjects.filter((p) => p.id !== id),
          moderationLog: [
            { id, action: 'approved', actedAt: new Date().toISOString() },
            ...state.moderationLog,
          ],
        })),
      rejectProject: (id, reason) =>
        set((state) => ({
          pendingProjects: state.pendingProjects.filter((p) => p.id !== id),
          moderationLog: [
            { id, action: 'rejected', comment: reason, actedAt: new Date().toISOString() },
            ...state.moderationLog,
          ],
        })),
    }),
    {
      name: 'admin-moderation-storage',
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
    }
  )
);
