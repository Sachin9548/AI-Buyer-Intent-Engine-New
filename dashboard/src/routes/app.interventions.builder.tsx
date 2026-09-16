import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  History,
  Monitor,
  Play,
  Send,
  Smartphone,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

import { PageHeader } from "@/components/cv/Shell";
import { Modal } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  Field,
  GlassCard,
  IconButton,
  InlineHelp,
  Input,
  Num,
  ProgressBar,
  SectionTitle,
  Select,
  Stepper,
  Tabs,
  Toggle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { templates } from "@/lib/claarvia-data";
import { TemplatePreview } from "./app.interventions.index";

export const Route = createFileRoute("/app/interventions/builder")({
  validateSearch: z.object({ template: z.string().optional() }).parse,
  head: () => ({
    meta: [
      { title: "Intervention builder — Claarvia" },
      {
        name: "description",
        content:
          "A guided four-step builder: when to trigger, who sees it, what they see, review and publish.",
      },
      { property: "og:title", content: "Intervention builder — Claarvia" },
      { property: "og:description", content: "Design the nudge that saves the sale." },
    ],
  }),
  component: Builder,
});

type Condition = { id: number; state: string; reason: string; seconds: string; join: "AND" | "OR" };

const STATES = ["Hesitating", "Browsing", "Buying", "Idle", "About to leave"];
const REASONS = ["Price", "Shipping cost", "Trust / security", "Comparing options", "Stuck at form", "Anything"];
const SECONDS = ["10 seconds", "20 seconds", "30 seconds", "60 seconds", "2 minutes"];
const LAYOUTS = ["Corner card", "Center modal", "Banner", "Slide-in", "Inline embed"] as const;
const TONES = {
  accent: "Neutral (violet→cyan)",
  success: "Positive (green)",
  warn: "Urgency (amber)",
} as const;

const STEPS = ["When to trigger", "Who sees it", "What they see", "Review & publish"] as const;

const AI_SUGGESTIONS = {
  Direct: { headline: "Shipping's on us over $75", body: "You're $12 away. Add one more item and we'll cover delivery." },
  Friendly: { headline: "Almost there — free shipping is close", body: "Pop one more thing in the bag and delivery is free." },
  Urgency: { headline: "Free shipping ends in 09:58", body: "Finish your order now and skip the delivery fee." },
} as const;

const VERSIONS = [
  { v: "v4", when: "2026-08-30 14:22", who: "Priya Raman", note: "Headline tightened" },
  { v: "v3", when: "2026-08-27 10:04", who: "Nils Vogt", note: "Added urgency timer" },
  { v: "v2", when: "2026-08-21 16:38", who: "Priya Raman", note: "Corner card layout" },
];

/** Sensible starter values so nobody stares at a blank form. */
const DEFAULTS = {
  headline: "Wait — shipping is on us",
  body: "Finish your order in the next few minutes and we'll cover delivery.",
  cta: "Keep my cart",
};

