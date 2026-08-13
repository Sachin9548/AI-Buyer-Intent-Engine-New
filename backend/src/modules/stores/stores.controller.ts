import { Controller, Post, Get, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerStore(@Body() dto: CreateStoreDto) {
    return await this.storesService.registerStore(dto);
  }

  @Get(':storeId')
  async getStoreConfig(@Param('storeId') storeId: string) {
    const store = await this.storesService.getStoreById(storeId);
    if (!store) return { error: 'Store not found' };
    return { store_id: store.store_id, config: store.config, status: store.status };
  }
}