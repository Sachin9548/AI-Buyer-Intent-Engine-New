import { Injectable, BadRequestException } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { GetCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import redis from '../../config/redis.config';
import { ToggleInterventionDto } from './dto/toggle-intervention.dto';

@Injectable()
export class InterventionsService {
  // 1. GET Interventions Status & Performance Metrics
  async getInterventions(storeId: string) {
    const targetStore = storeId || 'wa-automation';

    // A. Fetch current store config from DynamoDB
    const storeRes = await docClient.send(
      new GetCommand({
        TableName: 'BIME_Stores',
        Key: { store_id: targetStore },
      }),
    );

    const storeConfig = storeRes.Item?.config || {
      size_quiz_enabled: true,
      discount_enabled: true,
      discount_code: 'SAVED10',
      discount_pct: 10,
      trust_badges_enabled: true,
    };

    // B. Query Events for Impression / Click counts per intervention
    let events: any[] = [];
    try {
      const eventsRes = await docClient.send(
        new QueryCommand({
          TableName: 'BIME_Events',
          KeyConditionExpression: 'store_id = :storeId',
          ExpressionAttributeValues: { ':storeId': targetStore },
          Limit: 1000,
        }),
      );
      events = eventsRes.Items || [];
    } catch (e) {}

    // Calculate Stats
    const sizeShown = events.filter(
      (e) => e.event_type === 'hover_size_chart',
    ).length;
    const sizeClicked = events.filter(
      (e) => e.event_type === 'size_quiz_completed',
    ).length;

    const discountShown = events.filter(
      (e) => e.event_type === 'price_hover' || e.event_type === 'tab_hidden',
    ).length;
    const discountClicked = events.filter(
      (e) =>
        e.event_type === 'nudge_clicked' &&
        e.metadata?.action === 'show_discount',
    ).length;

    const trustShown = events.filter(
      (e) => e.event_type === 'slow_scroll',
    ).length;
    const trustClicked = events.filter(
      (e) =>
        e.event_type === 'nudge_clicked' && e.metadata?.action === 'show_trust',
    ).length;

    return [
      {
        id: 'show_size_quiz',
        name: 'Size & Fit Assistant',
        description:
          'Auto-triggers 10-second size quiz when visitor hesitates on sizing',
        active: Boolean(storeConfig.size_quiz_enabled ?? true),
        times_shown: sizeShown,
        conversions: sizeClicked,
        conversion_rate_pct:
          sizeShown > 0 ? Math.round((sizeClicked / sizeShown) * 100) : 0,
      },
      {
        id: 'show_discount',
        name: 'Exit-Intent 10% Discount Timer',
        description:
          'Shows 5-minute countdown discount when user is about to leave or compares prices',
        active: Boolean(storeConfig.discount_enabled ?? true),
        discount_code: storeConfig.discount_code || 'SAVED10',
        discount_pct: storeConfig.discount_pct || 10,
        times_shown: discountShown,
        conversions: discountClicked,
        conversion_rate_pct:
          discountShown > 0
            ? Math.round((discountClicked / discountShown) * 100)
            : 0,
      },
      {
        id: 'show_trust',
        name: 'Trust & Risk-Reversal Badges',
        description:
          'Displays 7-day returns, authenticity, and COD assurances on long reading pauses',
        active: Boolean(storeConfig.trust_badges_enabled ?? true),
        times_shown: trustShown,
        conversions: trustClicked,
        conversion_rate_pct:
          trustShown > 0 ? Math.round((trustClicked / trustShown) * 100) : 0,
      },
    ];
  }

  // 2. TOGGLE / UPDATE Intervention
  async toggleIntervention(
    storeId: string,
    type: string,
    dto: ToggleInterventionDto,
  ) {
    const targetStore = storeId || 'wa-automation';

    const validTypes = ['show_size_quiz', 'show_discount', 'show_trust'];
    if (!validTypes.includes(type)) {
      throw new BadRequestException(`Invalid intervention type: ${type}`);
    }

    // Map URL param type to store config key
    const fieldMapping: Record<string, string> = {
      show_size_quiz: 'size_quiz_enabled',
      show_discount: 'discount_enabled',
      show_trust: 'trust_badges_enabled',
    };

    const targetField = fieldMapping[type];

    // A. Update DynamoDB BIME_Stores table
    let updateExpr = `SET config.#field = :val`;
    const exprNames: Record<string, string> = { '#field': targetField };
    const exprVals: Record<string, any> = { ':val': dto.active };

    if (type === 'show_discount') {
      if (dto.discount_code) {
        updateExpr += `, config.discount_code = :code`;
        exprVals[':code'] = dto.discount_code.trim().toUpperCase();
      }
      if (dto.discount_pct) {
        updateExpr += `, config.discount_pct = :pct`;
        exprVals[':pct'] = dto.discount_pct;
      }
    }

    try {
      await docClient.send(
        new UpdateCommand({
          TableName: 'BIME_Stores',
          Key: { store_id: targetStore },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: exprNames,
          ExpressionAttributeValues: exprVals,
        }),
      );
    } catch (err) {
      console.warn(
        `Store record not found in DynamoDB for ${targetStore}, updating cache only.`,
      );
    }

    // B. Update Upstash Redis Cache IMMEDIATELY for the Rule Engine
    const redisConfigKey = `store:${targetStore}:config`;
    try {
      const cached = await redis.get(redisConfigKey);
      const currentConfig = cached ? JSON.parse(cached) : {};
      currentConfig[targetField] = dto.active;
      if (dto.discount_code)
        currentConfig.discount_code = dto.discount_code.trim().toUpperCase();
      if (dto.discount_pct) currentConfig.discount_pct = dto.discount_pct;

      await redis.set(
        redisConfigKey,
        JSON.stringify(currentConfig),
        'EX',
        86400,
      ); // 24h
    } catch (e) {}

    console.log(
      `⚙️ Intervention Updated [${targetStore}]: ${type} -> Active: ${dto.active}`,
    );

    return {
      success: true,
      store_id: targetStore,
      intervention: type,
      active: dto.active,
      discount_code: dto.discount_code,
    };
  }
}
