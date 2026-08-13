import { Injectable } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  FeatureEngineeringService,
  SessionFeatures,
} from './feature-engineering.service';
import { RuleEngineService, RuleDecision } from './rule-engine.service';

@Injectable()
export class IngestionService {
  constructor(
    private readonly featureEngineeringService: FeatureEngineeringService,
    private readonly ruleEngineService: RuleEngineService,
  ) {}

  async handleIncomingEvents(events: any[]) {
    // 1. Save Raw Events asynchronously to DynamoDB (Parallel Batch Save)
    this.saveToDynamoBatch(events);

    // 2. Compute Real-Time Feature Vector in Redis
    const features: SessionFeatures =
      await this.featureEngineeringService.processEventsAndComputeFeatures(
        events,
      );

    // 3. Evaluate Rule Engine against Computed Features
    const decision: RuleDecision =
      this.ruleEngineService.evaluateFeatures(features);

    if (decision && decision.action !== 'none') {
      console.log(`🎯 Rule Engine Decision [${features.session_id}]:`, {
        action: decision.action,
        reason: decision.reason,
        confidence: decision.confidence,
        device: features.device_type,
      });
    }

    // 4. Return Action Decision to SDK
    return {
      action: decision.action,
      message: decision.message,
      confidence: decision.confidence,
      reason: decision.reason,
    };
  }

  private async saveToDynamoBatch(events: any[]) {
    try {
      // Parallel execution via Promise.all (Super Fast)
      const promises = events.map((event) => {
        const params = {
          TableName: 'BIME_Events',
          Item: {
            store_id: event.store_id || 'default_store',
            event_id: uuidv4(),
            ...event,
          },
        };
        return docClient.send(new PutCommand(params));
      });
      await Promise.all(promises);
    } catch (err) {
      console.error('DynamoDB Batch Save Error:', err);
    }
  }
}
