import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

  async create(freelancerId: string, data: any) {
    return this.prisma.case.create({
      data: {
        ...data,
        freelancerId,
      },
    });
  }

  async findByFreelancerId(freelancerId: string) {
    return this.prisma.case.findMany({
      where: {
        freelancerId,
        status: 'PUBLISHED',
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.case.findUnique({
      where: { id },
      include: {
        freelancer: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            rating: true,
          },
        },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.case.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.case.delete({
      where: { id },
    });
  }
}
