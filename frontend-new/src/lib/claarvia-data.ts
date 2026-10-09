/** Mock telemetry powering the Claarvia dashboard surfaces. */

export type IntentState = "Idle" | "Browsing" | "Hesitating" | "Buying" | "Converted" | "Lost";
export type HesitationReason =
  | "price"
  | "shipping cost"
  | "trust/security"
  | "comparing options"
  | "stuck at form"
  | "size confusion";

export type Session = {
  id: string;
  entryPage: string;
  state: IntentState;
  reason?: HesitationReason;
  confidence: number;
  timeOnSite: string;
  device: "Desktop" | "Mobile" | "Tablet";
  location: string;
  source: string;
  segment: string;
  lastAction: string;
  value: number;
  intervention?: string;
  outcome?: "Converted" | "Dismissed" | "No response" | "Pending" | "Lost";
};

const pages = ["/products/aero-runner", "/checkout", "/cart", "/pricing", "/collections/new", "/product/lumen-lamp"];
const locations = ["Austin, US", "Berlin, DE", "Toronto, CA", "London, UK", "Sydney, AU", "Lisbon, PT"];
const sources = ["google / cpc", "instagram", "direct", "klaviyo / email", "tiktok"];
const segments = ["High-intent returning", "First-time visitors", "Cart abandoners", "Price sensitive"];
const reasons: HesitationReason[] = ["price", "shipping cost", "trust/security", "comparing options", "stuck at form","size confusion"];
const states: IntentState[] = ["Idle", "Browsing", "Hesitating", "Buying", "Converted", "Lost"];

