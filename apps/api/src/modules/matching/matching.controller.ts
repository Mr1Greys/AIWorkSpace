import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MatchingService } from './matching.service';

@ApiTags('matches')
@Controller('matches')
export class MatchingController {
  constructor(private matchingService: MatchingService) {}

  @Get('brief/:briefId')
  @ApiOperation({ summary: 'Find matching freelancers for a brief' })
  async findMatches(@Param('briefId') briefId: string, @Query('limit') limit?: number) {
    return this.matchingService.findMatches(briefId, limit ? Number(limit) : undefined);
  }
}
