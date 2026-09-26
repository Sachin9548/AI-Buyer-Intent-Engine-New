import { Injectable } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { QueryCommand } from '@aws-sdk/lib-dynamodb'; // ✅ Fast & Cheap Query
import redis from '../../config/redis.config';

export interface FormattedSession {
  session_id: string;
  device: 'mobile' | 'desktop';
  intent: string;
  action_shown: string;
  outcome: string;
  revenue: number;
  events_count: number;
  entry_url: string;
  timestamp: string;
}

@Injectable()
export class DashboardService {
  // 1. OVERVIEW: KPIs + Intent Breakdown + Revenue
  async getOverview(storeId: string) {
    const targetStore = storeId || 'wa-automation';

    // A. Query Events using Partition Key (Direct Partition Hit)
    const eventsCommand = new QueryCommand({
      TableName: 'BIME_Events',
      KeyConditionExpression: 'store_id = :storeId',
      ExpressionAttributeValues: { ':storeId': targetStore },
      Limit: 1000, // Safe batch limit
    });

    // B. Query Outcomes using Partition Key
    const outcomesCommand = new QueryCommand({
      TableName: 'BIME_Outcomes',
      KeyConditionExpression: 'store_id = :storeId',
      ExpressionAttributeValues: { ':storeId': targetStore },
    });

    try {
      const [eventsRes, outcomesRes] = await Promise.all([
        docClient.send(eventsCommand),
        docClient.send(outcomesCommand),
      ]);

      const events = eventsRes.Items || [];
      const outcomes = outcomesRes.Items || [];

      // Calculate Unique Sessions
      const uniqueSessions = new Set(
        events.map((e) => e.metadata?.session_id || e.session_id || e.event_id),
      );
      const totalSessions = uniqueSessions.size || events.length;

      // Calculate Interventions Triggered
      const interventions = events.filter(
        (e) =>
          e.event_type === 'nudge_clicked' ||
          e.event_type === 'nudge_closed' ||
          e.event_type === 'hover_size_chart',
      ).length;

      // Calculate Revenue & Conversions
      const purchases = outcomes.filter((o) => o.outcome === 'purchase');
      const recoveredRevenue = purchases.reduce(
        (acc, curr) => acc + (Number(curr.revenue) || 0),
        0,
      );
      const assistedConversions = purchases.length;

      const recoveryRatePct =
        totalSessions > 0
          ? parseFloat(((assistedConversions / totalSessions) * 100).toFixed(1))
          : 0;

      // Calculate Intent Distribution Counts
      const sizeConfusion = events.filter(
        (e) =>
          e.event_type === 'hover_size_chart' ||
          e.event_type === 'scroll_backward',
      ).length;

      const priceSensitivity = events.filter(
        (e) =>
          e.event_type === 'price_hover' ||
          e.event_type === 'tab_hidden' ||
          e.event_type === 'exit_intent',
      ).length;

      const trustHesitation = events.filter(
        (e) =>
          e.event_type === 'slow_scroll' || e.event_type === 'scroll_pause',
      ).length;

      const hotBuyer = events.filter(
        (e) => e.event_type === 'add_to_cart_click',
      ).length;

      const totalIntentEvents =
        sizeConfusion + priceSensitivity + trustHesitation + hotBuyer || 1;

      // Active Sessions Now from Redis
      let activeSessionsNow = 1;
      try {
        const keys = await redis.keys(`features:${targetStore}:*`);
        activeSessionsNow = Math.max(keys.length, 1);
      } catch (e) {}

      return {
        store_id: targetStore,
        total_sessions: totalSessions,
        active_sessions_now: activeSessionsNow,
        interventions_triggered: interventions,
        assisted_conversions: assistedConversions,
        recovered_revenue: Number(recoveredRevenue.toFixed(2)),
        recovery_rate_pct: recoveryRatePct,
        intent_distribution: {
          confused: Math.round((sizeConfusion / totalIntentEvents) * 100),
          price_sensitive: Math.round(
            (priceSensitivity / totalIntentEvents) * 100,
          ),
          trust_hesitation: Math.round(
            (trustHesitation / totalIntentEvents) * 100,
          ),
          hot_buyer: Math.round((hotBuyer / totalIntentEvents) * 100),
        },
      };
    } catch (err) {
      console.error('Error computing dashboard overview:', err);
      return {
        store_id: targetStore,
        total_sessions: 0,
        active_sessions_now: 0,
        interventions_triggered: 0,
        assisted_conversions: 0,
        recovered_revenue: 0,
        recovery_rate_pct: 0,
        intent_distribution: {
          confused: 25,
          price_sensitive: 25,
          trust_hesitation: 25,
          hot_buyer: 25,
        },
      };
    }
  }

  // 2. LIVE ACTIVITY: Real-time pulse feed
  async getLiveActivity(storeId: string) {
    const targetStore = storeId || 'wa-automation';

    const command = new QueryCommand({
      TableName: 'BIME_Events',
      KeyConditionExpression: 'store_id = :storeId',
      ExpressionAttributeValues: { ':storeId': targetStore },
      Limit: 50,
    });

    try {
      const res = await docClient.send(command);
      const items = res.Items || [];

      // ✅ Essential JS Sort by Timestamp (because SK is UUID, not timestamp)
      items.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      // Return last 15 raw activity logs
      return items.slice(0, 15).map((item) => ({
        event_id: item.event_id,
        event_type: item.event_type,
        timestamp: item.timestamp,
        url: item.metadata?.url || item.metadata?.path || '/',
        device: item.metadata?.is_mobile ? 'mobile' : 'desktop',
      }));
    } catch (err) {
      console.error('Error fetching live activity:', err);
      return [];
    }
  }

