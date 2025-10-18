export enum UserRole {
  FREELANCER = 'FREELANCER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum BriefStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum ProjectStatus {
  OPEN = 'OPEN',
  MATCHED = 'MATCHED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_ESCROW = 'IN_ESCROW',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  DISPUTED = 'DISPUTED',
  CANCELLED = 'CANCELLED',
}

export enum EscrowStatus {
  FUNDED = 'FUNDED',
  SUBMITTED = 'SUBMITTED',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED',
  RESOLVED = 'RESOLVED',
}

export enum CaseVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  NDA = 'NDA',
}

export enum CaseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  MODERATION = 'MODERATION',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  timezone?: string;
  tags: string[];
  rateHour?: number;
  availability?: number;
  rating: number;
  totalEarned: number;
  projectsCount: number;
  isPro: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brief {
  id: string;
  clientId: string;
  title: string;
  goal?: string;
  description: string;
  tags: string[];
  budgetMin: number;
  budgetMax: number;
  deadlineDays: number;
  status: BriefStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  briefId: string;
  freelancerId?: string;
  clientId: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  freelancerId: string;
  projectId?: string;
  title: string;
  description: string;
  tags: string[];
  budget?: number;
  durationDays?: number;
  linksJson?: any;
  mediaJson?: any;
  visibility: CaseVisibility;
  status: CaseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  text: string;
  read: boolean;
  createdAt: Date;
}

export interface Escrow {
  id: string;
  chainId: number;
  dealId: string;
  txHash: string;
  token: string;
  amount: bigint;
  clientId: string;
  freelancerId: string;
  projectId: string;
  status: EscrowStatus;
  submittedAt?: Date;
  releasedAt?: Date;
  disputeReason?: string;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}
