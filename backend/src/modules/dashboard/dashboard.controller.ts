import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Helper to safely extract store_id without breaking Shopify domains
  private resolveStoreId(req: any, queryStoreId?: string): string {
    if (queryStoreId && queryStoreId.trim()) {
      return queryStoreId.trim();
    }

    const rawUrl = req.user?.store_url || '';
    const cleanStoreId = rawUrl
      .replace(/https?:\/\//, '')
      .replace(/\.myshopify\.com.*$/, '') // Cleanly strips .myshopify.com
      .replace(/\/.*$/, '')
      .trim();

    return cleanStoreId || 'wa-automation';
  }

  // 1. Overview KPIs & Charts (Secured)
  @UseGuards(JwtAuthGuard)
  @Get('overview')
  async getOverview(
    @Request() req: any,
    @Query('store_id') queryStoreId?: string,
  ) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    return await this.dashboardService.getOverview(targetStoreId);
  }

  // 2. Live Activity Pulse Feed (Secured)
  @UseGuards(JwtAuthGuard)
  @Get('live-activity')
  async getLiveActivity(
    @Request() req: any,
    @Query('store_id') queryStoreId?: string,
  ) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    return await this.dashboardService.getLiveActivity(targetStoreId);
  }

  // 3. Sessions List Table (Secured with JWT)
  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getSessions(
    @Request() req: any,
    @Query('store_id') queryStoreId?: string,
    @Query('limit') limit?: string,
  ) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    const limitCount = limit ? parseInt(limit, 10) : 50;
    return await this.dashboardService.getRecentSessions(
      targetStoreId,
      limitCount,
    );
  }
}
