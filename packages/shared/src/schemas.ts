import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['FREELANCER', 'CLIENT']),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const CreateBriefSchema = z.object({
  title: z.string().min(10).max(200),
  goal: z.string().optional(),
  description: z.string().min(50).max(5000),
  tags: z.array(z.string()).min(1).max(10),
  budgetMin: z.number().positive(),
  budgetMax: z.number().positive(),
  deadlineDays: z.number().positive().max(365),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  timezone: z.string().optional(),
  tags: z.array(z.string()).max(20).optional(),
  rateHour: z.number().positive().optional(),
  availability: z.number().min(0).max(168).optional(),
});

export const CreateCaseSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50).max(2000),
  tags: z.array(z.string()).min(1).max(10),
  budget: z.number().positive().optional(),
  durationDays: z.number().positive().optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'NDA']),
  linksJson: z.any().optional(),
  mediaJson: z.any().optional(),
});

export const SendMessageSchema = z.object({
  projectId: z.string().uuid(),
  recipientId: z.string().uuid(),
  text: z.string().min(1).max(5000),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateBriefInput = z.infer<typeof CreateBriefSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type CreateCaseInput = z.infer<typeof CreateCaseSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
