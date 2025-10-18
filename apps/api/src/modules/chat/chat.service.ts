import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: {
    projectId: string;
    senderId: string;
    recipientId: string;
    text: string;
  }) {
    return this.prisma.message.create({
      data,
      include: {
        sender: {
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

  async getMessages(projectId: string, limit = 50) {
    return this.prisma.message.findMany({
      where: { projectId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
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

  async markAsRead(messageIds: string[]) {
    return this.prisma.message.updateMany({
      where: {
        id: {
          in: messageIds,
        },
      },
      data: {
        read: true,
      },
    });
  }
}
