import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cases')
@Controller('cases')
export class CasesController {
  constructor(private casesService: CasesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create portfolio case' })
  async create(@Req() req: any, @Body() data: any) {
    return this.casesService.create(req.user.id, data);
  }

  @Get('freelancer/:freelancerId')
  @ApiOperation({ summary: 'Get cases by freelancer' })
  async findByFreelancerId(@Param('freelancerId') freelancerId: string) {
    return this.casesService.findByFreelancerId(freelancerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get case by ID' })
  async findById(@Param('id') id: string) {
    return this.casesService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update case' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.casesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete case' })
  async delete(@Param('id') id: string) {
    return this.casesService.delete(id);
  }
}
