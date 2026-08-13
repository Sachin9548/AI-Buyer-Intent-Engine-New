import { Injectable } from '@nestjs/common';
import redis from '../../config/redis.config';

export interface SessionFeatures {
  store_id: string;
  session_id: string;
  device_type: 'mobile' | 'desktop';
  page_type: 'product' | 'cart' | 'checkout' | 'other';
  time_on_page: number;
  scroll_depth: number;
  scroll_backward_count: number;
  scroll_pause_count: number;
  slow_scroll_count: number;
  tab_hidden_count: number;
  back_button_count: number;
  price_hover_count: number;
  size_hover_count: number;
  exit_intent_count: number;
  keyboard_open: boolean;
  confusion_score: number;
  price_anxiety: number;
  hesitation_score: number;
  already_triggered: boolean;
  last_updated: number;
}

@Injectable()
export class FeatureEngineeringService {

  async processEventsAndComputeFeatures(events: any[]): Promise<SessionFeatures> {
    if (!events || events.length === 0) {
        throw new Error('No events provided for feature engineering.');
    }
    const firstEvent = events[0];
    const storeId = firstEvent.store_id || 'default_store';
    
    // FIX: Unique Session ID fallback (Prevents User Collision)
    const sessionId = 
      firstEvent.session_id || 
      firstEvent.metadata?.session_id || 
      `sess_${storeId}_${firstEvent.timestamp ? new Date(firstEvent.timestamp).getTime() : Date.now()}`;

    const redisKey = `features:${storeId}:${sessionId}`;

    // 1. Fetch existing session features from Redis or initialize default
    let features: SessionFeatures = await this.getExistingFeatures(redisKey, storeId, sessionId);

    // 2. Process incoming batch of raw events & update counters
    for (const event of events) {
      const { event_type, metadata } = event;

      if (metadata?.is_mobile !== undefined) {
        features.device_type = metadata.is_mobile ? 'mobile' : 'desktop';
      }
      if (metadata?.path || metadata?.url) {
        features.page_type = this.detectPageType(metadata.path || metadata.url);
      }

      if (metadata?.time_on_page && metadata.time_on_page > features.time_on_page) {
        features.time_on_page = metadata.time_on_page;
      }

      if (metadata?.depth && metadata.depth > features.scroll_depth) {
        features.scroll_depth = metadata.depth;
      }
      if (metadata?.position_pct && metadata.position_pct > features.scroll_depth) {
        features.scroll_depth = metadata.position_pct;
      }

      switch (event_type) {
        case 'hover_size_chart':
          features.size_hover_count += 1;
          break;
        case 'price_hover':
          features.price_hover_count += 1;
          break;
        case 'scroll_backward':
          features.scroll_backward_count += 1;
          break;
        case 'scroll_pause':
          features.scroll_pause_count += 1;
          break;
        case 'slow_scroll':
          features.slow_scroll_count += 1;
          break;
        case 'tab_hidden':
          features.tab_hidden_count += 1;
          break;
        case 'back_button_click':
          features.back_button_count += 1;
          break;
        case 'exit_intent':
          features.exit_intent_count += 1;
          break;
        case 'keyboard_open':
          features.keyboard_open = true;
          break;
        case 'nudge_clicked':
        case 'nudge_closed':
          features.already_triggered = true;
          break;
      }
    }

    // 3. Compute Calculated Feature Scores (0.00 to 1.00)
    features.confusion_score = Number(
      Math.min(
        1.0,
        features.size_hover_count * 0.35 +
        features.scroll_backward_count * 0.25 +
        features.slow_scroll_count * 0.20
      ).toFixed(2)
    );

    features.price_anxiety = Number(
      Math.min(
        1.0,
        features.price_hover_count * 0.35 +
        features.tab_hidden_count * 0.40 +
        features.exit_intent_count * 0.25
      ).toFixed(2)
    );

    features.hesitation_score = Number(
      Math.min(
        1.0,
        features.confusion_score * 0.4 +
        features.price_anxiety * 0.4 +
        (features.scroll_pause_count >= 2 ? 0.20 : 0)
      ).toFixed(2)
    );

    features.last_updated = Date.now();

    // 4. Save updated feature vector in Redis (30 mins TTL)
    await redis.set(redisKey, JSON.stringify(features), 'EX', 1800);

    return features;
  }

  private async getExistingFeatures(key: string, storeId: string, sessionId: string): Promise<SessionFeatures> {
    try {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {}

    return {
      store_id: storeId,
      session_id: sessionId,
      device_type: 'desktop',
      page_type: 'product',
      time_on_page: 0,
      scroll_depth: 0,
      scroll_backward_count: 0,
      scroll_pause_count: 0,
      slow_scroll_count: 0,
      tab_hidden_count: 0,
      back_button_count: 0,
      price_hover_count: 0,
      size_hover_count: 0,
      exit_intent_count: 0,
      keyboard_open: false,
      confusion_score: 0.0,
      price_anxiety: 0.0,
      hesitation_score: 0.0,
      already_triggered: false,
      last_updated: Date.now(),
    };
  }

  private detectPageType(path: string): 'product' | 'cart' | 'checkout' | 'other' {
    if (!path) return 'other';
    const lower = path.toLowerCase();
    if (lower.includes('checkout')) return 'checkout';
    if (lower.includes('cart')) return 'cart';
    if (lower.includes('/products/') || lower.includes('/item/')) return 'product';
    return 'other';
  }
}