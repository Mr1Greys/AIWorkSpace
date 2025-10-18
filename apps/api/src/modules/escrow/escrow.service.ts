import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EscrowService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async createEscrow(data: {
    projectId: string;
    clientId: string;
    freelancerId: string;
    amount: bigint;
    chainId: number;
    dealId: string;
    txHash: string;
  }) {
    return this.prisma.escrow.create({
      data: {
        ...data,
        token: 'USDC',
        status: 'FUNDED',
      },
    });
  }

  async getEscrowByProject(projectId: string) {
    return this.prisma.escrow.findUnique({
      where: { projectId },
    });
  }

  async submitWork(escrowId: string) {
    return this.prisma.escrow.update({
      where: { id: escrowId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });
  }

  async releasePayment(escrowId: string) {
    return this.prisma.escrow.update({
      where: { id: escrowId },
      data: {
        status: 'RELEASED',
        releasedAt: new Date(),
      },
    });
  }

  async disputeEscrow(escrowId: string, reason: string) {
    return this.prisma.escrow.update({
      where: { id: escrowId },
      data: {
        status: 'DISPUTED',
        disputeReason: reason,
      },
    });
  }
}
