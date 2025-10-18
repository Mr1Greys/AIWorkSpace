import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class BriefsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, data: any) {
    return this.prisma.brief.create({
      data: {
        ...data,
        clientId,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findAll(filters?: { status?: string; tags?: string[]; limit?: number }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags,
      };
    }

    return this.prisma.brief.findMany({
      where,
      take: filters?.limit || 50,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.brief.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            rating: true,
          },
        },
        projects: {
          include: {
            freelancer: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.brief.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.brief.delete({
      where: { id },
    });
  }
}
