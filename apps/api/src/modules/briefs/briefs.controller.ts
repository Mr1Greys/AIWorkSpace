import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BriefsService } from './briefs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('briefs')
@Controller('briefs')
export class BriefsController {
  constructor(private briefsService: BriefsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new brief' })
  async create(@Req() req: any, @Body() data: any) {
    return this.briefsService.create(req.user.id, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all briefs' })
  async findAll(
    @Query('status') status?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit?: number
  ) {
    return this.briefsService.findAll({
      status,
      tags: tags ? tags.split(',') : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brief by ID' })
  async findById(@Param('id') id: string) {
    return this.briefsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update brief' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.briefsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete brief' })
  async delete(@Param('id') id: string) {
    return this.briefsService.delete(id);
  }
}
