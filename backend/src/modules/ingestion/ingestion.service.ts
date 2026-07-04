import { Injectable } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import redis from '../../config/redis.config'; // tumhari config file

@Injectable()
export class IngestionService {
  async handleIncomingEvents(events: any[]) {
    let finalDecision = { action: 'none', message: '' };

    for (const event of events) {
      // 1. Save to DynamoDB
      await this.saveToDynamo(event);

      // 2. Decision Logic
      const { store_id, event_type, metadata } = event;
      const sessionKey = `intent:${store_id}:${metadata?.id || 'general'}`;

      if (event_type === 'hover_size_chart') {
        const hoverCount = await redis.incr(`${sessionKey}:size_hover`);
        if (hoverCount >= 2) {
          finalDecision = {
            action: 'show_size_quiz',
            message: 'Not sure about size?',
          };
        }
      }

      if (event_type === 'price_hover') {
        finalDecision = {
          action: 'show_discount',
          message: 'Get 10% OFF today!',
        };
      }
    }
    return finalDecision; 
  }

  private async saveToDynamo(event: any) {
    const params = {
      TableName: 'BIME_Events',
      Item: {
        store_id: event.store_id,
        event_id: uuidv4(),
        ...event,
      },
    };
    await docClient.send(new PutCommand(params));
  }
}
