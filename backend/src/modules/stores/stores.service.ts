import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import redis from '../../config/redis.config';
import { CreateStoreDto } from './dto/create-store.dto';

export interface StoreItem {
  store_id: string;
  api_key: string;
  store_name: string;
  store_url: string;
  owner_email: string;
  status: 'active' | 'disabled';
  config: {
    size_quiz_enabled: boolean;
    discount_enabled: boolean;
    discount_code: string;
    discount_pct: number;
    trust_badges_enabled: boolean;
  };
  created_at: string;
}

@Injectable()
export class StoresService {

  async registerStore(dto: CreateStoreDto) {
    const existing = await this.getStoreById(dto.store_id);
    if (existing) {
      throw new ConflictException(`Store with ID '${dto.store_id}' is already registered.`);
    }

    const apiKey = `bime_live_${uuidv4().replace(/-/g, '')}`;
    const defaultConfig = {
      size_quiz_enabled: true,
      discount_enabled: true,
      discount_code: 'SAVED10',
      discount_pct: 10,
      trust_badges_enabled: true,
      ...dto.config,
    };

    const storeItem: StoreItem = {
      store_id: dto.store_id,
      api_key: apiKey,
      store_name: dto.store_name,
      store_url: dto.store_url,
      owner_email: dto.owner_email,
      status: 'active',
      config: defaultConfig,
      created_at: new Date().toISOString(),
    };

    // 1. Save in DynamoDB (Permanent Persistence)
    await docClient.send(
      new PutCommand({
        TableName: 'BIME_Stores',
        Item: storeItem,
      }),
    );

    // 2. FIX: Permanent API key lookup in Redis (NO 'EX' EXPIRATION!)
    await redis.set(`apikey:${apiKey}`, JSON.stringify(storeItem));
    
    // Cache Store Config with 24 Hours TTL (Can be refreshed)
    await redis.set(`store:${dto.store_id}:config`, JSON.stringify(defaultConfig), 'EX', 86400);

    console.log(`🏪 Store Onboarded [${dto.store_id}]: API Key Generated = ${apiKey}`);

    return {
      success: true,
      store_id: dto.store_id,
      api_key: apiKey,
      config: defaultConfig,
    };
  }

  async getStoreById(storeId: string): Promise<StoreItem | null> {
    try {
      const result = await docClient.send(
        new GetCommand({
          TableName: 'BIME_Stores',
          Key: { store_id: storeId },
        }),
      );
      return (result.Item as StoreItem) || null;
    } catch (err) {
      return null;
    }
  }

  async validateApiKey(apiKey: string): Promise<StoreItem | null> {
    if (!apiKey) return null;

    // 1. Sub-millisecond Redis Cache Lookup
    try {
      const cached = await redis.get(`apikey:${apiKey}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {}

    return null;
  }
}