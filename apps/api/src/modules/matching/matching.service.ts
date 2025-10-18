import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  async findMatches(briefId: string, limit = 10) {
    // TODO: Implement AI matching algorithm with embeddings
    // For now, return basic matching based on tags
    const brief = await this.prisma.brief.findUnique({
      where: { id: briefId },
    });

    if (!brief) {
      return [];
    }

    const freelancers = await this.prisma.user.findMany({
      where: {
        role: 'FREELANCER',
        status: 'ACTIVE',
        tags: {
          hasSome: brief.tags,
        },
        rateHour: {
          lte: brief.budgetMax / 40, // Rough estimate
        },
      },
      take: limit,
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
        availability: true,
      },
    });

    // Calculate match scores
    return freelancers.map((freelancer) => {
      const matchingTags = freelancer.tags.filter((tag) => brief.tags.includes(tag));
      const score = matchingTags.length / brief.tags.length;

      return {
        freelancer,
        score: Math.min(score + (freelancer.rating / 5) * 0.3, 1),
        matchingTags,
      };
    });
  }
}
