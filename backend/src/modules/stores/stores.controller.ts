import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

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

  // 1. GET Current Merchant Store Profile, API Key & Script Snippet (Protected)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyStore(
    @Request() req: any,
    @Query('store_id') queryStoreId?: string,
  ) {
    const targetStoreId = this.resolveStoreId(req, queryStoreId);
    return await this.storesService.getMyStoreDetails(targetStoreId);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerStore(@Body() dto: CreateStoreDto) {
    return await this.storesService.registerStore(dto);
  }

  @Get(':storeId')
  async getStoreConfig(@Param('storeId') storeId: string) {
    const store = await this.storesService.getStoreById(storeId);
    if (!store) return { error: 'Store not found' };
    return {
      store_id: store.store_id,
      config: store.config,
      status: store.status,
    };
  }
}
