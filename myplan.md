# BIME — Complete Production Master Plan
**AI Buyer Intent & Mood Engine**
*Zero to Production — All Websites, All Platforms*

---

## Table of Contents

1. [Current Status — Kya Bana Hai](#1-current-status)
2. [Critical Issues — Abhi Fix Karo](#2-critical-issues)
3. [Final Tech Stack — Confirmed](#3-final-tech-stack)
4. [SDK Architecture — Universal + Mobile First](#4-sdk-architecture)
5. [Signal System — Complete](#5-signal-system)
6. [Intent Engine — Rules → ML](#6-intent-engine)
7. [Action System — 3 UI Types](#7-action-system)
8. [Backend Architecture](#8-backend-architecture)
9. [AWS Infrastructure](#9-aws-infrastructure)
10. [AI/ML Plan — Phased](#10-aiml-plan)
11. [Platform Support — All Websites](#11-platform-support)
12. [Week-by-Week Build Plan](#12-week-by-week-build-plan)
13. [Production Checklist](#13-production-checklist)

---

## 1. Current Status

### Kya Bana Hai ✅

| Component | Status | Notes |
|---|---|---|
| EC2 Server | ✅ Live | IP: 13.233.154.127 |
| DynamoDB | ✅ Connected | Events store ho rahe hain |
| Redis | ✅ Running | Session state |
| S3 | ✅ Setup | SDK hosting |
| Nginx | ✅ Configured | Proxy |
| JS SDK (basic) | ✅ Working | Events capture + send |
| Rule Engine | ✅ Basic | Nudge trigger ho raha hai |
| Shadow DOM UI | ✅ Done | Isolated nudge card |
| Dummy Shopify Store | ✅ Test | Local test.html working |

### Overall Assessment
**Direction: Bilkul sahi.** Foundation solid hai. Ab production-ready banana hai.

---

## 2. Critical Issues — Abhi Fix Karo

### 🔴 P1 — HTTP Endpoint (BLOCKER)

**Problem:**
```
endpoint: "http://13.233.154.127/api/ingestion/event"
```
Shopify HTTPS pe run karta hai. HTTP fetch = Mixed Content Error = SDK blocked.

**Fix:**
```
1. Domain kharido → api.yourdomain.com
2. AWS Certificate Manager → free SSL certificate
3. Nginx mein HTTPS config karo
4. SDK endpoint update karo:
   "https://api.yourdomain.com/api/ingestion/event"
```
**Timeline: Day 1 — baki sab iske baad**

---

### 🔴 P2 — CSS Selectors Break on Real Sites

**Problem:**
```javascript
document.querySelector('[class*="price"]')    // Fails on most themes
findElementByText('a', 'Size Chart')          // Unreliable
```
Har website alag classes use karti hai. Production mein fail hoga.

**Fix:** DOM pe depend karna band karo. Universal signals use karo.
```
Meta tags → Shopify global object → DOM fallback → behavior signals
```
Full fix in Section 4.

---

### 🔴 P3 — Mobile Signals Missing

**Problem:** SDK sirf desktop signals track karta hai:
- Mouse movement ❌ (mobile pe nahi hota)
- Mouse hover ❌ (mobile pe nahi hota)
- Exit intent via mouseleave ❌ (mobile pe nahi hota)

**Reality:** 90% users mobile pe hain.

**Fix:** Mobile-first signals add karo:
- Scroll velocity + pause ✅
- Touch patterns ✅
- Back button capture ✅
- Pinch zoom ✅
- Keyboard open/close ✅

Full signals in Section 5.

---

### 🟡 P4 — Only One Generic Nudge UI

**Problem:** Ek generic card sabke liye — size confusion, price anxiety, trust issue — sab same UI.

**Fix:** 3 alag action UIs:
1. Size quiz (height + weight input)
2. Discount popup (timer + percentage)
3. Trust badge (returns + COD + original)

---

### 🟡 P5 — No Scroll / Time Tracking

**Problem:** ML ke liye most important features missing:
- Scroll depth ❌
- Time on page ❌
- Cart idle time ❌
- Scroll velocity ❌

**Fix:** Section 5 mein complete signal list.

---

### 🟡 P6 — Single Store Only

**Problem:** Abhi sirf ek store ke liye kaam karta hai. 25-30 stores pe deploy karna hai.

**Fix:** Multi-tenant architecture:
- Har event mein `store_id` already hai ✅
- Store config per-store store karo
- API keys per store generate karo

---

## 3. Final Tech Stack — Confirmed

### Frontend / SDK
| Layer | Technology | Reason |
|---|---|---|
| JS SDK | Vanilla JS — zero dependencies | Lightest, fastest, works everywhere |
| Dashboard UI | Next.js + Tailwind | Fast development |
| Language | TypeScript | Type safety |

### Backend
| Layer | Technology | Reason |
|---|---|---|
| Main API | NestJS (Node.js) | JS ecosystem, Shopify SDK compatibility |
| ML Service | FastAPI (Python) | Internal only, AI integration |
| Containers | Docker | Both services containerized |

### AWS Infrastructure
| Service | Use | Cost/month |
|---|---|---|
| EC2 t3.small | NestJS + FastAPI | ~$17 |
| ElastiCache Redis | Live session features | ~$13 |
| DynamoDB | Raw events — high write | ~$3 |
| RDS PostgreSQL | Outcomes + analytics | ~$15 |
| S3 | SDK files + ML models | ~$2 |
| CloudFront | SDK CDN — global fast delivery | ~$2 |
| EventBridge | Daily ML retraining cron | ~$1 |
| **Total MVP** | | **~$53/month** |

### AI/ML
| Component | Technology | When Active |
|---|---|---|
| Phase 1 | Rule-based Python | Day 1 |
| Phase 2 | LightGBM | Month 3 (500+ sessions) |
| Phase 3 | LightGBM continuous batch | Month 5+ (5000+ sessions) |
| Tracking | MLflow | Always |
| ❌ Dropped | XGBoost | LightGBM better |
| ❌ Dropped | River | Model drift risk — MVP ke liye |

---

## 4. SDK Architecture — Universal + Mobile First

### Core Philosophy
```
Google Analytics approach:
DOM ko touch mat karo
Browser events track karo
Koi bhi website pe kaam karo
```

### Install Method — 1 Script Tag (Like GA)
```html
<!-- Any website — 1 line install -->
<script
  src="https://cdn.yourdomain.com/bime.js"
  data-store-id="STORE_123"
  async
></script>
```

### Platform Auto-Detection
```javascript
function detectPlatform() {
  if (window.Shopify)                        return 'shopify';
  if (window.woocommerce_params)             return 'woocommerce';
  if (document.getElementById('__NEXT_DATA__')) return 'nextjs';
  if (window.Webflow)                        return 'webflow';
  if (window.wixBiSession)                   return 'wix';
  return 'generic';
}
```

### SDK Init — Read from Script Tag
```javascript
(function() {
  const script = document.currentScript ||
    document.querySelector('script[data-store-id]');

  const CONFIG = {
    storeId: script?.getAttribute('data-store-id'),
    endpoint: 'https://api.yourdomain.com/api/ingestion/event',
    batchSize: 5,
    buffer: [],
    platform: detectPlatform(),
    isMobile: window.innerWidth < 768 || 'ontouchstart' in window,
    pageStart: Date.now(),
  };
})();
```

### Price Detection — Universal Fallback Chain
```javascript
function detectPriceContext() {
  // Layer 1: Meta tag — works on ALL Shopify stores
  const meta = document.querySelector('meta[property="og:price:amount"]');
  if (meta) return { value: meta.content, source: 'meta' };

  // Layer 2: Shopify global object
  const shopify = window.ShopifyAnalytics?.meta?.product;
  if (shopify?.price) return { value: shopify.price, source: 'shopify_global' };

  // Layer 3: WooCommerce
  const woo = document.querySelector('.woocommerce-Price-amount');
  if (woo) return { value: woo.innerText, source: 'woocommerce' };

  // Layer 4: Common patterns (last resort)
  const selectors = [
    '.price__current', '.product__price', 'span.money',
    '.price', '#ProductPrice', '[data-product-price]'
  ];
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el) return { value: el.innerText, source: 'dom_fallback' };
  }

  return null; // Track behavior only — no price value needed
}
```

---

## 5. Signal System — Complete

### Device Detection First
```javascript
const DEVICE = {
  isMobile: /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768,
  isTouch: 'ontouchstart' in window,
  network: navigator.connection?.effectiveType || 'unknown',
  screenWidth: window.screen.width,
};
```

---

### Universal Signals (All Devices)

#### Signal 1 — Scroll Depth Milestones
```javascript
let maxScroll = 0;
let scrollPauseTimer;

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.round((window.scrollY / total) * 100);

  // Milestone tracking
  if (pct > maxScroll) {
    maxScroll = pct;
    if ([25, 50, 75, 90].includes(pct)) {
      BIME.track('scroll_milestone', { depth: pct });
    }
  }

  // Scroll pause — stopped for 2 seconds
  clearTimeout(scrollPauseTimer);
  scrollPauseTimer = setTimeout(() => {
    BIME.track('scroll_pause', {
      position_pct: Math.round(window.scrollY / total * 100)
    });
  }, 2000);
}, { passive: true });
```

#### Signal 2 — Time Tracking
```javascript
const pageStart = Date.now();
let lastActivity = Date.now();

['click', 'scroll', 'touchstart', 'keydown'].forEach(evt => {
  document.addEventListener(evt, () => {
    lastActivity = Date.now();
  }, { passive: true });
});

// Idle detection
setInterval(() => {
  const idle = (Date.now() - lastActivity) / 1000;
  if (idle > 30) {
    BIME.track('user_idle', {
      idle_seconds: Math.round(idle),
      time_on_page: Math.round((Date.now() - pageStart) / 1000)
    });
  }
}, 10000);

// Session end
window.addEventListener('beforeunload', () => {
  BIME.track('session_end', {
    time_on_page: Math.round((Date.now() - pageStart) / 1000),
    max_scroll: maxScroll,
  });
});
```

#### Signal 3 — Tab Visibility
```javascript
document.addEventListener('visibilitychange', () => {
  BIME.track(document.hidden ? 'tab_hidden' : 'tab_visible', {
    time_on_page: Math.round((Date.now() - pageStart) / 1000)
  });
});
```

#### Signal 4 — Page Type Detection
```javascript
function detectPageType() {
  const path = window.location.pathname;
  if (path.includes('/checkout'))    return 'checkout';
  if (path.includes('/cart'))        return 'cart';
  if (path.includes('/products/'))   return 'product';
  if (path.includes('/collections')) return 'collection';
  if (path === '/')                  return 'home';
  return 'other';
}
```

---

### Mobile-Specific Signals

#### Signal 5 — Scroll Velocity + Backward Scroll
```javascript
let lastScrollY = 0;
let lastScrollTime = Date.now();

window.addEventListener('scroll', () => {
  const now = Date.now();
  const dy = window.scrollY - lastScrollY;
  const dt = now - lastScrollTime;
  const velocity = Math.abs(dy) / dt;

  // Slow scroll = reading carefully
  if (velocity < 0.3 && Math.abs(dy) > 5) {
    BIME.track('slow_scroll', {
      position_pct: Math.round(window.scrollY /
        (document.body.scrollHeight - window.innerHeight) * 100),
      velocity: parseFloat(velocity.toFixed(3))
    });
  }

  // Backward scroll = reconsidering
  if (dy < -80) {
    BIME.track('scroll_backward', {
      from_pct: Math.round(lastScrollY / document.body.scrollHeight * 100),
      to_pct: Math.round(window.scrollY / document.body.scrollHeight * 100)
    });
  }

  lastScrollY = window.scrollY;
  lastScrollTime = now;
}, { passive: true });
```

#### Signal 6 — Touch Patterns (Mobile Only)
```javascript
if (DEVICE.isTouch) {
  let touchStartY = 0;
  let touchStartTime = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const duration = Date.now() - touchStartTime;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

    // Long press = reading carefully
    if (duration > 500 && dy < 10) {
      BIME.track('long_press', {
        duration_ms: duration,
        position_pct: Math.round(
          (touchStartY + window.scrollY) / document.body.scrollHeight * 100
        )
      });
    }
  }, { passive: true });

  // Pinch zoom = examining product closely
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      BIME.track('pinch_zoom', {});
    }
  }, { passive: true, once: true });
}
```

#### Signal 7 — Back Button (Mobile Exit Intent)
```javascript
// Mobile pe back button = desktop ka exit intent
if (DEVICE.isMobile) {
  window.history.pushState(null, '', window.location.href);

  window.addEventListener('popstate', () => {
    BIME.track('back_button', {
      time_on_page: Math.round((Date.now() - pageStart) / 1000),
      scroll_depth: maxScroll
    });
    // Action trigger check here
  });
}
```

#### Signal 8 — Keyboard Open (Checkout Intent)
```javascript
const initialViewportH = window.innerHeight;

window.addEventListener('resize', () => {
  const diff = initialViewportH - window.innerHeight;
  if (diff > 150) {
    BIME.track('keyboard_open', {
      is_checkout: window.location.href.includes('checkout')
    });
  }
});
```

---

### Desktop-Specific Signals

#### Signal 9 — Exit Intent (Desktop Only)
```javascript
if (!DEVICE.isMobile) {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0) {
      BIME.track('exit_intent', {
        time_on_page: Math.round((Date.now() - pageStart) / 1000),
        scroll_depth: maxScroll
      });
    }
  });
}
```

#### Signal 10 — Mouse Zone Heatmap (Desktop Only)
```javascript
if (!DEVICE.isMobile) {
  const zoneTime = {};
  let lastMoveTime = Date.now();

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime < 200) return; // Throttle
    lastMoveTime = now;

    const pageH = document.documentElement.scrollHeight;
    const mouseY = e.clientY + window.scrollY;
    const zone = Math.floor((mouseY / pageH) * 10); // 0-9

    zoneTime[zone] = (zoneTime[zone] || 0) + 1;

    // High time in zone 0-2 = price area interest
    if (zoneTime[zone] > 50) {
      BIME.track('zone_hover_high', { zone, count: zoneTime[zone] });
    }
  }, { passive: true });
}
```

---

## 6. Intent Engine — Rules → ML

### Rule-Based Engine (Phase 1 — Day 1)

```python
# backend/services/intent_engine.py

RULES = {
  "confused": {
    "conditions": [
      "scroll_backward >= 2",
      "scroll_pause_count >= 2",
      "time_on_page >= 60",
      "scroll_depth >= 40"
    ],
    "mobile_extra": ["long_press >= 1"],
    "confidence": 0.65
  },
  "price_sensitive": {
    "conditions": [
      "tab_hidden >= 1",           # Comparing prices elsewhere
      "time_on_page >= 90",
      "scroll_depth >= 40",
      "no_cart_event == True"
    ],
    "mobile_extra": ["back_button == True"],
    "desktop_extra": ["exit_intent == True", "zone_0_2_time_high == True"],
    "confidence": 0.65
  },
  "trust_hesitation": {
    "conditions": [
      "scroll_depth >= 75",        # Saw reviews section
      "time_on_page >= 120",
      "slow_scroll_count >= 3",
      "keyboard_open == False"     # Form nahi bhara
    ],
    "confidence": 0.60
  },
  "hot_buyer": {
    "conditions": [
      "time_on_page <= 90",
      "scroll_depth >= 60",
      "pinch_zoom >= 1",           # OR keyboard_open == True
    ],
    "confidence": 0.70
  }
}

CONFIDENCE_THRESHOLD = 0.55
# Below threshold → no action regardless of intent
```

### Feature Engineering
```python
def compute_features(session_events: list) -> dict:
  events_by_type = {}
  for e in session_events:
    t = e['event_type']
    events_by_type[t] = events_by_type.get(t, 0) + 1

  # Page start time se time_on_page
  first_event_time = session_events[0]['timestamp']
  last_event_time  = session_events[-1]['timestamp']
  time_on_page = (last_event_time - first_event_time).seconds

  return {
    "scroll_depth":       max_scroll_from_events(session_events),
    "time_on_page":       time_on_page,
    "scroll_backward":    events_by_type.get('scroll_backward', 0),
    "scroll_pause_count": events_by_type.get('scroll_pause', 0),
    "tab_hidden":         events_by_type.get('tab_hidden', 0),
    "long_press":         events_by_type.get('long_press', 0),
    "back_button":        events_by_type.get('back_button', 0),
    "pinch_zoom":         events_by_type.get('pinch_zoom', 0),
    "exit_intent":        events_by_type.get('exit_intent', 0),
    "keyboard_open":      events_by_type.get('keyboard_open', 0),
    "slow_scroll_count":  events_by_type.get('slow_scroll', 0),
  }
```

### Decision Rules
```python
def decide_action(intent, confidence, context):
  # Rule 1: Low confidence → kuch mat karo
  if confidence < CONFIDENCE_THRESHOLD:
    return {"action": "none", "reason": "low_confidence"}

  # Rule 2: Hot buyer → kabhi disturb mat karo
  if intent == "hot_buyer":
    return {"action": "none", "reason": "hot_buyer"}

  # Rule 3: Checkout page pe → kuch mat karo
  if context.get("page_type") == "checkout":
    return {"action": "none", "reason": "checkout_page"}

  # Rule 4: Keyboard open hai → kuch mat karo
  if context.get("keyboard_open"):
    return {"action": "none", "reason": "keyboard_open"}

  # Rule 5: Already triggered this session → kuch mat karo
  if context.get("already_triggered"):
    return {"action": "none", "reason": "already_triggered"}

  # Action mapping
  action_map = {
    "confused":          "show_size_quiz",
    "price_sensitive":   "show_discount",
    "trust_hesitation":  "show_trust",
    "window_shopper":    "none",
  }

  return {
    "action": action_map.get(intent, "none"),
    "confidence": confidence
  }
```

---

## 7. Action System — 3 UI Types

### Action Rules (Non-Negotiable)
```
✅ Max 1 action per session
✅ Hot buyer → never trigger
✅ Checkout page → never trigger
✅ Keyboard open → never trigger
✅ Low confidence → never trigger
✅ Mobile: bottom sheet UI
✅ Desktop: bottom-right card
```

### Mobile vs Desktop UI
```javascript
const isMobile = window.innerWidth < 768;

// Mobile: Bottom sheet
const mobileStyles = `
  position: fixed; bottom: 0; left: 0; right: 0;
  border-radius: 16px 16px 0 0;
  padding: 20px; z-index: 9999;
  animation: slideUp 0.3s ease;
`;

// Desktop: Corner card
const desktopStyles = `
  position: fixed; bottom: 20px; right: 20px;
  width: 280px; border-radius: 12px;
  animation: fadeUp 0.3s ease;
`;
```

### Action 1 — Size Quiz (Confused User)
```
Trigger: scroll_backward × 2 + scroll_pause × 2 + time > 60s
UI: Height input + Weight input → Size recommendation
Rule: Never guess size — logic-based mapping only
Mobile: Full-width bottom sheet, number keyboard
```

### Action 2 — Discount + Timer (Price Sensitive)
```
Trigger: tab_hidden + time > 90s + no cart event
         Mobile: back_button press
         Desktop: exit_intent
UI: "Still thinking? 10% off — 5 minutes only"
    Countdown timer
    Apply button
```

### Action 3 — Trust Badge (Trust Hesitation)
```
Trigger: scroll_depth > 75% + time > 120s + slow_scroll × 3
UI: ✔ 7-day returns
    ✔ 100% original product
    ✔ Cash on delivery
    ✔ Delivered in 3-5 days
```

---

## 8. Backend Architecture

### NestJS Project Structure
```
bime-backend/
├── src/
│   ├── ingestion/
│   │   ├── ingestion.controller.ts   ← POST /api/ingestion/event
│   │   ├── ingestion.service.ts      ← DynamoDB save + Redis update
│   │   └── ingestion.module.ts
│   ├── intent/
│   │   ├── intent.controller.ts      ← GET /api/intent/:sessionId
│   │   ├── intent.service.ts         ← Call Python ML service
│   │   └── intent.module.ts
│   ├── outcomes/
│   │   ├── outcomes.controller.ts    ← POST /api/outcome
│   │   └── outcomes.service.ts       ← PostgreSQL save
│   ├── stores/
│   │   ├── stores.controller.ts      ← Store management
│   │   └── stores.service.ts         ← API keys, config
│   └── common/
│       ├── redis.service.ts
│       ├── dynamo.service.ts
│       └── auth.guard.ts             ← API key validation
├── Dockerfile
└── package.json
```

### API Endpoints
```
POST /api/ingestion/event     ← SDK events receive karo
GET  /api/intent/:sessionId   ← Intent + action return karo
POST /api/outcome             ← Purchase/bounce record karo
POST /api/stores/register     ← New store onboard
GET  /api/dashboard/stats     ← Dashboard data
```

### Event Flow
```
SDK → POST /api/ingestion/event
       ↓
NestJS receives batch of events
       ↓
DynamoDB: raw events store (async)
       ↓
Redis: session features update
       ↓
Feature engineering service
       ↓
Rule engine (Phase 1) / Python ML service (Phase 2)
       ↓
Action decision return to SDK
       ↓
SDK shows action (or stays silent)
       ↓
Outcome tracked → PostgreSQL
```

### Python ML Service (Internal)
```python
# Runs on same EC2, port 8001 — internal only
# NestJS → http://localhost:8001/predict

from fastapi import FastAPI
import lightgbm as lgb
import joblib

app = FastAPI()
model = joblib.load('models/intent_classifier.pkl')

@app.post("/predict")
async def predict(features: dict):
    # features → LightGBM → probabilities
    X = prepare_features(features)
    probas = model.predict_proba(X)[0]
    return {
        "hot_buyer": float(probas[0]),
        "price_sensitive": float(probas[1]),
        "confused": float(probas[2]),
        "explorer": float(probas[3]),
        "window_shopper": float(probas[4]),
    }
```

---

## 9. AWS Infrastructure

### Architecture Diagram
```
Internet
    ↓
CloudFront (SDK CDN)
    ↓
Nginx (EC2)
    ↓
NestJS API (port 3000)
    ↓
├── DynamoDB (raw events)
├── Redis/ElastiCache (session state)
├── RDS PostgreSQL (outcomes)
├── S3 (models + archives)
└── FastAPI ML (port 8001, internal)

EventBridge (cron 2AM)
    ↓
EC2 Python Training Script
    ↓
S3 (new model saved)
    ↓
FastAPI ML service reloads
```

### EC2 Setup
```bash
# Instance: t3.small (MVP) → t3.medium (scale)
# OS: Ubuntu 22.04 LTS
# Security Groups:
#   Port 80  → HTTP (redirect to HTTPS)
#   Port 443 → HTTPS
#   Port 22  → SSH (your IP only)
#   All other ports → CLOSED

# Install:
sudo apt update
sudo apt install nginx docker.io docker-compose nodejs npm python3 python3-pip -y
```

### Nginx Config
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # CORS — all websites ke liye
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    }
}
```

### Cost Optimization
```
EC2 Spot Instances    → ML training ke liye (70% cheaper)
S3 Intelligent Tiering → Old data auto cheap storage
RDS Reserved (1 year) → 40% cheaper
CloudFront caching    → SDK file cached, EC2 load kam
```

---

## 10. AI/ML Plan — Phased

### Phase 1 — Rule-Based (Day 1 → Month 2)
```
No training data needed
Works immediately
Accuracy: ~58-62%
Goal: Collect real data
```

### Phase 2 — LightGBM (Month 3)
```
Requirement: 500+ real sessions
Training: Weekly batch on DynamoDB data
Accuracy: ~70-75%
Auto-deploy if better than rules
MLflow tracks every experiment
```

### Phase 3 — Continuous Batch (Month 5+)
```
Requirement: 5000+ sessions
Training: Every night 2AM via EventBridge
25-30 sites combined data
Store-specific patterns emerge
Accuracy: ~82-85%
Auto rollback if accuracy drops
```

### Auto-Labeling Strategy
```python
# Purchase happened → positive signal
"outcome == purchase"           → label: hot_buyer / explorer

# Action triggered + then purchase → correct prediction
"action_shown AND purchase"     → reward

# Action triggered + bounce → wrong prediction
"action_shown AND bounce"       → penalty

# Cart idle > 5min then bounce → price sensitive
"cart_idle > 300 AND bounce"    → label: price_sensitive

# Size changes ≥ 3 then bounce → confused
"size_changes >= 3 AND bounce"  → label: confused
```

### Nightly Retraining Pipeline
```
EventBridge 2AM trigger
    ↓
Pull last 30 days from DynamoDB
    ↓
Auto-label outcomes
    ↓
LightGBM train (10-15 min)
    ↓
Compare accuracy: new vs current
    ↓
New better? → Deploy to S3
Not better? → Keep old model (auto rollback)
    ↓
MLflow log result
```

---

## 11. Platform Support — All Websites

### Install Methods by Platform

| Platform | Method | Difficulty |
|---|---|---|
| Any website | Script tag in HTML | Easy |
| Shopify | Custom Pixels (no app needed!) | Easy |
| WordPress | WPCode plugin | Easy |
| Next.js / React | useEffect or next/script | Easy |
| Google Tag Manager | Custom HTML tag | Easiest for merchants |
| Webflow | Site settings → custom code | Easy |

### Shopify — Bina App Ke (Important!)
```
Settings → Customer Events → Add Custom Pixel
Paste JS code directly
No app store review needed
No Shopify Partner account needed
Works immediately
```

### Google Tag Manager — Best for Merchants
```
90% merchants already have GTM
GTM → New Tag → Custom HTML
Paste: <script src="..." data-store-id="..."></script>
Trigger: All Pages
Publish
→ Works on Shopify, WordPress, Wix, Webflow — everything
```

### WordPress — No Plugin Needed
```php
// functions.php mein add karo:
function bime_script() {
    echo '<script src="https://cdn.yourdomain.com/bime.js"
          data-store-id="STORE_123" async></script>';
}
add_action('wp_footer', 'bime_script');
```

---

## 12. Week-by-Week Build Plan

### Week 1 — Foundation Fix
```
Day 1: Domain + HTTPS setup
       AWS Certificate Manager → free SSL
       Nginx HTTPS config
       Test: https://api.yourdomain.com/health → 200 OK

Day 2: SDK — remove CSS selectors
       Add universal price detection (meta tag first)
       Add platform auto-detection
       Add device detection (mobile vs desktop)

Day 3: SDK — add missing signals
       Scroll depth milestones
       Scroll pause detection
       Time on page
       Tab visibility

Day 4: SDK — mobile signals
       Scroll velocity + backward scroll
       Touch long press
       Back button capture
       Keyboard open detection

Day 5: SDK — desktop signals
       Exit intent (mouseleave)
       Mouse zone heatmap

Day 6: Test on dummy Shopify store
       Events DynamoDB mein aa rahe hain? ✓
       Mobile signals working? ✓
       Desktop signals working? ✓
       Console errors nahi? ✓

Day 7: Buffer / rest
```

### Week 2 — Action System
```
Day 1-2: Size quiz UI (mobile bottom sheet + desktop card)
         Height + weight inputs
         Size recommendation logic
         Trust message: "Based on your details, L fits you well"

Day 3-4: Discount popup UI
         Countdown timer (5 minutes)
         Apply button (trigger event)
         Mobile full-width

Day 5-6: Trust badge UI
         Returns + COD + Original + Delivery
         Mobile bottom sheet

Day 7:   Test all 3 actions on mobile + desktop
         Shadow DOM isolation confirmed
```

### Week 3 — Rule Engine Upgrade
```
Day 1-2: Feature computation from events
         DynamoDB → feature dict
         Per session aggregation

Day 3-4: Rule engine with new signals
         Mobile rules (back button, slow scroll)
         Desktop rules (exit intent, zone hover)
         Confidence threshold implementation

Day 5-6: Backend: intent endpoint polish
         Session state in Redis
         Already-triggered check
         Checkout page detection

Day 7:   End-to-end test: signal → rule → action → track outcome
```

### Week 4 — Multi-Store + Dashboard (Basic)
```
Day 1-2: Multi-tenant: store config per store
         API keys per store (generate + validate)
         Store registration endpoint

Day 3-4: Next.js dashboard — basic version
         Sessions list
         Intent distribution (pie chart)
         Actions triggered count
         Conversions from actions

Day 5-6: SDK: read config from backend on init
         Store-specific settings

Day 7:   Test with 2-3 different store IDs
```

### Week 5 — Platform Testing
```
Day 1-2: Test on Shopify (Custom Pixels method)
         Test on WordPress (WPCode plugin)
         Test on plain HTML website

Day 3-4: Fix any platform-specific issues
         GTM integration test

Day 5-7: Bug fixes, stability, performance
         SDK load time < 100ms confirmed
         Zero console errors on any platform
```

### Week 6 — AWS Production Setup
```
Day 1-2: EC2 production config
         Docker compose: NestJS + FastAPI + Nginx
         Environment variables setup (not hardcoded!)

Day 3-4: CloudFront for SDK CDN
         S3 bucket for SDK file
         Deployment script

Day 5-6: CI/CD: GitHub Actions → EC2
         Auto-deploy on push to main
         Health check monitoring

Day 7:   Full production test
         Load test (k6 or Artillery)
```

### Week 7-8 — Pilot Launch
```
Week 7: Onboard 5 pilot stores
        - 2-3 Shopify stores
        - 1-2 WordPress stores
        - Mix of fashion + other categories
        Free access in exchange for feedback + data

Week 8: Monitor + fix issues
        Collect real session data
        Build first case study
        Dashboard improvements based on feedback
```

### Month 3 — First ML Model
```
Requirement: 500+ sessions collected ✓
Action:
  1. Export DynamoDB data
  2. Auto-label outcomes
  3. Train LightGBM
  4. If accuracy >= 70% → replace rules
  5. MLflow track
  6. Weekly retraining starts
```

### Month 4-5 — Scale + ML Improve
```
25-30 stores live
Combined data → better model
Daily retraining pipeline
Target: 78-80% accuracy
Continuous batch live
```

---

## 13. Production Checklist

### Before Going Live

#### Security
- [ ] HTTPS everywhere (no HTTP)
- [ ] API keys per store (not same key for all)
- [ ] Rate limiting on API (max 100 req/min per store)
- [ ] IP exposed nahi — domain use karo
- [ ] Environment variables — no hardcoded secrets
- [ ] CORS properly configured

#### Performance
- [ ] SDK load time < 100ms
- [ ] SDK size < 15KB (minified)
- [ ] API response < 200ms
- [ ] No blocking scripts on client
- [ ] CloudFront caching for SDK

#### Privacy / Compliance
- [ ] No PII (no email, no name, no phone collected)
- [ ] Session IDs anonymous (UUID only)
- [ ] Cookie consent compatible
- [ ] Privacy policy mentions behavioral tracking
- [ ] GDPR: data deletion endpoint available

#### Reliability
- [ ] Docker containers restart on crash
- [ ] Nginx auto-restart
- [ ] CloudWatch alerts for EC2 CPU > 80%
- [ ] DynamoDB backup enabled
- [ ] Redis persistence enabled (AOF)
- [ ] ML model fallback: if Python service down → use rules

#### SDK
- [ ] Works on mobile (tested on real device)
- [ ] Works on desktop (tested on Chrome, Safari, Firefox)
- [ ] Shadow DOM isolation — no CSS conflicts
- [ ] Max 1 action per session enforced
- [ ] No action on checkout page
- [ ] No action when keyboard open (mobile)
- [ ] Silent fail — store site not affected if BIME errors

#### Multi-Store
- [ ] store_id on every event
- [ ] Per-store API keys
- [ ] Per-store config
- [ ] Per-store analytics in dashboard

---

## Quick Reference — 3 Most Important Rules

```
Rule 1: Hot buyer → NEVER show action
Rule 2: Checkout page → NEVER show action
Rule 3: Keyboard open → NEVER show action (mobile)
```

## Quick Reference — Fix Order This Week

```
Priority 1: HTTPS + domain setup (BLOCKER)
Priority 2: Remove CSS selectors → universal detection
Priority 3: Add mobile signals (scroll velocity, back button, touch)
Priority 4: 3 action UIs (size quiz, discount, trust)
Priority 5: Test on real Shopify store via Custom Pixels
```

---

*Last updated: Production Master Plan v1.0*
*Next review: After Week 8 pilot launch*