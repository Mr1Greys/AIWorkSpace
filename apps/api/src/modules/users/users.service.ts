import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        status: true,
        bio: true,
        avatarUrl: true,
        location: true,
        timezone: true,
        tags: true,
        rateHour: true,
        availability: true,
        rating: true,
        totalEarned: true,
        projectsCount: true,
        isPro: true,
        createdAt: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        bio: true,
        avatarUrl: true,
        location: true,
        tags: true,
        rateHour: true,
        rating: true,
        projectsCount: true,
        isPro: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async searchFreelancers(query: {
    tags?: string[];
    minRate?: number;
    maxRate?: number;
    minRating?: number;
    limit?: number;
  }) {
    const where: any = {
      role: 'FREELANCER',
      status: 'ACTIVE',
    };

    if (query.tags && query.tags.length > 0) {
      where.tags = {
        hasSome: query.tags,
      };
    }

    if (query.minRate !== undefined) {
      where.rateHour = { gte: query.minRate };
    }

    if (query.maxRate !== undefined) {
      where.rateHour = { ...where.rateHour, lte: query.maxRate };
    }

    if (query.minRating !== undefined) {
      where.rating = { gte: query.minRating };
    }

    return this.prisma.user.findMany({
      where,
      take: query.limit || 20,
      orderBy: [{ rating: 'desc' }, { projectsCount: 'desc' }],
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        avatarUrl: true,
        tags: true,
        rateHour: true,
        rating: true,
        projectsCount: true,
        isPro: true,
      },
    });
  }
}