function Builder() {
  const navigate = useNavigate();
  const { template } = Route.useSearch();
  const seed = templates.find((t) => t.id === template);

  const [step, setStep] = useState(0);
  const [name, setName] = useState(seed?.name ?? "Free shipping nudge");
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, state: "Hesitating", reason: "Shipping cost", seconds: "30 seconds", join: "AND" },
  ]);
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number]>("Corner card");
  const [tone, setTone] = useState<keyof typeof TONES>(seed?.tone ?? "accent");
  const [headline, setHeadline] = useState(seed?.headline ?? DEFAULTS.headline);
  const [body, setBody] = useState(seed?.body ?? DEFAULTS.body);
  const [cta, setCta] = useState(DEFAULTS.cta);
  const [countdown, setCountdown] = useState(false);
  const [discount, setDiscount] = useState("");
  const [preview, setPreview] = useState<"Desktop" | "Mobile">("Desktop");
  const [mobileView, setMobileView] = useState<"Settings" | "Preview">("Settings");
  const [segment, setSegment] = useState("All visitors");
  const [device, setDevice] = useState("All devices");
  const [visitorType, setVisitorType] = useState("New and returning");
  const [source, setSource] = useState("Any source");
  const [split, setSplit] = useState(50);
  const [variants, setVariants] = useState(2);
  const [frequency, setFrequency] = useState("Once per visitor per 24h");
  const [simulate, setSimulate] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [status, setStatus] = useState<"Draft" | "Active">("Draft");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiAsk, setAiAsk] = useState("");
  const [aiReply, setAiReply] = useState<string | null>(null);

  const addCondition = () =>
    setConditions((c) => [
      ...c,
      { id: Date.now(), state: "Browsing", reason: "Price", seconds: "20 seconds", join: "AND" },
    ]);

  const set = (id: number, patch: Partial<Condition>) =>
    setConditions((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const plainSummary = useMemo(() => {
    const when = conditions
      .map(
        (c, i) =>
          `${i ? ` ${c.join.toLowerCase()} ` : ""}a visitor looks ${c.state.toLowerCase()}${
            c.reason === "Anything" ? "" : ` because of ${c.reason.toLowerCase()}`
          } for more than ${c.seconds}`,
      )
      .join("");
    return `This will show a ${layout.toLowerCase()} to ${segment.toLowerCase()} on ${device.toLowerCase()} when ${when}.`;
  }, [conditions, layout, segment, device]);

  const reach = useMemo(
    () => 400 + conditions.length * 120 + (segment === "All visitors" ? 900 : 260),
    [conditions.length, segment],
  );

  const askAi = () => {
    if (!aiAsk.trim()) return;
    const q = aiAsk.toLowerCase();
    if (q.includes("urgent")) {
      setHeadline("Only a few minutes left — shipping is on us");
      setBody("Complete your order now and we'll cover delivery.");
      setAiReply("Done — I made the wording more urgent and applied it to the preview.");
      cvToast.success("Copy updated", "Made it feel more urgent");
    } else if (q.includes("trigger") || q.includes("explain")) {
      setAiReply(plainSummary);
    } else if (q.includes("short")) {
      setHeadline("Shipping's on us");
      setBody("Finish your order and we'll cover delivery.");
      setAiReply("Shortened the headline and body — see the live preview.");
      cvToast.success("Copy updated", "Shorter wording applied");
    } else {
      setAiReply(
        "Here's a suggestion: lead with the benefit ('Shipping is on us') and keep the body to one short sentence about what to do next.",
      );
    }
    setAiAsk("");
  };

  /* ---------------------------------------------------------- step panels */

  const settingsPanel = (
    <div className="space-y-4">
      {step === 0 ? (
        <>
          <GlassCard className="p-5">
            <Field label="Intervention name">
              <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
            </Field>
            <InlineHelp>Only you and your team see this name — visitors never do.</InlineHelp>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle
              title="When should this appear?"
              subtitle="Read it as a sentence — change any highlighted word."
              action={
                <Button size="sm" onClick={addCondition}>
                  Add rule
                </Button>
              }
            />
            <ul className="mt-4 space-y-3">
              {conditions.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                  className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-3"
                >
                  {i > 0 ? (
                    <div className="mb-2">
                      <Tabs
                        size="sm"
                        tabs={["AND", "OR"] as const}
                        value={c.join}
                        onChange={(v) => set(c.id, { join: v })}
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>When a visitor is</span>
                    <Select value={c.state} aria-label="Intent state" onChange={(e) => set(c.id, { state: e.target.value })}>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Select>
                    <span>because of</span>
                    <Select value={c.reason} aria-label="Reason" onChange={(e) => set(c.id, { reason: e.target.value })}>
                      {REASONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Select>
                    <span>for more than</span>
                    <Select value={c.seconds} aria-label="Duration" onChange={(e) => set(c.id, { seconds: e.target.value })}>
                      {SECONDS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Select>
                    {conditions.length > 1 ? (
                      <span className="ml-auto">
                        <IconButton
                          label="Remove this rule"
                          onClick={() => setConditions((prev) => prev.filter((p) => p.id !== c.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </span>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ul>
            <InlineHelp>
              This decides when Claarvia shows the popup — for example, only to visitors who seem
              stuck on price.
            </InlineHelp>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle title="How often" subtitle="Avoid showing the same nudge too many times." />
            <div className="mt-4">
              <Field label="Frequency cap">
                <Select className="w-full" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option>Once per visitor per 24h</option>
                  <option>Once per session</option>
                  <option>Max 3 times per week</option>
                </Select>
              </Field>
            </div>
            <InlineHelp>A visitor who has already seen this won't see it again until then.</InlineHelp>
          </GlassCard>
        </>
      ) : null}

      {step === 1 ? (
        <>
          <GlassCard className="p-5">
            <SectionTitle title="Who is eligible" subtitle="Narrow it down, or leave it open to everyone." />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Audience">
                <Select className="w-full" value={segment} onChange={(e) => setSegment(e.target.value)}>
                  <option>All visitors</option>
                  <option>High-intent returning</option>
                  <option>Cart abandoners</option>
                  <option>Price sensitive</option>
                </Select>
              </Field>
              <Field label="Device">
                <Select className="w-full" value={device} onChange={(e) => setDevice(e.target.value)}>
                  <option>All devices</option>
                  <option>Desktop</option>
                  <option>Mobile</option>
                </Select>
              </Field>
              <Field label="Visitor type">
                <Select className="w-full" value={visitorType} onChange={(e) => setVisitorType(e.target.value)}>
                  <option>New and returning</option>
                  <option>New only</option>
                  <option>Returning only</option>
                </Select>
              </Field>
              <Field label="Traffic source">
                <Select className="w-full" value={source} onChange={(e) => setSource(e.target.value)}>
                  <option>Any source</option>
                  <option>google / cpc</option>
                  <option>instagram</option>
                  <option>klaviyo / email</option>
                </Select>
              </Field>
              <Field label="Geography">
                <Input placeholder="US, CA, DE…" className="w-full" />
              </Field>
            </div>
            <InlineHelp>
              These filters decide which shoppers are allowed to see it — everyone else is skipped.
            </InlineHelp>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle title="Split test" subtitle={`${variants} versions running side by side`} />
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Version A</span>
                  <span className="num text-foreground">
                    {split}% / {100 - split}%
                  </span>
                  <span>Version B</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={split}
                  aria-label="Traffic split"
                  onChange={(e) => setSplit(Number(e.target.value))}
                  className="mt-2 h-11 w-full accent-[#7C6CFF]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { v: "A", conv: 6.8, lift: 0 },
                  { v: "B", conv: 7.6, lift: 12.4 },
                ].map((x) => (
                  <div key={x.v} className="rounded-xl bg-[rgba(255,255,255,0.05)] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground">Version {x.v}</span>
                      {x.lift ? <Chip tone="success">winning · 93% conf.</Chip> : null}
                    </div>
                    <Num value={x.conv} suffix="% CVR" decimals={1} className="mt-1 block text-lg text-foreground" />
                    <ProgressBar className="mt-2" value={x.conv * 10} />
                  </div>
                ))}
              </div>
              <Button size="sm" onClick={() => setVariants((v) => v + 1)}>
                Add a version
              </Button>
            </div>
            <InlineHelp>
              Half your shoppers see one wording, half see the other — we tell you which wins.
            </InlineHelp>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle title="Scheduling" subtitle="When this may run." />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Start">
                <Input type="date" defaultValue="2026-09-01" className="w-full" />
              </Field>
              <Field label="End (optional)">
                <Input type="date" className="w-full" />
              </Field>
            </div>
            <label className="mt-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
              Wait 24h before showing again after someone dismisses it
              <Toggle checked onChange={() => undefined} label="Cooldown" />
            </label>
          </GlassCard>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <GlassCard className="p-5">
            <SectionTitle title="Wording" subtitle="Type here, or edit right on the preview." />
            <div className="mt-4 grid gap-3">
              <Field label="Headline">
                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full" />
              </Field>
              <Field label="Message">
                <Input value={body} onChange={(e) => setBody(e.target.value)} className="w-full" />
              </Field>
              <Field label="Button label">
                <Input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full" />
              </Field>
            </div>
            <InlineHelp>Short and specific works best — one benefit, one action.</InlineHelp>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle title="Look and placement" subtitle="Colors stay locked to your brand." />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Placement">
                <Select
                  className="w-full"
                  value={layout}
                  onChange={(e) => setLayout(e.target.value as (typeof LAYOUTS)[number])}
                >
                  {LAYOUTS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Tone">
                <Select
                  className="w-full"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as keyof typeof TONES)}
                >
                  {Object.entries(TONES).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Discount code (optional)">
                <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="STAY10" className="w-full" />
              </Field>
              <Field label="Image / GIF URL (optional)">
                <Input placeholder="https://cdn.store/…" className="w-full" />
              </Field>
            </div>
            <label className="mt-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
              Show a countdown timer
              <Toggle checked={countdown} onChange={setCountdown} label="Countdown" />
            </label>
            <InlineHelp>A countdown adds urgency — best used with a real, limited offer.</InlineHelp>
          </GlassCard>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <GlassCard glint className="p-5">
            <SectionTitle title="Here's what will happen" subtitle="Plain language, before it goes live." />
            <p className="mt-4 text-sm leading-relaxed text-foreground">{plainSummary}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Estimated reach:{" "}
              <Num value={reach} className="text-foreground" /> visitors per week.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="accent">{layout}</Chip>
              <Chip tone="muted">{segment}</Chip>
              <Chip tone="muted">{device}</Chip>
              <Chip tone="muted">{visitorType}</Chip>
              <Chip tone="muted">{source}</Chip>
              <Chip tone="muted">{frequency}</Chip>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle title="Final checks" subtitle="Everything below is ready." />
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Wording set: “{headline}”</li>
              <li>· Button says “{cta}”</li>
              <li>· {variants} versions split {split}% / {100 - split}%</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => setSimulate(true)}>
                <Play className="h-4 w-4" /> Preview as a real visitor
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setStatus("Active");
                  cvToast.success("Intervention published", `${name} is now live`);
                }}
              >
                Publish now
              </Button>
            </div>
          </GlassCard>
        </>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        <Button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
            Next: {STEPS[step + 1]} <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => navigate({ to: "/app/interventions" })}>All interventions</Button>
        )}
      </div>
    </div>
  );

  const previewPanel = (
    <GlassCard className="p-5 xl:sticky xl:top-24">
      <SectionTitle
        title="Live preview"
        subtitle="Always shows exactly what a shopper will see."
        action={<Tabs tabs={["Desktop", "Mobile"] as const} value={preview} onChange={setPreview} size="sm" />}
      />
      <div
        className={
          preview === "Desktop"
            ? "mt-4 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(5,6,11,0.6)] p-4 sm:p-6"
            : "mx-auto mt-4 w-full max-w-[320px] rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(5,6,11,0.6)] p-4"
        }
      >
        <div className="mb-3 flex items-center gap-2 text-[10px] text-muted-foreground">
          {preview === "Desktop" ? <Monitor className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
          <span className="num truncate">store.northwind.com/checkout</span>
        </div>
        <motion.div
          key={`${layout}-${tone}-${preview}`}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={spring}
          className={
            layout === "Center modal"
              ? "mx-auto max-w-sm"
              : layout === "Banner"
                ? "w-full"
                : "ml-auto max-w-xs"
          }
        >
          <div className="glass rounded-xl p-4">
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              aria-label="Popup headline"
              className="w-full bg-transparent font-display text-base font-bold tracking-tight text-foreground outline-none sm:text-lg"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-label="Popup body"
              rows={2}
              className="mt-1 w-full resize-none bg-transparent text-xs text-muted-foreground outline-none"
            />
            {countdown ? <p className="num mt-2 text-sm text-warn">09:58 left</p> : null}
            {discount ? (
              <p className="num mt-2 rounded-lg border border-dashed border-[rgba(255,255,255,0.2)] px-2 py-1 text-xs text-foreground">
                {discount}
              </p>
            ) : null}
            <input
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              aria-label="CTA label"
              className={`mt-3 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none ${
                tone === "success"
                  ? "bg-success text-[#05060B]"
                  : tone === "warn"
                    ? "bg-warn text-[#05060B]"
                    : "grad-accent text-[#05060B]"
              }`}
              size={Math.max(8, cta.length)}
            />
          </div>
        </motion.div>
      </div>
      <InlineHelp>You can type straight onto the preview to change the wording.</InlineHelp>
    </GlassCard>
  );

  return (
    <>
      <PageHeader
        title="Intervention builder"
        description="Four short steps. The preview on the right always matches your settings."
        actions={
          <>
            <Chip tone={status === "Active" ? "success" : "muted"} dot>
              {status}
            </Chip>
            <Button variant="primary" onClick={() => setAiOpen(true)}>
              <Sparkles className="h-4 w-4" /> Ask AI
            </Button>
            <Button onClick={() => setShowVersions(true)}>
              <History className="h-4 w-4" /> History
            </Button>
            <Button onClick={() => cvToast.success("Saved as draft", name, () => cvToast.info("Draft restored"))}>
              Save draft
            </Button>
          </>
        }
      />

      <div className="mb-4">
        <Stepper steps={STEPS} current={step} onSelect={setStep} />
      </div>

      {/* mobile: settings / preview toggle */}
      <div className="mb-4 xl:hidden">
        <Tabs tabs={["Settings", "Preview"] as const} value={mobileView} onChange={setMobileView} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className={mobileView === "Preview" ? "hidden xl:block" : ""}>{settingsPanel}</div>
        <div className={mobileView === "Settings" ? "hidden xl:block" : ""}>{previewPanel}</div>
      </div>

      {/* AI assistant */}
      <Modal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        title="Ask AI"
        description="Get copy ideas, or just ask in your own words."
        width="max-w-2xl"
        footer={<Button onClick={() => setAiOpen(false)} variant="primary">Done</Button>}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(AI_SUGGESTIONS).map(([label, s]) => (
            <button
              key={label}
              onClick={() => {
                setHeadline(s.headline);
                setBody(s.body);
                cvToast.success("Copy applied", `${label} tone`);
              }}
              className="glass rounded-xl p-4 text-left transition-all duration-300 hover:border-[rgba(124,108,255,0.45)]"
            >
              <Chip tone="accent">{label}</Chip>
              <p className="mt-2 font-display text-sm text-foreground">{s.headline}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Input
            value={aiAsk}
            onChange={(e) => setAiAsk(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") askAi();
            }}
            placeholder="e.g. make this feel more urgent"
            className="w-full"
          />
          <Button variant="primary" onClick={askAi} aria-label="Send request">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <AnimatePresence>
          {aiReply ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass mt-3 rounded-xl p-3 text-sm leading-relaxed text-foreground"
            >
              {aiReply}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </Modal>

      {/* live visitor simulation */}
      <Modal
        open={simulate}
        onClose={() => setSimulate(false)}
        title="Preview as live visitor"
        description="Exactly what a hesitating shopper sees on your storefront."
        width="max-w-2xl"
        footer={<Button onClick={() => setSimulate(false)}>Close</Button>}
      >
        <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(5,6,11,0.7)] p-4 sm:p-8">
          <div className="mx-auto max-w-sm">
            <TemplatePreview tone={tone} headline={headline} body={body} cta={cta} />
          </div>
        </div>
      </Modal>

      {/* version history */}
      <Modal
        open={showVersions}
        onClose={() => setShowVersions(false)}
        title="Version history"
        footer={<Button onClick={() => setShowVersions(false)}>Close</Button>}
      >
        <ul className="space-y-2">
          {VERSIONS.map((v) => (
            <li
              key={v.v}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[rgba(255,255,255,0.05)] p-3"
            >
              <div className="min-w-0">
                <p className="text-sm text-foreground">
                  <span className="num mr-2 text-violet">{v.v}</span>
                  {v.note}
                </p>
                <p className="num text-xs text-muted-foreground">
                  {v.when} · {v.who}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  cvToast.success("Reverted", `Restored ${v.v}`);
                  setShowVersions(false);
                }}
              >
                Revert
              </Button>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
