import { a as __toESM } from "../_runtime.mjs";
import { n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as CircleDollarSign, D as Boxes, E as Brain, O as BadgeCheck, S as CircleX, T as ChevronDown, _ as Globe, a as Store, b as Cpu, c as ShoppingBag, d as ScanLine, f as Plug, g as Layers, h as Lock, i as Timer, k as ArrowRight, l as ShieldCheck, m as MousePointerClick, n as Truck, o as Sparkles, p as Play, r as TrendingUp, s as ShoppingCart, t as WandSparkles, u as Server, v as Gauge, w as CircleCheck, x as CodeXml, y as Eye } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PzHPbcvF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Aurora({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute inset-0 overflow-hidden", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 aurora-bg animate-aurora-pan" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-pattern opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" })
		]
	});
}
var beats = [
	{
		t: "They came.",
		s: "A visitor lands. Curious."
	},
	{
		t: "They explored.",
		s: "Three pages. A pricing tab. A scroll."
	},
	{
		t: "They hesitated.",
		s: "The cursor pauses near the CTA."
	},
	{
		t: "They left.",
		s: "No event fired. No reason given."
	}
];
function ScrollStory() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"]
	});
	const beatIndex = useTransform(scrollYProgress, [
		0,
		.13,
		.27,
		.4,
		.55
	], [
		0,
		1,
		2,
		3,
		3.99
	]);
	const pause = useTransform(scrollYProgress, [.55, .7], [0, 1]);
	const glow = useTransform(scrollYProgress, [.7, .85], [0, 1]);
	const reveal = useTransform(scrollYProgress, [.85, 1], [0, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "relative",
		style: { height: "800vh" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 flex h-screen items-center justify-center overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aurora, { className: "opacity-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: pause },
					className: "absolute inset-0 bg-background"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: glow },
					className: "absolute inset-0",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container relative z-10 px-6 text-center",
					children: [
						beats.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeatLine, {
							index: i,
							progress: beatIndex,
							text: b.t,
							sub: b.s
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: { opacity: glow },
							className: "absolute inset-x-0 top-1/2 -translate-y-1/2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-foreground/90 sm:text-5xl",
								children: "Until Claarvia started watching."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: {
								opacity: reveal,
								y: useTransform(reveal, [0, 1], [40, 0])
							},
							className: "absolute inset-x-0 bottom-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.2em] text-primary",
									children: "Dashboard assembling…"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid grid-cols-6 gap-2",
									children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: false,
										style: { opacity: useTransform(reveal, [0, 1], [0, 1]) },
										className: "h-3 rounded-full bg-gradient-primary"
									}, i))
								})]
							})
						})
					]
				})
			]
		})
	});
}
function BeatLine({ index, progress, text, sub }) {
	const opacity = useTransform(progress, [
		index - .5,
		index,
		index + .5
	], [
		0,
		1,
		0
	]);
	const y = useTransform(progress, [
		index - .5,
		index,
		index + .5
	], [
		40,
		0,
		-40
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		style: {
			opacity,
			y
		},
		className: "absolute inset-x-0 top-1/2 -translate-y-1/2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base",
			children: sub
		})]
	});
}
function useReveal() {
	(0, import_react.useEffect)(() => {
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -60px 0px"
		});
		document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}
