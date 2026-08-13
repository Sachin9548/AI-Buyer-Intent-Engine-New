import { Injectable } from '@nestjs/common';
import { SessionFeatures } from './feature-engineering.service';

export interface RuleDecision {
  action: 'show_size_quiz' | 'show_discount' | 'show_trust' | 'none';
  message: string;
  confidence: number;
  reason: string;
}

@Injectable()
export class RuleEngineService {
  private readonly CONFIDENCE_THRESHOLD = 0.55;

  evaluateFeatures(features: SessionFeatures): RuleDecision {
    if (!features) {
      return { action: 'none', message: '', confidence: 0, reason: 'no_features' };
    }

    // =========================================================
    // 1. STRICT SUPPRESSION RULES (Safety First - Non-Negotiable)
    // =========================================================

    // Rule 1: Checkout Page -> NEVER INTERRUPT
    if (features.page_type === 'checkout') {
      return { action: 'none', message: '', confidence: 0, reason: 'checkout_page_suppression' };
    }

    // Rule 2: Keyboard Open (Mobile Typing) -> NEVER INTERRUPT
    if (features.keyboard_open) {
      return { action: 'none', message: '', confidence: 0, reason: 'keyboard_open_suppression' };
    }

    // Rule 3: Already Triggered in this Session -> MAX 1 ACTION PER SESSION
    if (features.already_triggered) {
      return { action: 'none', message: '', confidence: 0, reason: 'already_triggered_suppression' };
    }

    // Rule 4: Hot Buyer Pattern -> NEVER INTERRUPT
    if (features.time_on_page <= 45 && features.scroll_depth >= 60 && features.hesitation_score < 0.30) {
      return { action: 'none', message: '', confidence: 0, reason: 'hot_buyer_suppression' };
    }

    // =========================================================
    // 2. DEVICE-SPECIFIC MULTI-SIGNAL RULES
    // =========================================================

    const decision = features.device_type === 'mobile'
      ? this.evaluateMobileRules(features)
      : this.evaluateDesktopRules(features);

    // =========================================================
    // 3. CONFIDENCE FLOOR CHECK ON THE DECISION
    // =========================================================
    if (decision.action !== 'none' && decision.confidence < this.CONFIDENCE_THRESHOLD) {
      return { action: 'none', message: '', confidence: decision.confidence, reason: 'below_confidence_threshold' };
    }

    return decision;
  }

  private evaluateMobileRules(f: SessionFeatures): RuleDecision {
    // Mobile Rule 1: Size Confusion
    if (
      f.size_hover_count >= 1 ||
      (f.confusion_score >= 0.50 && f.scroll_backward_count >= 2 && f.scroll_pause_count >= 2 && f.time_on_page >= 45)
    ) {
      return {
        action: 'show_size_quiz',
        message: 'Not sure about size?',
        confidence: Math.max(f.confusion_score, 0.70),
        reason: 'mobile_size_confusion',
      };
    }

    // Mobile Rule 2: Price Anxiety
    if (
      f.price_hover_count >= 1 ||
      (f.price_anxiety >= 0.50 && (f.tab_hidden_count >= 1 || f.back_button_count >= 1) && f.time_on_page >= 60)
    ) {
      return {
        action: 'show_discount',
        message: 'Still thinking? Claim 10% Off Today!',
        confidence: Math.max(f.price_anxiety, 0.75),
        reason: 'mobile_price_anxiety',
      };
    }

    // Mobile Rule 3: Trust Hesitation
    if (f.scroll_depth >= 70 && f.slow_scroll_count >= 2 && f.time_on_page >= 90) {
      return {
        action: 'show_trust',
        message: 'Shop with 100% Confidence',
        confidence: 0.68,
        reason: 'mobile_trust_hesitation',
      };
    }

    return { action: 'none', message: '', confidence: f.hesitation_score, reason: 'no_mobile_rule_matched' };
  }

  private evaluateDesktopRules(f: SessionFeatures): RuleDecision {
    // Desktop Rule 1: Exit Intent OR Price Hover -> Price Sensitive
    if (
      f.exit_intent_count >= 1 ||
      f.price_hover_count >= 1 ||
      (f.price_anxiety >= 0.50 && f.tab_hidden_count >= 1 && f.time_on_page >= 45)
    ) {
      return {
        action: 'show_discount',
        message: 'Still thinking? Claim 10% Off Today!',
        confidence: Math.max(f.price_anxiety, 0.80),
        reason: 'desktop_exit_or_price_anxiety',
      };
    }

    // Desktop Rule 2: Size Confusion
    if (f.size_hover_count >= 1 || (f.confusion_score >= 0.50 && f.scroll_pause_count >= 2)) {
      return {
        action: 'show_size_quiz',
        message: 'Not sure about size?',
        confidence: Math.max(f.confusion_score, 0.72),
        reason: 'desktop_size_confusion',
      };
    }

    // Desktop Rule 3: Trust Hesitation
    if (f.scroll_depth >= 75 && f.slow_scroll_count >= 3 && f.time_on_page >= 100) {
      return {
        action: 'show_trust',
        message: 'Shop with 100% Confidence',
        confidence: 0.65,
        reason: 'desktop_trust_hesitation',
      };
    }

    return { action: 'none', message: '', confidence: f.hesitation_score, reason: 'no_desktop_rule_matched' };
  }
}