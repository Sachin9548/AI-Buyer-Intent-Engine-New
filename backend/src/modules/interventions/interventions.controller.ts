import { Controller, Get, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ToggleInterventionDto } from './dto/toggle-intervention.dto';

@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  private resolveStoreId(req: any, queryStoreId?: string): string {
    if (queryStoreId && queryStoreId.trim()) return queryStoreId.trim();
    const rawUrl = req.user?.store_url || '';
    const cleanStoreId = rawUrl
      .replace(/https?:\/\//, '')
      .replace(/\.myshopify\.com.*$/, '')
      .replace(/\/.*$/, '')
      .trim();
    return cleanStoreId || 'wa-automation';
  }

  // 1. GET All Interventions & Stats
  @UseGuards(JwtAuthGuard)
  @Get()
  async getInterventions(@Request() req: any, @Query('store_id') queryStoreId?: string) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    return await this.interventionsService.getInterventions(targetStoreId);
  }

  // 2. PATCH Toggle ON / OFF or Update Code
  @UseGuards(JwtAuthGuard)
  @Patch(':type/toggle')
  async toggleIntervention(
    @Request() req: any,
    @Param('type') type: string,
    @Body() dto: ToggleInterventionDto,
    @Query('store_id') queryStoreId?: string,
  ) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    return await this.interventionsService.toggleIntervention(targetStoreId, type, dto);
  }
}