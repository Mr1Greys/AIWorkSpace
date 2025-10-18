import { ProjectStatus as ApiProjectStatus } from '@aiworkspace/shared';

export type ProjectStatus = 'active' | 'pending' | 'in_review' | 'completed' | 'cancelled' | 'draft' | 'disputed';

export const apiProjectStatusMap: Record<ProjectStatus, ApiProjectStatus> = {
  active: ApiProjectStatus.IN_PROGRESS,
  pending: ApiProjectStatus.OPEN,
  in_review: ApiProjectStatus.OPEN,
  completed: ApiProjectStatus.COMPLETED,
  cancelled: ApiProjectStatus.CANCELLED,
  draft: ApiProjectStatus.OPEN,
  disputed: ApiProjectStatus.DISPUTED,
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
