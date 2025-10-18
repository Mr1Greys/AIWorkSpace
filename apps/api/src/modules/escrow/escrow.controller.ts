import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EscrowService } from './escrow.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('escrow')
@Controller('escrow')
export class EscrowController {
  constructor(private escrowService: EscrowService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create escrow' })
  async create(@Body() data: any) {
    return this.escrowService.createEscrow(data);
  }

  @Get('project/:projectId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get escrow by project' })
  async getByProject(@Param('projectId') projectId: string) {
    return this.escrowService.getEscrowByProject(projectId);
  }

  @Put(':id/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit work' })
  async submitWork(@Param('id') id: string) {
    return this.escrowService.submitWork(id);
  }

  @Put(':id/release')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Release payment' })
  async releasePayment(@Param('id') id: string) {
    return this.escrowService.releasePayment(id);
  }

  @Put(':id/dispute')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dispute escrow' })
  async dispute(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.escrowService.disputeEscrow(id, body.reason);
  }
}
