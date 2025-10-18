import { ProjectStatus as ApiProjectStatus } from '@aiworkspace/shared';

export type ProjectStatus = 'active' | 'pending' | 'completed' | 'cancelled';

export const apiProjectStatusMap: Record<ProjectStatus, ApiProjectStatus> = {
  active: ApiProjectStatus.IN_PROGRESS,
  pending: ApiProjectStatus.OPEN,
  completed: ApiProjectStatus.COMPLETED,
  cancelled: ApiProjectStatus.CANCELLED,
};

export interface Project {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  tags: string[];
  requirements: string[];
  status: ProjectStatus;
  applicants: number;
  createdAt: string;
  clientId: string;
  clientName: string;
}