function Section({ id, eyebrow, title, sub, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: `relative py-24 sm:py-32 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [(eyebrow || title || sub) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-14 max-w-3xl text-center reveal",
				children: [
					eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), eyebrow]
					}),
					title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-balance text-3xl font-semibold tracking-tight sm:text-5xl",
						style: { fontFamily: "var(--font-display)" },
						children: title
					}),
					sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-pretty text-base text-muted-foreground sm:text-lg",
						children: sub
					})
				]
			}), children]
		})
	});
}
function Landing() {
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ambient text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollStory, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Problem, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionEngine, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Walkthrough, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSurface, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VsAnalytics, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueImpact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Integrations, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Security, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative inline-flex h-7 w-7 items-center justify-center rounded-lg glass-strong",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-lg opacity-70 blur-md bg-primary/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "relative h-3.5 w-3.5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold tracking-tight",
						style: { fontFamily: "var(--font-display)" },
						children: "Claarvia"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [
						{
							href: "#how",
							label: "How it works"
						},
						{
							href: "#engine",
							label: "AI engine"
						},
						{
							href: "#dashboard",
							label: "Dashboard"
						},
						{
							href: "#vs",
							label: "vs. Analytics"
						},
						{
							href: "#faq",
							label: "FAQ"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#book",
					className: "group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]",
					style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.1), 0 8px 40px oklch(0.78 0.16 288 / 0.35)" },
					children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 opacity-[0.15]",
				style: {
					backgroundImage: "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[46%] -translate-y-8 lg:block",
				style: { transform: "translateY(-2rem)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full flow-line opacity-60" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary pulse-glow" }), "Autonomous decision-intelligence for commerce"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
								style: { fontFamily: "var(--font-display)" },
								children: [
									"Know ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: "why"
									}),
									" visitors hesitate — and convert them before they leave."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg text-muted-foreground",
								children: "Claarvia watches visitor behavior, detects hesitation in real time, and triggers the right intervention before they leave — automatically."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#book",
									className: "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
									style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 60px oklch(0.78 0.16 288 / 0.45)" },
									children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#engine",
									className: "group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative inline-flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-primary/70 pulse-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative m-auto h-1.5 w-1.5 rounded-full bg-primary" })]
									}), "Watch AI in action"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }),
										children: "Shopify & WooCommerce"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }),
										children: "Cookieless mode"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
										children: "GDPR-ready"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3.5 w-3.5" }),
										children: "Live in 1 day"
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDashboardTile, {})
				})]
			})
		]
	});
}
function TrustChip({ icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary/80",
			children: icon
		}), children]
	});
}
function HeroDashboardTile() {
	const seq = (0, import_react.useMemo)(() => [
		64,
		71,
		66,
		78,
		82,
		74,
		69,
		76,
		84,
		88,
		81,
		73
	], []);
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setI((v) => (v + 1) % seq.length), 1400);
		return () => clearInterval(id);
	}, [seq.length]);
	const score = seq[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative reveal float-y",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute -inset-8 -z-10 rounded-[36px] opacity-70 blur-3xl",
			style: { background: "conic-gradient(from 210deg, oklch(0.5 0.22 288 / 0.55), oklch(0.5 0.2 250 / 0.35), transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-strong rounded-2xl p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.75_0.18_150/0.8)]" }), "Live intent · today"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Claarvia"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Recovered today",
						value: "$18,420",
						delta: "+12.4%",
						hint: "Revenue attributed to sessions where a Claarvia intervention preceded checkout."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Avg. nudge",
						value: "6.1%",
						delta: "capped",
						tone: "neutral",
						hint: "Average discount offered. Capped by your margin rules — Claarvia only spends what it must to convert."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl glass p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Intent score · Visitor #8412" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, { text: "0–100 read of how likely this visitor is to buy right now, updated every second from live behavior signals." })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
									title: "How sure Claarvia is about the classification. Below the threshold, no intervention fires.",
									children: "Confidence 92%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tick text-2xl font-semibold tracking-tight",
									style: { fontFamily: "var(--font-display)" },
									children: score
								}, score)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full transition-[width] duration-700",
								style: {
									width: `${score}%`,
									background: "linear-gradient(90deg, oklch(0.75 0.18 288), oklch(0.72 0.19 250))",
									boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Idle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Browsing" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hesitating" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Buying" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: [
						{
							t: "00:02",
							label: "Visitor #8412 · price hover ×3",
							tone: "warn"
						},
						{
							t: "00:03",
							label: "Hesitation classified: price shock",
							tone: "warn"
						},
						{
							t: "00:04",
							label: "Intervention fired: capped 6% nudge",
							tone: "ok"
						},
						{
							t: "00:07",
							label: "Checkout started · +$184 recovered",
							tone: "good"
						}
					].map((e, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-lg glass px-3 py-2 text-xs",
						style: { animation: `tick 0.5s ease-out ${idx * 120}ms both` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 text-muted-foreground",
								children: e.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${e.tone === "warn" ? "bg-amber-400" : e.tone === "ok" ? "bg-primary" : "bg-emerald-400"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: e.label
							})
						]
					}, idx))
				})
			]
		})]
	});
}
function MiniStat({ label, value, delta, tone = "up", hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl glass p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, { text: hint })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xl font-semibold tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: value
			}),
			delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-1 text-[11px] ${tone === "up" ? "text-emerald-300" : "text-muted-foreground"}`,
				children: delta
			})
		]
	});
}
function Hint({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: text,
		"aria-label": text,
		className: "inline-flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-white/15 text-[9px] leading-none text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground",
		children: "?"
	});
}
function Problem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "The problem",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"98% of your visitors leave.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "None of them tell you why."
			})
		] }),
		sub: "Behind every drop-off is a human, not a funnel step. There are only five reasons carts get abandoned — and none of them show up in your analytics on time.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				{
					icon: CircleDollarSign,
					title: "Price shock",
					body: "Repeated price hovers, jump-back to product tile."
				},
				{
					icon: Truck,
					title: "Shipping surprise",
					body: "Cart abandoned at the shipping step."
				},
				{
					icon: BadgeCheck,
					title: "Trust doubt",
					body: "Dwell on reviews, brand-name Google search opened."
				},
				{
					icon: Boxes,
					title: "Size / fit doubt",
					body: "Bounces between variants, opens the size chart twice."
				},
				{
					icon: Layers,
					title: "Decision fatigue",
					body: "10+ product views, no cart action, slowing scroll."
				}
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-primary/30",
				style: { transitionDelay: `${i * 60}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100",
						style: { background: "radial-gradient(closest-side, oklch(0.78 0.16 288 / 0.35), transparent)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-5 w-5 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base font-semibold",
						style: { fontFamily: "var(--font-display)" },
						children: it.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: it.body
					})
				]
			}, it.title))
		})
	});
}
function DecisionEngine() {
	const frames = (0, import_react.useMemo)(() => [
		{
			signal: "Cursor drift toward close-tab",
			confidence: 62,
			intent: "Exit imminent",
			hesitation: "—",
			action: "Observe",
			lift: 0
		},
		{
			signal: "3rd price re-check in 8s",
			confidence: 81,
			intent: "Purchase intent, blocked",
			hesitation: "Price shock",
			action: "Cap 4% nudge · 12s",
			lift: 14
		},
		{
			signal: "Reviews dwell 11s · brand search opened",
			confidence: 88,
			intent: "Purchase intent, blocked",
			hesitation: "Trust doubt",
			action: "Surface reviews + guarantee",
			lift: 17
		},
		{
			signal: "Bounce between 3 sizes · size chart ×2",
			confidence: 92,
			intent: "Purchase intent, blocked",
			hesitation: "Size / fit doubt",
			action: "Inline fit guide · past-buyer note",
			lift: 22
		},
		{
			signal: "Cart abandoned at shipping step",
			confidence: 94,
			intent: "Purchase intent, blocked",
			hesitation: "Shipping surprise",
			action: "Free-ship threshold cue",
			lift: 19
		}
	], []);
	const [i, setI] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = setInterval(() => setI((v) => (v + 1) % frames.length), 3200);
		return () => clearInterval(id);
	}, [playing, frames.length]);
	const f = frames[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "engine",
		eyebrow: "Live AI decision engine",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Watch the AI ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient",
				children: "think"
			}),
			"."
		] }),
		sub: "Every second, on every visitor. Claarvia reads the signal, names the doubt, chooses the smallest intervention that still converts — and stays silent when confidence is low.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative reveal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl",
				style: { background: "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.4), transparent 70%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong overflow-hidden rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-white/5 px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400 pulse-glow" }), "claarvia · decision engine"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setPlaying((p) => !p),
							className: "inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: `h-3 w-3 ${playing ? "text-primary" : ""}` }), playing ? "Streaming" : "Paused"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 p-5 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-2 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl glass p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Signal detected"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "tick mt-2 text-base font-medium",
										style: { fontFamily: "var(--font-display)" },
										children: f.signal
									}, `sig-${i}`)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl glass p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase tracking-wider text-muted-foreground",
												children: "AI confidence"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "tick text-2xl font-semibold tabular-nums",
												style: { fontFamily: "var(--font-display)" },
												children: [f.confidence, "%"]
											}, `c-${i}`)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full transition-[width] duration-700",
												style: {
													width: `${f.confidence}%`,
													background: "linear-gradient(90deg, oklch(0.75 0.18 288), oklch(0.72 0.19 250))",
													boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)"
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 text-[11px] text-muted-foreground",
											children: "Below 85%, Claarvia does not intervene."
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-2 rounded-2xl glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-wider text-muted-foreground",
									children: "Reasoning cascade"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2",
									children: [
										{
											k: "Intent",
											v: f.intent,
											Icon: Brain
										},
										{
											k: "Hesitation",
											v: f.hesitation,
											Icon: ScanLine
										},
										{
											k: "Recommended action",
											v: f.action,
											Icon: WandSparkles
										}
									].map((row, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm",
										style: { animation: `tick 0.5s ease-out ${idx * 120}ms both` },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex h-7 w-7 items-center justify-center rounded-lg glass-strong",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(row.Icon, { className: "h-3.5 w-3.5 text-primary" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-32 text-[11px] uppercase tracking-wider text-muted-foreground",
												children: row.k
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 font-medium",
												children: row.v
											})
										]
									}, row.k))
								}, `r-${i}`)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-1 rounded-2xl p-4",
								style: {
									background: "linear-gradient(180deg, oklch(0.78 0.16 288 / 0.14), oklch(0.78 0.16 288 / 0.02))",
									border: "1px solid oklch(0.78 0.16 288 / 0.3)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-primary",
										children: "Expected lift"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "tick mt-2 text-4xl font-semibold tabular-nums text-gradient",
										style: { fontFamily: "var(--font-display)" },
										children: [
											"+",
											f.lift,
											"%"
										]
									}, `l-${i}`),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: "On this session, modeled from priors."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6 text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Outcome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-medium",
										children: f.lift === 0 ? "Stay silent" : "Fire intervention"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 border-t border-white/5 px-5 py-3",
						children: frames.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setI(idx);
								setPlaying(false);
							},
							"aria-label": `Frame ${idx + 1}`,
							className: `h-1 flex-1 rounded-full transition-all ${idx === i ? "bg-primary" : "bg-white/10 hover:bg-white/20"}`
						}, idx))
					})
				]
			})]
		})
	});
}
function Walkthrough() {
	const stages = (0, import_react.useMemo)(() => [
		{
			icon: MousePointerClick,
			label: "Visitor arrives",
			detail: "Anonymous session · no cookies required"
		},
		{
			icon: Eye,
			label: "Browses product",
			detail: "Scrolls, hovers, checks price twice"
		},
		{
			icon: Timer,
			label: "Hesitates",
			detail: "Cursor drifts to close-tab · dwell rises"
		},
		{
			icon: Brain,
			label: "AI detects hesitation",
			detail: "Reason classified: price shock · 92% confidence"
		},
		{
			icon: Cpu,
			label: "Decision engine evaluates",
			detail: "Smallest nudge that still converts"
		},
		{
			icon: WandSparkles,
			label: "Smart intervention",
			detail: "Capped 6% offer · shown for 12s"
		},
		{
			icon: ShoppingBag,
			label: "Visitor purchases",
			detail: "Checkout completed · margin protected"
		},
		{
			icon: TrendingUp,
			label: "Revenue recovered",
			detail: "+$184 · logged, attributed, learned from"
		}
	], []);
	const [active, setActive] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = setInterval(() => {
			setActive((a) => (a + 1) % stages.length);
		}, 1800);
		return () => clearInterval(id);
	}, [playing, stages.length]);
	const Active = stages[active].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Interactive walkthrough",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Watch a single visitor become revenue." }),
		sub: "One session, eight moments. Every step is what Claarvia actually does — not a metaphor.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 reveal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-2xl p-2",
					children: stages.map((s, i) => {
						const isActive = i === active;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setActive(i);
								setPlaying(false);
							},
							className: `relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg glass-strong transition-transform ${isActive ? "scale-105" : ""}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm font-medium",
									children: s.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] tabular-nums text-muted-foreground/70",
									children: ["0", i + 1]
								}),
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.78_0.16_288/0.8)]"
								})
							]
						}, s.label);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setPlaying((p) => !p),
					className: "mt-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: `h-3 w-3 ${playing ? "text-primary" : ""}` }), playing ? "Auto-playing" : "Play walkthrough"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-3 reveal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute -inset-10 -z-10 opacity-70 blur-3xl transition-all",
							style: { background: "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.35), transparent 70%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: [
									"Step ",
									active + 1,
									" of ",
									stages.length
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] tabular-nums text-muted-foreground",
								children: [
									"t = 0:0",
									active,
									"s"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tick mt-8 flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-16 w-16 items-center justify-center rounded-2xl glass",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Active, { className: "h-7 w-7 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-2xl font-semibold sm:text-3xl",
									style: { fontFamily: "var(--font-display)" },
									children: stages[active].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-md text-sm text-muted-foreground",
									children: stages[active].detail
								})
							]
						}, active),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 h-1 w-full overflow-hidden rounded-full bg-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full transition-[width] duration-500",
								style: {
									width: `${(active + 1) / stages.length * 100}%`,
									background: "linear-gradient(90deg, oklch(0.78 0.16 288), oklch(0.72 0.19 250))",
									boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Arrive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hesitate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decide" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Convert" })
							]
						})
					]
				})
			})]
		})
	});
}
function ProductSurface() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "dashboard",
		eyebrow: "Dashboard",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "One screen. Everything visible." }),
		sub: "Intent, hesitation and interventions in a single live view. No dashboards to stitch together, no CSVs to reconcile.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reveal relative rounded-3xl p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl",
				style: { background: "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.35), transparent 70%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-white/5 px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-3",
								children: "claarvia · store overview"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden gap-2 sm:flex",
						children: [
							"Today",
							"7d",
							"30d"
						].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-2.5 py-1 text-[11px] ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`,
							children: t
						}, t))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 p-5 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigStat, {
									label: "Recovered revenue",
									value: "$142,308",
									delta: "+18.4% vs. last 7d"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigStat, {
									label: "Hesitation caught",
									value: "24,196",
									delta: "83% classified"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigStat, {
									label: "Avg. nudge",
									value: "5.7%",
									delta: "capped at 10%",
									tone: "neutral"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl glass p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recovered revenue · 7 days" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-300",
									children: "▲ 18.4%"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeChart, {})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live visitors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-glow" }), "1,284 online"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: [
								{
									id: "#8412",
									stage: "Hesitating · price",
									act: "Cap 6% nudge"
								},
								{
									id: "#8408",
									stage: "Hesitating · fit",
									act: "Show size guide"
								},
								{
									id: "#8399",
									stage: "Buying",
									act: "No action"
								},
								{
									id: "#8391",
									stage: "Hesitating · trust",
									act: "Reviews overlay"
								},
								{
									id: "#8386",
									stage: "Hesitating · shipping",
									act: "Free-ship cue"
								}
							].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs",
								style: { animation: `tick 0.5s ease-out ${i * 100}ms both` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-12 text-muted-foreground",
										children: r.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 truncate",
										children: r.stage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary",
										children: r.act
									})
								]
							}, r.id))
						})]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-wrap justify-center gap-2 text-xs",
			children: [
				"Decision timeline",
				"Confidence score",
				"Intent heatmap",
				"Opportunity feed"
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full glass px-3 py-1.5 text-muted-foreground",
				children: c
			}, c))
		})]
	});
}
function BigStat({ label, value, delta, tone = "up" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl glass p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-2xl font-semibold tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: value
			}),
			delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-1 text-[11px] ${tone === "up" ? "text-emerald-300" : "text-muted-foreground"}`,
				children: delta
			})
		]
	});
}
function FakeChart() {
	const points = [
		12,
		22,
		18,
		34,
		28,
		46,
		52,
		44,
		60,
		66,
		58,
		78
	];
	const max = 80;
	const w = 560;
	const h = 140;
	const step = w / (points.length - 1);
	const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - v / max * h}`).join(" ");
	const area = `${path} L ${w} ${h} L 0 ${h} Z`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "h-32 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g1",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "oklch(0.78 0.16 288)",
					stopOpacity: "0.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "oklch(0.78 0.16 288)",
					stopOpacity: "0"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g2",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "oklch(0.78 0.16 288)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "oklch(0.72 0.19 250)"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: area,
				fill: "url(#g1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: path,
				fill: "none",
				stroke: "url(#g2)",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			})
		]
	});
}
function VsAnalytics() {
	const rows = [
		{
			r: "Tells you what happened",
			ga: true,
			cl: true,
			hj: true,
			op: true,
			cv: true
		},
		{
			r: "Tells you why a visitor hesitated",
			ga: false,
			cl: false,
			hj: "Partial",
			op: false,
			cv: true
		},
		{
			r: "Detects intent in real time",
			ga: false,
			cl: false,
			hj: false,
			op: false,
			cv: true
		},
		{
			r: "Acts inside the hesitation window",
			ga: false,
			cl: false,
			hj: false,
			op: "Test-based",
			cv: true
		},
		{
			r: "Protects margin (smallest nudge)",
			ga: false,
			cl: false,
			hj: false,
			op: false,
			cv: true
		},
		{
			r: "Time to first insight",
			ga: "Days",
			cl: "Hours",
			hj: "Hours",
			op: "Weeks",
			cv: "60s"
		}
	];
	const cell = (v) => {
		if (v === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary",
			children: "●"
		});
		if (v === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground/40",
			children: "—"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: v
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "vs",
		eyebrow: "vs. Traditional analytics",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Why Claarvia isn't another analytics tool." }),
		sub: "Google Analytics, Clarity, Hotjar and Optimizely report the past. Claarvia understands the present — and helps decide what to do next.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative reveal overflow-hidden rounded-2xl glass-strong",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-y-0 right-0 w-1/5",
				style: { background: "linear-gradient(180deg, oklch(0.78 0.16 288 / 0.14), transparent)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto no-scrollbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-6 py-4 font-medium" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium",
								children: "Google Analytics"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium",
								children: "MS Clarity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium",
								children: "Hotjar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium",
								children: "Optimizely"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium text-primary",
								children: "Claarvia"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "row-in border-t border-white/5",
						style: { animationDelay: `${i * 60}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-muted-foreground",
								children: r.r
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center",
								children: cell(r.ga)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center",
								children: cell(r.cl)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center",
								children: cell(r.hj)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center",
								children: cell(r.op)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center font-medium",
								children: cell(r.cv)
							})
						]
					}, r.r)) })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-center text-sm text-muted-foreground reveal",
			children: "Not a replacement. A layer above — the one that actually moves revenue."
		})]
	});
}
function RevenueImpact() {
	const [visitors, setVisitors] = (0, import_react.useState)(12e4);
	const [aov, setAov] = (0, import_react.useState)(85);
	const [conv, setConv] = (0, import_react.useState)(2.1);
	const { baseline, recovered, uplift } = (0, import_react.useMemo)(() => {
		const baseline = visitors * (conv / 100) * aov;
		const recovered = visitors * (1 - conv / 100) * .11 * (aov * .96);
		return {
			baseline,
			recovered,
			uplift: recovered / Math.max(1, baseline) * 100
		};
	}, [
		visitors,
		aov,
		conv
	]);
	const fmt = (n) => n.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Revenue impact",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "The same visitor. Two very different endings." }),
		sub: "Nothing changes on your side. What changes is whether the store notices — and responds — while the visitor is still there.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowColumn, {
				title: "Without Claarvia",
				badge: "Silent drop-off",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
				items: [
					{
						label: "Visitor arrives",
						tone: "n"
					},
					{
						label: "Gets confused / hesitates",
						tone: "n"
					},
					{
						label: "No signal, no response",
						tone: "b"
					},
					{
						label: "Leaves silently",
						tone: "b"
					},
					{
						label: "Revenue lost",
						tone: "b"
					}
				],
				tone: "dim"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowColumn, {
				title: "With Claarvia",
				badge: "Revenue recovered",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
				items: [
					{
						label: "Visitor arrives",
						tone: "n"
					},
					{
						label: "AI reads intent in real time",
						tone: "g"
					},
					{
						label: "Hesitation classified · reason known",
						tone: "g"
					},
					{
						label: "Smallest nudge fired in-window",
						tone: "g"
					},
					{
						label: "Purchase · revenue recovered",
						tone: "g"
					}
				],
				tone: "bright"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-16 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass rounded-2xl p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Model it on your traffic"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeInput, {
							label: "Monthly visitors",
							value: visitors,
							min: 1e4,
							max: 2e6,
							step: 5e3,
							onChange: setVisitors,
							format: (v) => v.toLocaleString("en-US")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeInput, {
							label: "Average order value (USD)",
							value: aov,
							min: 20,
							max: 500,
							step: 5,
							onChange: setAov,
							format: (v) => `$${v}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeInput, {
							label: "Current conversion rate",
							value: conv,
							min: .5,
							max: 6,
							step: .1,
							onChange: setConv,
							format: (v) => `${v.toFixed(1)}%`
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
						label: "Baseline monthly revenue",
						value: fmt(baseline),
						hint: "Visitors × Conv. × AOV",
						tone: "muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
						label: "Recovered by Claarvia",
						value: fmt(recovered),
						hint: "Hesitation-window recovery, modeled",
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
						label: "Effective uplift",
						value: `+${uplift.toFixed(1)}%`,
						hint: "On top of baseline revenue",
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
						label: "Margin protected",
						value: "≤ 4%",
						hint: "Average capped nudge",
						tone: "muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground",
						children: "Modeled from an 11% recovery on non-converting sessions with a 4% average nudge. Directional, not a guarantee — a demo maps this to your own store data."
					})
				]
			})]
		})]
	});
}
function FlowColumn({ title, badge, icon, items, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `reveal relative overflow-hidden rounded-2xl p-6 sm:p-8 ${tone === "bright" ? "glass-strong" : "glass opacity-90"}`,
		style: tone === "bright" ? { boxShadow: "0 0 0 1px oklch(0.78 0.16 288 / 0.25), 0 30px 80px -30px oklch(0.78 0.16 288 / 0.5)" } : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-semibold",
				style: { fontFamily: "var(--font-display)" },
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${tone === "bright" ? "bg-primary/15 text-primary" : "border border-white/5 bg-white/[0.03] text-muted-foreground"}`,
				children: [icon, badge]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 space-y-2",
			children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm",
				style: { animation: `tick 0.5s ease-out ${i * 90}ms both` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-5 text-[11px] tabular-nums text-muted-foreground",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${it.tone === "g" ? "bg-emerald-400" : it.tone === "b" ? "bg-white/20" : "bg-primary/70"}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: it.tone === "b" ? "text-muted-foreground/80" : "text-foreground",
						children: it.label
					})
				]
			}, i))
		})]
	});
}
function RangeInput({ label, value, min, max, step, onChange, format }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-semibold tabular-nums",
			style: { fontFamily: "var(--font-display)" },
			children: format(value)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "range",
		min,
		max,
		step,
		value,
		onChange: (e) => onChange(Number(e.target.value)),
		className: "mt-3 w-full accent-primary"
	})] });
}
function ImpactCard({ label, value, hint, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative rounded-2xl p-5 ${tone === "primary" ? "glass-strong" : "glass"}`,
		style: tone === "primary" ? { boxShadow: "0 0 0 1px oklch(0.78 0.16 288 / 0.25)" } : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 text-3xl font-semibold tabular-nums tracking-tight ${tone === "primary" ? "text-gradient" : ""}`,
				style: { fontFamily: "var(--font-display)" },
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function Integrations() {
	const items = [
		{
			icon: ShoppingBag,
			name: "Shopify",
			body: "One-click app install. Works with any theme."
		},
		{
			icon: Store,
			name: "WooCommerce",
			body: "Plugin drops into any WordPress store."
		},
		{
			icon: ShoppingCart,
			name: "Magento",
			body: "Adobe Commerce module, live in a day."
		},
		{
			icon: Layers,
			name: "Headless",
			body: "Framework-agnostic. Next, Nuxt, Remix, Astro."
		},
		{
			icon: CodeXml,
			name: "Custom SDK",
			body: "TypeScript-first. Fully typed events."
		},
		{
			icon: Server,
			name: "REST API",
			body: "Server-side intent scoring for any stack."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Integrations",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Live in a day. Not a quarter." }),
		sub: "One snippet. No re-platform. No engineering sprint. Claarvia sits above your existing tools and lets them keep doing their job.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-10 grid gap-4 md:grid-cols-3",
			children: [
				{
					t: "2 min",
					l: "Drop one snippet"
				},
				{
					t: "≤ 24h",
					l: "Claarvia calibrates"
				},
				{
					t: "Day 1",
					l: "Interventions go live"
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal flex items-center gap-4 rounded-2xl glass px-5 py-4",
				style: { transitionDelay: `${i * 80}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-semibold tabular-nums text-gradient",
						style: { fontFamily: "var(--font-display)" },
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-white/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [
							i + 1,
							". ",
							s.l
						]
					})
				]
			}, s.l))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-primary/30",
				style: { transitionDelay: `${i * 50}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-semibold",
							style: { fontFamily: "var(--font-display)" },
							children: it.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: it.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 inline-flex items-center gap-1.5 text-xs text-primary/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "h-3.5 w-3.5" }), "Live in < 1 day"]
					})
				]
			}, it.name))
		})]
	});
}
function Security() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "security",
		eyebrow: "Privacy & security",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Built for the teams your legal team says yes to." }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					icon: ShieldCheck,
					title: "GDPR & CCPA ready",
					body: "Consent-aware, purposeful data, honour-by-design."
				},
				{
					icon: Lock,
					title: "Cookieless mode",
					body: "Runs without third-party cookies when required."
				},
				{
					icon: Gauge,
					title: "SOC 2 in progress",
					body: "Controls, logging and access reviews from day one."
				},
				{
					icon: Globe,
					title: "EU / US residency",
					body: "Choose where your data is stored and processed."
				}
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass rounded-2xl p-6",
				style: { transitionDelay: `${i * 60}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-5 w-5 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base font-semibold",
						style: { fontFamily: "var(--font-display)" },
						children: it.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: it.body
					})
				]
			}, it.title))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-center text-sm text-muted-foreground reveal",
			children: "No PII stored by default. You control retention, exports and deletion."
		})]
	});
}
function FAQ() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "faq",
		eyebrow: "FAQ",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Objections, answered." }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-3xl divide-y divide-white/5 rounded-2xl glass",
			children: [
				{
					q: "How is Claarvia different from Google Analytics or Hotjar?",
					a: "GA and Hotjar tell you the past. Claarvia acts on the present — it detects the reason a visitor is hesitating and intervenes before they leave."
				},
				{
					q: "How long does setup take?",
					a: "One snippet, about 2 minutes. First insights within 60 seconds; full calibration inside 24 hours."
				},
				{
					q: "Is Claarvia privacy-friendly?",
					a: "Yes. Cookieless mode, GDPR/CCPA-ready, no PII stored by default. You control retention and deletion."
				},
				{
					q: "Can the AI act on its own?",
					a: "Only within limits you set. You approve which interventions are allowed and cap the maximum discount."
				},
				{
					q: "What about my existing stack?",
					a: "Claarvia sits above it. GA, Hotjar, Klaviyo, Shopify — everything keeps running exactly as it is."
				},
				{
					q: "Do you offer a pilot?",
					a: "Yes, via a design-partner pilot. Book a demo and we'll scope it to your store."
				}
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
				q: it.q,
				a: it.a,
				defaultOpen: i === 0
			}, i))
		})
	});
}
function FAQItem({ q, a, defaultOpen = false }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "reveal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			className: "flex w-full items-center justify-between gap-6 px-6 py-5 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}` })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid overflow-hidden px-6 transition-all",
			style: { gridTemplateRows: open ? "1fr" : "0fr" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-5 text-sm text-muted-foreground",
					children: a
				})
			})
		})]
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "book",
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-4xl px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0",
					style: { background: "radial-gradient(60% 80% at 50% 100%, oklch(0.5 0.22 288 / 0.4), transparent 60%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-balance text-4xl font-semibold tracking-tight sm:text-6xl",
							style: { fontFamily: "var(--font-display)" },
							children: [
								"Stop guessing why",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: "they leave."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg",
							children: "See Claarvia intervene on your own store, live, in a 20-minute demo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:hello@claarvia.com?subject=Book%20a%20Claarvia%20demo",
								className: "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
								style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 80px oklch(0.78 0.16 288 / 0.55)" },
								children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-xs text-muted-foreground",
							children: "No credit card. No install required for the demo. 20 minutes."
						})
					]
				})]
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative inline-flex h-6 w-6 items-center justify-center rounded-md glass-strong",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							style: { fontFamily: "var(--font-display)" },
							children: "Claarvia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "· The silent intelligence behind every smart store."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#vs",
							className: "hover:text-foreground",
							children: "Compare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#security",
							className: "hover:text-foreground",
							children: "Security"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#book",
							className: "hover:text-foreground",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Claarvia"
					]
				})
			]
		})
	});
}
//#endregion
export { Landing as component };
