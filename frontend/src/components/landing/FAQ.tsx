"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeader } from "./primitives";

const faqs = [
  { q: "How is Alistine different from Google Analytics or PostHog?", a: "Traditional analytics report on what happened. Alistine explains why and recommends what to do. Intent, friction and predictions are first-class — not buried in dashboards." },
  { q: "How long does setup take?", a: "Add one snippet. The dashboard begins assembling itself within 60 seconds. Most teams see their first AI insight inside 10 minutes." },
  { q: "Is Alistine privacy-friendly?", a: "Yes. GDPR, CCPA and SOC 2 by default. A cookieless mode is included, and all sensitive fields are auto-redacted before models touch them." },
  { q: "Can the AI act on its own?", a: "Optionally. Live nudges, segment routing and CTA experiments can run autonomously with policies and guardrails you set." },
  { q: "What about my existing stack?", a: "We integrate with 120+ tools (Segment, Mixpanel, HubSpot, Salesforce, Shopify, Stripe, Vercel, and more). Webhooks and SDKs are available for everything else." },
  { q: "Do you offer a free trial?", a: "Yes — 14 days, full Studio plan, no credit card required." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader eyebrow="FAQ" title={<>Questions, answered.</>} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card px-5 transition-colors hover:border-primary/30"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-lg hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
