import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateOutcomeDto } from './dto/create-outcome.dto';
import redis from '../../config/redis.config';

@Injectable()
export class OutcomesService {

  async recordOutcome(dto: CreateOutcomeDto) {
    const outcomeId = uuidv4();
    const timestamp = new Date().toISOString();

    const params = {
      TableName: 'BIME_Outcomes',
      Item: {
        store_id: dto.store_id,
        outcome_id: outcomeId,
        session_id: dto.session_id,
        outcome: dto.outcome,
        action_shown: dto.action_shown || 'none',
        revenue: dto.revenue || 0,
        order_id: dto.order_id || 'N/A',
        timestamp: timestamp,
      },
    };

    try {
      // 1. Save Outcome Record in DynamoDB
      await docClient.send(new PutCommand(params));

      // 2. Update Session Feature Vector in Redis with final outcome label
      const redisKey = `features:${dto.store_id}:${dto.session_id}`;
      const cached = await redis.get(redisKey);
      if (cached) {
        const features = JSON.parse(cached);
        features.final_outcome = dto.outcome;
        features.revenue = dto.revenue || 0;
        await redis.set(redisKey, JSON.stringify(features), 'EX', 1800);
      }

      console.log(`💰 Outcome Recorded [${dto.store_id}]:`, {
        session: dto.session_id,
        outcome: dto.outcome,
        revenue: dto.revenue,
      });

      return { success: true, outcome_id: outcomeId };
    } catch (err) {
      console.error('Error recording outcome:', err);
      throw new InternalServerErrorException('Could not record outcome');
    }
  }
}