/** Deterministic pseudo-random so SSR and client agree. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function buildSessions(count = 42): Session[] {
  const r = rng(97);
  return Array.from({ length: count }, (_, i) => {
    const state = states[Math.floor(r() * states.length)];
    const hesitating = state === "Hesitating" || state === "Lost";
    return {
      id: `#${7000 + Math.floor(r() * 2900)}`,
      entryPage: pages[Math.floor(r() * pages.length)],
      state,
      reason: hesitating ? reasons[Math.floor(r() * reasons.length)] : undefined,
      confidence: 55 + Math.floor(r() * 44),
      timeOnSite: `${Math.floor(r() * 12)}m ${Math.floor(r() * 59)}s`,
      device: (["Desktop", "Mobile", "Tablet"] as const)[Math.floor(r() * 3)],
      location: locations[Math.floor(r() * locations.length)],
      source: sources[Math.floor(r() * sources.length)],
      segment: segments[Math.floor(r() * segments.length)],
      lastAction: ["Scrolled to shipping info", "Hovered checkout button", "Opened size guide", "Added to cart", "Idle on payment step", "Compared two products"][Math.floor(r() * 6)],
      value: Math.round((30 + r() * 260) * 100) / 100,
      intervention: r() > 0.5 ? ["Free shipping nudge", "Price-match reassurance", "Exit-intent offer"][Math.floor(r() * 3)] : undefined,
      outcome: r() > 0.6 ? (["Converted", "Dismissed", "No response", "Pending"] as const)[Math.floor(r() * 4)] : undefined,
      _i: i,
    } as Session;
  });
}

export const stateTone: Record<IntentState, "accent" | "success" | "warn" | "danger" | "muted"> = {
  Idle: "muted",
  Browsing: "accent",
  Hesitating: "warn",
  Buying: "accent",
  Converted: "success",
  Lost: "danger",
};

export type Intervention = {
  id: string;
  name: string;
  trigger: string;
  status: "Active" | "Paused" | "Draft";
  shown: number;
  converted: number;
  recovered: number;
  template: string;
  variants: number;
};

export const interventions: Intervention[] = [
  { id: "iv_01", name: "Free shipping nudge", trigger: "Hesitating · shipping cost · >20s on cart", status: "Active", shown: 4820, converted: 731, recovered: 48210.5, template: "Corner card", variants: 2 },
  { id: "iv_02", name: "Cart abandonment save", trigger: "Exit intent · cart value > $60", status: "Active", shown: 3120, converted: 402, recovered: 31940.0, template: "Center modal", variants: 1 },
  { id: "iv_03", name: "Price-match reassurance", trigger: "Hesitating · price · comparing options", status: "Active", shown: 2610, converted: 288, recovered: 21875.25, template: "Slide-in", variants: 3 },
  { id: "iv_04", name: "Trust badge boost", trigger: "Hesitating · trust/security · checkout", status: "Paused", shown: 980, converted: 71, recovered: 5320.0, template: "Banner", variants: 1 },
  { id: "iv_05", name: "First-time welcome", trigger: "New visitor · 3+ page views", status: "Draft", shown: 0, converted: 0, recovered: 0, template: "Inline embed", variants: 1 },
];

export const templates = [
  { id: "t1", name: "Free shipping nudge", tone: "success" as const, headline: "You're $12 from free shipping", body: "Add one more item and we'll cover the delivery." },
  { id: "t2", name: "Cart abandonment save", tone: "accent" as const, headline: "Still thinking it over?", body: "We saved your cart. Finish up in one tap." },
  { id: "t3", name: "Price-match reassurance", tone: "accent" as const, headline: "We price-match. Always.", body: "Find it cheaper within 30 days and we refund the difference." },
  { id: "t4", name: "Social proof popup", tone: "success" as const, headline: "1,284 people bought this week", body: "Rated 4.8/5 by verified buyers." },
  { id: "t5", name: "Exit-intent offer", tone: "warn" as const, headline: "Before you go — 10% off", body: "Use code STAY10 at checkout. Expires in 10 minutes." },
  { id: "t6", name: "First-time visitor welcome", tone: "accent" as const, headline: "Welcome to the shop", body: "Here's 5% off your first order." },
];

export const revenueSeries = [
  { label: "Mon", claarvia: 3120, baseline: 2100 },
  { label: "Tue", claarvia: 4210, baseline: 2380 },
  { label: "Wed", claarvia: 3890, baseline: 2290 },
  { label: "Thu", claarvia: 5240, baseline: 2610 },
  { label: "Fri", claarvia: 6480, baseline: 3120 },
  { label: "Sat", claarvia: 7120, baseline: 3480 },
  { label: "Sun", claarvia: 6890, baseline: 3310 },
];

export const hesitationBreakdown = [
  { reason: "Price", value: 34 },
  { reason: "Shipping cost", value: 26 },
  { reason: "Comparing options", value: 18 },
  { reason: "Trust / security", value: 13 },
  { reason: "Stuck at form", value: 9 },
  { reason: "Size confusion", value: 7 },
];

export const funnel = [
  { stage: "Idle", value: 18420 },
  { stage: "Browsing", value: 11240 },
  { stage: "Hesitating", value: 4810 },
  { stage: "Converted", value: 2190 },
  { stage: "Lost", value: 2620 },
];

export const segmentsList = [
  { id: "sg1", name: "High-intent returning", rule: "Returning visitor AND pricing page views ≥ 2 in last 7d", members: 4820, interventions: ["Price-match reassurance"] },
  { id: "sg2", name: "Cart abandoners", rule: "Cart value > $0 AND exit intent detected", members: 2310, interventions: ["Cart abandonment save", "Free shipping nudge"] },
  { id: "sg3", name: "Price sensitive", rule: "Hesitation reason = price in last 30d", members: 1975, interventions: ["Price-match reassurance"] },
  { id: "sg4", name: "First-time visitors", rule: "New visitor AND sessions = 1", members: 9140, interventions: [] },
];

export const integrationsList = [
  { id: "shopify", name: "Shopify", desc: "Sync orders, carts and checkout events.", connected: true },
  { id: "woo", name: "WooCommerce", desc: "Track WooCommerce storefront sessions.", connected: false },
  { id: "magento", name: "Magento", desc: "Adobe Commerce event stream.", connected: false },
  { id: "snippet", name: "Custom JS snippet", desc: "Universal tracking for any storefront.", connected: true },
  { id: "zapier", name: "Zapier", desc: "Pipe recovered-sale events anywhere.", connected: false },
  { id: "slack", name: "Slack notifications", desc: "Alert a channel on high-value hesitation.", connected: true },
  { id: "klaviyo", name: "Klaviyo", desc: "Trigger flows from hesitation signals.", connected: false },
  { id: "ga4", name: "GA4", desc: "Send Claarvia events to Analytics.", connected: true },
];

export const teamMembers = [
  { id: "u1", name: "Ava Mercer", email: "ava@claarvia.io", role: "Owner", status: "Active", initials: "AM" },
  { id: "u2", name: "Nils Vogt", email: "nils@claarvia.io", role: "Admin", status: "Active", initials: "NV" },
  { id: "u3", name: "Priya Raman", email: "priya@claarvia.io", role: "Editor", status: "Active", initials: "PR" },
  { id: "u4", name: "Tom Beck", email: "tom@partner.co", role: "Viewer", status: "Pending", initials: "TB" },
];

export const activityLog = [
  { id: "a1", who: "Priya Raman", what: "published intervention “Free shipping nudge” v4", when: "2026-08-30 14:22" },
  { id: "a2", who: "Nils Vogt", what: "paused intervention “Trust badge boost”", when: "2026-08-30 11:07" },
  { id: "a3", who: "Ava Mercer", what: "invited tom@partner.co as Viewer", when: "2026-08-29 17:44" },
  { id: "a4", who: "Priya Raman", what: "created segment “Price sensitive”", when: "2026-08-29 09:12" },
];

export const plans = [
  { name: "Starter", price: 149, sessions: 50000, features: ["Hesitation detection", "3 interventions", "Email support"] },
  { name: "Growth", price: 490, sessions: 250000, features: ["Unlimited interventions", "A/B testing", "Slack + Klaviyo", "Priority support"] },
  { name: "Scale", price: 1290, sessions: 1000000, features: ["Custom models", "Dedicated CSM", "SSO & audit log", "99.9% SLA"] },
];

export const invoices = [

  { id: "INV-2026-08", date: "2026-08-01", amount: 499.0, status: "Paid" },
  { id: "INV-2026-07", date: "2026-07-01", amount: 499.0, status: "Paid" },
  { id: "INV-2026-06", date: "2026-06-01", amount: 299.0, status: "Paid" },
  { id: "INV-2026-05", date: "2026-05-01", amount: 299.0, status: "Paid" },
];

export const feedTemplates = [
  { kind: "hesitate" as const, text: "is hesitating at checkout", tag: "price" },
  { kind: "hesitate" as const, text: "paused at shipping cost", tag: "shipping cost" },
  { kind: "intervene" as const, text: "shown “Free shipping nudge”", tag: "intervention" },
  { kind: "intervene" as const, text: "shown “Price-match reassurance”", tag: "intervention" },
  { kind: "convert" as const, text: "converted", tag: "recovered" },
  { kind: "browse" as const, text: "started comparing two products", tag: "comparing options" },
];