  // 3. SESSIONS: Last 50 Sessions with Intent, Actions & Outcomes

  // Service class ke andar updated getRecentSessions method:
  async getRecentSessions(
    storeId: string,
    limitCount = 50,
  ): Promise<FormattedSession[]> {
    const targetStore = storeId || 'wa-automation';

    // A. Query Events for this store
    const eventsCommand = new QueryCommand({
      TableName: 'BIME_Events',
      KeyConditionExpression: 'store_id = :storeId',
      ExpressionAttributeValues: { ':storeId': targetStore },
      Limit: 1000,
    });

    // B. Query Outcomes for this store
    const outcomesCommand = new QueryCommand({
      TableName: 'BIME_Outcomes',
      KeyConditionExpression: 'store_id = :storeId',
      ExpressionAttributeValues: { ':storeId': targetStore },
      Limit: 200,
    });

    try {
      const [eventsRes, outcomesRes] = await Promise.all([
        docClient.send(eventsCommand),
        docClient.send(outcomesCommand),
      ]);

      const events = eventsRes.Items || [];
      const outcomes = outcomesRes.Items || [];

      // Create Outcomes Lookup Map by session_id
      const outcomesMap = new Map<string, any>();
      for (const out of outcomes) {
        if (out.session_id) {
          outcomesMap.set(out.session_id, out);
        }
      }

      // Group Events by Session ID
      const sessionsMap = new Map<string, any[]>();
      for (const ev of events) {
        const sessId =
          ev.session_id || ev.metadata?.session_id || 'session_general';
        if (!sessionsMap.has(sessId)) {
          sessionsMap.set(sessId, []);
        }
        sessionsMap.get(sessId)?.push(ev);
      }

      // ✅ FIX 1: Explicitly typed array (No more 'never' error)
      const formattedSessions: FormattedSession[] = [];

      for (const [sessionId, sessEvents] of sessionsMap.entries()) {
        // ✅ FIX 2: Safe defensive check (No more 'possibly undefined' error)
        if (!sessEvents || sessEvents.length === 0) continue;

        // Sort session events by timestamp descending
        sessEvents.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        const latestEvent = sessEvents[0];
        const oldestEvent = sessEvents[sessEvents.length - 1];

        // Device Detection
        const isMobile = sessEvents.some((e) => e.metadata?.is_mobile === true);

        // Inferred Intent Calculation
        let dominantIntent = 'browsing';
        const hasSizeHover = sessEvents.some(
          (e) => e.event_type === 'hover_size_chart',
        );
        const hasPriceHover = sessEvents.some(
          (e) =>
            e.event_type === 'price_hover' || e.event_type === 'tab_hidden',
        );
        const hasExitIntent = sessEvents.some(
          (e) =>
            e.event_type === 'exit_intent' ||
            e.event_type === 'back_button_click',
        );
        const hasAddToCart = sessEvents.some(
          (e) => e.event_type === 'add_to_cart_click',
        );
        const hasTrustHesitation = sessEvents.some(
          (e) =>
            e.event_type === 'slow_scroll' || e.event_type === 'scroll_pause',
        );

        if (hasAddToCart) dominantIntent = 'hot_buyer';
        else if (hasSizeHover) dominantIntent = 'size_confusion';
        else if (hasPriceHover || hasExitIntent)
          dominantIntent = 'price_sensitive';
        else if (hasTrustHesitation) dominantIntent = 'trust_hesitation';

        // Action Shown
        let actionShown = 'none';
        const quizShown = sessEvents.some(
          (e) =>
            e.metadata?.action === 'show_size_quiz' ||
            e.event_type === 'size_quiz_completed',
        );
        const discountShown = sessEvents.some(
          (e) => e.metadata?.action === 'show_discount',
        );
        const trustShown = sessEvents.some(
          (e) => e.metadata?.action === 'show_trust',
        );

        if (quizShown) actionShown = 'show_size_quiz';
        else if (discountShown) actionShown = 'show_discount';
        else if (trustShown) actionShown = 'show_trust';

        // Outcome & Revenue from Outcomes Map
        const outcomeRecord = outcomesMap.get(sessionId);
        let outcome = 'in_progress';
        let revenue = 0;

        if (outcomeRecord) {
          outcome = outcomeRecord.outcome || 'purchase';
          revenue = Number(outcomeRecord.revenue) || 0;
        } else if (hasExitIntent) {
          outcome = 'bounced';
        }

        formattedSessions.push({
          session_id: sessionId,
          device: isMobile ? 'mobile' : 'desktop',
          intent: dominantIntent,
          action_shown: actionShown,
          outcome: outcome,
          revenue: revenue,
          events_count: sessEvents.length,
          entry_url:
            oldestEvent?.metadata?.url || oldestEvent?.metadata?.path || '/',
          timestamp: latestEvent?.timestamp || new Date().toISOString(),
        });
      }

      // Sort distinct sessions by latest activity
      formattedSessions.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      // Return top limit
      return formattedSessions.slice(0, limitCount);
    } catch (err) {
      console.error('Error fetching dashboard sessions:', err);
      return [];
    }
  }
}
