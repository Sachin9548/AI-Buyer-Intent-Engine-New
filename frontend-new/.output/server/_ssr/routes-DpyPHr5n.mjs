import { a as __toESM } from "../_runtime.mjs";
import { n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Boxes, C as Cpu, D as CircleCheck, E as CircleDollarSign, M as ArrowRight, O as ChevronDown, S as Eye, T as CircleX, _ as Linkedin, a as Timer, b as Globe, c as ShoppingBag, d as ScanLine, f as Plug, g as Lock, h as Menu, i as TrendingUp, j as BadgeCheck, k as Brain, l as ShieldCheck, m as MousePointerClick, n as WandSparkles, o as Store, p as Play, r as Truck, s as ShoppingCart, t as X, u as Server, v as Layers, w as CodeXml, x as Gauge, y as Instagram } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpyPHr5n.js
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
	useTransform(scrollYProgress, [.85, 1], [0, 1]);
	const hintOpacity = useTransform(scrollYProgress, [0, .08], [1, 0]);
	const hintY = useTransform(scrollYProgress, [0, .08], [0, 10]);
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							style: {
								opacity: hintOpacity,
								y: hintY
							},
							className: "pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground/80 sm:bottom-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scroll to explore" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { y: [
									0,
									6,
									0
								] },
								transition: {
									duration: 1.6,
									repeat: Infinity,
									ease: "easeInOut"
								},
								className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
							})]
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
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [scrollProgress, setScrollProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 8);
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			const progress = maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0;
			setScrollProgress(Math.min(100, Math.max(0, progress)));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	const links = [
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
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-white/10 bg-background/70 backdrop-blur-xl" : "bg-transparent"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-0 h-[2px] bg-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300",
					style: { width: `${scrollProgress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#top",
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brandlogo.png",
							alt: "Claarvia",
							className: "h-8 w-auto object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-8 md:flex",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: l.href,
							className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
							children: l.label
						}, l.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#book",
							className: "animated-button-border hidden group items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] sm:inline-flex",
							style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.1), 0 8px 40px oklch(0.78 0.16 288 / 0.35)" },
							children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle navigation menu",
							"aria-expanded": mobileOpen,
							onClick: () => setMobileOpen((v) => !v),
							className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.08] md:hidden",
							children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
						})]
					})
				]
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						onClick: () => setMobileOpen(false),
						className: "rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground",
						children: l.label
					}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#book",
						onClick: () => setMobileOpen(false),
						className: "animated-button-border mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground",
						children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes hero-bubble-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          20% { transform: translate3d(22vw, -12vh, 0) scale(1.18); }
          43% { transform: translate3d(-18vw, 24vh, 0) scale(.86); }
          68% { transform: translate3d(28vw, 38vh, 0) scale(1.12); }
          86% { transform: translate3d(-10vw, -20vh, 0) scale(.94); }
        }
        @keyframes hero-bubble-drift-reverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          18% { transform: translate3d(-24vw, 18vh, 0) scale(1.2); }
          39% { transform: translate3d(16vw, -16vh, 0) scale(.88); }
          63% { transform: translate3d(30vw, 30vh, 0) scale(1.14); }
          82% { transform: translate3d(-20vw, 40vh, 0) scale(.96); }
        }
        @keyframes hero-dot-field-drift {
          0%, 100% { background-position: 8px 14px, 46px 62px; }
          25% { background-position: 140px 90px, -80px 150px; }
          50% { background-position: -70px 220px, 180px -40px; }
          75% { background-position: 120px -30px, -110px 240px; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 opacity-[0.2]",
				style: {
					backgroundImage: "radial-gradient(circle at 32% 28%, oklch(0.98 0.08 292 / 0.95) 0 1px, oklch(0.86 0.18 292 / 0.9) 0.7px 1.2px, oklch(0.58 0.2 288 / 0.75) 1.4px, oklch(0.25 0.16 285 / 0.55) 2px, transparent 2.6px), radial-gradient(circle at 30% 26%, oklch(0.94 0.12 292 / 0.95) 0 0.35px, oklch(0.76 0.2 288 / 0.85) 0.5px 0.9px, oklch(0.42 0.2 285 / 0.7) 1.1px, transparent 1.7px)",
					backgroundSize: "96px 96px, 143px 143px",
					backgroundPosition: "8px 14px, 46px 62px",
					maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
					animation: "hero-dot-field-drift 18s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -left-40 top-16 h-[32rem] w-[32rem] rounded-full blur-3xl",
						style: {
							background: "radial-gradient(circle at 35% 35%, oklch(0.78 0.16 288 / 0.42), oklch(0.58 0.2 250 / 0.18) 48%, transparent 72%)",
							animation: "hero-bubble-drift 19s cubic-bezier(0.45, 0, 0.55, 1) infinite"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-[4%] top-0 h-[38rem] w-[38rem] rounded-full blur-3xl",
						style: {
							background: "radial-gradient(circle at 50% 45%, oklch(0.72 0.19 250 / 0.3), oklch(0.62 0.18 320 / 0.16) 48%, transparent 72%)",
							animation: "hero-bubble-drift-reverse 23s cubic-bezier(0.45, 0, 0.55, 1) 2s infinite"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-[-10rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl",
						style: {
							background: "radial-gradient(circle, oklch(0.74 0.17 288 / 0.2), oklch(0.68 0.16 190 / 0.12) 52%, transparent 72%)",
							animation: "hero-bubble-drift 27s cubic-bezier(0.45, 0, 0.55, 1) 4s infinite reverse"
						}
					})
				]
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary pulse-glow" }), "Al for Ecommerce"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
								style: { fontFamily: "var(--font-display)" },
								children: "Know why visitors hesitate. Convert before they leave."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg text-muted-foreground",
								children: "Claarvia tracks visitor behavior, finds what's stopping the sale, and fixes it automatically."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#book",
									className: "animated-button-border group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
									style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 60px oklch(0.78 0.16 288 / 0.45)" },
									children: ["Book a demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#engine",
									className: "group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative inline-flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-primary/70 pulse-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative m-auto h-1.5 w-1.5 rounded-full bg-primary" })]
									}), "Watch Claarvia in action"]
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
										children: "Cookieless Mode"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
										children: "GDPR Ready"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustChip, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3.5 w-3.5" }),
										children: "Live in One Day"
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
								className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
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
			"Visitors don't leave randomly.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "They leave for a reason."
			})
		] }),
		sub: "Claarvia finds that reason price, trust, delivery, sizing and helps before they bounce.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				{
					icon: CircleDollarSign,
					title: "Price hesitation",
					body: "Comparing prices, hunting for coupons"
				},
				{
					icon: Truck,
					title: "Delivery concerns",
					body: "Checking shipping cost, delivery time, return policy."
				},
				{
					icon: BadgeCheck,
					title: "Trust concerns",
					body: "Reading reviews, checking seller credibility."
				},
				{
					icon: Boxes,
					title: "Size & fit uncertainty",
					body: "Repeated size-guide checks."
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
			action: "Cap 4% nudge · 9s",
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
			action: "Inline fit guide",
			lift: 22
		},
		{
			signal: "Cart abandoned at shipping step",
			confidence: 94,
			intent: "Purchase intent, blocked",
			hesitation: "Shipping surprise",
			action: "Free-ship threshold",
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
		eyebrow: "How Claarvia Thinks",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Not reactive.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient",
				children: "Understands behavior."
			})
		] }),
		sub: "It watches the full journey, builds confidence from real signals, and acts only when it's sure it can help.",
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
						className: "grid min-h-[560px] grid-cols-1 gap-4 p-5 lg:min-h-[304px] lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-[104px] rounded-2xl glass p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Signal detected"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "tick mt-2 text-base font-medium",
										style: { fontFamily: "var(--font-display)" },
										children: f.signal
									}, `sig-${i}`)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-[144px] rounded-2xl glass p-4",
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
								className: "h-[260px] rounded-2xl glass p-4 lg:col-span-2 lg:h-full",
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
												className: "flex-1 font-thin text-xs ",
												children: row.v
											})
										]
									}, row.k))
								}, `r-${i}`)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-[160px] rounded-2xl p-4 lg:col-span-1 lg:h-full",
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
										className: "mt-2 text-[10px] uppercase tracking-wider text-muted-foreground",
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
			label: "Visitor lands",
			detail: "Anonymous session · no cookies required"
		},
		{
			icon: Eye,
			label: "Explores product",
			detail: "Scrolls, hovers, checks price twice"
		},
		{
			icon: Timer,
			label: "Begins to hesitate",
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
		eyebrow: "See Claarvia in action",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "One visitor. Hesitation to purchase." }),
		sub: "See how Claarvia spots hesitation, understands the cause, and acts at the right moment before the visitor leaves.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 reveal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-2xl p-1",
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
					className: "animated-button-border mt-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
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
		eyebrow: "Live dashboard",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "One view. Full visibility." }),
		sub: "Who's hesitating, why, what Claarvia's doing, and revenue recovered live.",
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
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigStat, {
									label: "Recovered revenue",
									value: "$142,34",
									delta: "+18.4% vs. 7d"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigStat, {
									label: "Hesitation caught",
									value: "244",
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
				"Live visitors",
				"AI decisions",
				"Revenue impact",
				"Opportunities"
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full glass px-3 py-1.5 text-muted-foreground",
				children: c
			}, c))
		})]
	});
}
function BigStat({ label, value, delta, tone = "up" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl glass p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[8px] uppercase tracking-wider text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xl font-semibold tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: value
			}),
			delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-1 text-[8px] ${tone === "up" ? "text-emerald-300" : "text-muted-foreground"}`,
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
					stopColor: "oklch(0.88 0.16 288)",
					stopOpacity: "0.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "oklch(0.88 0.16 288)",
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
					stopColor: "oklch(0.88 0.16 288)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "oklch(0.82 0.19 250)"
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
			clarity: false,
			hotjar: false,
			optimizely: false,
			claarvia: true
		},
		{
			r: "Tells you why a visitor hesitated",
			ga: false,
			clarity: true,
			hotjar: true,
			optimizely: false,
			claarvia: true
		},
		{
			r: "Detects intent in real time",
			ga: false,
			clarity: false,
			hotjar: false,
			optimizely: "Partial",
			claarvia: true
		},
		{
			r: "Acts inside the hesitation window",
			ga: false,
			clarity: false,
			hotjar: false,
			optimizely: "Test-based",
			claarvia: true
		},
		{
			r: "Protects margin (smallest nudge)",
			ga: false,
			clarity: false,
			hotjar: false,
			optimizely: false,
			claarvia: true
		},
		{
			r: "Time to first insight",
			ga: "Days",
			clarity: "Hours",
			hotjar: "Hours",
			optimizely: "Weeks",
			claarvia: "50s"
		}
	];
	const cell = (v) => {
		if (v === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary",
			children: "✓"
		});
		if (v === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground/40",
			children: "✕"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: v
		});
	};
	const analyticsCell = (r) => {
		if (r.ga !== false) return cell(r.ga);
		if (r.clarity !== false) return cell(r.clarity);
		if (r.hotjar !== false) return cell(r.hotjar);
		return cell(r.optimizely);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "vs",
		eyebrow: "Beyond Analytics",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Analytics shows the past. Claarvia decides what's next." }),
		sub: "Analytics tells you what already happened. Claarvia understands what's happening right now and helps visitors convert before they leave.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative reveal overflow-hidden rounded-2xl glass-strong",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-y-0 right-0 w-1/3",
				style: { background: "linear-gradient(180deg, oklch(0.88 0.16 288 / 0.14), transparent)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 font-medium md:px-6",
								children: "Feature"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-4 text-center font-medium md:hidden",
								children: "Analytics Tools"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-4 py-4 text-center font-medium md:table-cell",
								children: "Google Analytics"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-4 py-4 text-center font-medium md:table-cell",
								children: "MS Clarity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-4 py-4 text-center font-medium md:table-cell",
								children: "Hotjar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-4 py-4 text-center font-medium md:table-cell",
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
								className: "px-4 py-4 text-muted-foreground md:px-6",
								children: r.r
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center md:hidden",
								children: analyticsCell(r)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-4 py-4 text-center md:table-cell",
								children: cell(r.ga)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-4 py-4 text-center md:table-cell",
								children: cell(r.clarity)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-4 py-4 text-center md:table-cell",
								children: cell(r.hotjar)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-4 py-4 text-center md:table-cell",
								children: cell(r.optimizely)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-center font-medium",
								children: cell(r.claarvia)
							})
						]
					}, r.r)) })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-center text-sm text-muted-foreground reveal",
			children: "You don't need another dashboard. You need action."
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
		eyebrow: "Before vs. After",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "One journey. Two outcomes." }),
		sub: "Without Claarvia abandonment. With Claarvia conversion.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowColumn, {
				title: "Without Claarvia",
				badge: "Silent drop-off",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
				items: [
					{
						label: "Visitor lands",
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
						label: "Visitor lands",
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								max: 2e5,
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal grid grid-cols-2 gap-2 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
							label: "monthly revenue",
							value: fmt(baseline),
							hint: "Visitors × Conv. × AOV",
							tone: "muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCard, {
							label: "Recovered revenue",
							value: fmt(recovered),
							hint: "Hesitation-window recovery",
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
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground",
					children: "Modeled from an 11% recovery on non-converting sessions with a 4% average nudge. Directional, not a guarantee a demo maps this to your own store data."
				})
			]
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
		className: `relative rounded-2xl p-3 ${tone === "primary" ? "glass-strong" : "glass"}`,
		style: tone === "primary" ? { boxShadow: "0 0 0 1px oklch(0.78 0.16 288 / 0.25)" } : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 text-2xl font-semibold tabular-nums tracking-tight ${tone === "primary" ? "text-gradient" : ""}`,
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
		eyebrow: "Live in a Day",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Start recovering revenue tomorrow." }),
		sub: "No replatforming. No lengthy implementation. Install a single snippet, let Claarvia learn your store, and start helping hesitant visitors within 24 hours.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-10 grid gap-4 md:grid-cols-3",
			children: [
				{
					t: "2 min",
					l: "Add one snippet or install the app."
				},
				{
					t: "≤24h",
					l: "Claarvia observes visitor behavior and builds confidence."
				},
				{
					t: "Day 1",
					l: "AI begins detecting hesitation and responding automatically."
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
		eyebrow: "Built for modern commerce",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Smart Al. Private by design." }),
		sub: "Understand visitors without losing control over their data.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					icon: ShieldCheck,
					title: "GDPR & CCPA Ready",
					body: "Built for modern privacy regulations."
				},
				{
					icon: Lock,
					title: "Cookieless Mode",
					body: "Works even when third-party cookies don't."
				},
				{
					icon: Gauge,
					title: "Enterprise Security",
					body: "Encryption & audit logging built in."
				},
				{
					icon: Globe,
					title: "Privacy-first by default",
					body: "Flexible tracking for privacy-conscious environments."
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
			children: "You control what's collected, stored, and deleted."
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
					q: "How is Claarvia different from Google Analytics, Clarity or Hotjar?",
					a: "Those tools tell you what happened after visitors leave. Claarvia understands hesitation while the visitor is still shopping and acts before the opportunity is lost."
				},
				{
					q: "How long does setup take?",
					a: "Just add one snippet takes under 2 minutes. Claarvia starts observing right away and fully calibrates within 24 hours."
				},
				{
					q: "Will I lose control to the AI?",
					a: "No. Claarvia only works within rules you set discount limits, confidence thresholds, and you can turn off automation anytime."
				},
				{
					q: "Does Claarvia work with my existing tools?",
					a: "Yes. It works alongside Shopify, GA4, Clarity, Hotjar, Klaviyo, and your current marketing stack no replacement needed."
				},
				{
					q: "Is customer data safe?",
					a: "Yes. Claarvia follows privacy-first principles, minimizes stored data, and gives you full control over retention and deletion."
				},
				{
					q: "Can Claarvia guarantee more revenue?",
					a: "No responsible Al platform can promise that. Resuits depend on your traffic, pricing, and products but Claarvia optimizes based on live intent."
				},
				{
					q: "Does it slow down my website?",
					a: "No. The tracking layer is lightweight and asynchronous, so it won't affect load time or user experience."
				},
				{
					q: "Can I see why the AI made a decision?",
					a: "Yes. Every action shows the signals detected, confidence score, and reasoning full transparency, always."
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-balance text-4xl font-semibold tracking-tight sm:text-6xl",
							style: { fontFamily: "var(--font-display)" },
							children: "See hesitation. Recover revenue."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg",
							children: "Watch Claarvia analyze real visitor behavior and show exactly how it intervenes live, on your own store."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:support.claarvia@gmail.com?subject=Book%20a%20Claarvia%20demo",
								className: "animated-button-border group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
								style: { boxShadow: "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 80px oklch(0.78 0.16 288 / 0.55)" },
								children: ["Book a live demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-xs text-muted-foreground",
							children: "20-minute personalized demo • No installation required • Bring your own store"
						})
					]
				})]
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative border-t border-white/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-10 md:grid-cols-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#top",
							className: "flex items-center gap-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brandlogo.png",
								alt: "Claarvia",
								className: "h-9 w-auto object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xs text-sm text-muted-foreground",
							children: "Behavioral intelligence for ecommerce teams who'd rather know why visitors leave than guess."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" }), "All systems operational"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.instagram.com/claarvia?igsh=MTJiMzI5MXk2ZHhocw%3D%3D&utm_source=qr",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "Instagram",
								title: "Instagram",
								className: "text-foreground/80 transition-colors hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.linkedin.com/company/claarvia/",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "LinkedIn",
								title: "LinkedIn",
								className: "text-foreground/80 transition-colors hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})
							})]
						})
					]
				}), [
					{
						title: "Product",
						links: [
							"How it works",
							"Dashboard",
							"AI Engine",
							"Security",
							"Pricing",
							"Changelog"
						]
					},
					{
						title: "Company",
						links: [
							"About",
							"Customers",
							"Careers",
							"Press kit",
							"Contact"
						]
					},
					{
						title: "Resources",
						links: [
							"Documentation",
							"API Reference",
							"Guides",
							"Privacy",
							"Status"
						]
					},
					{
						title: "Legal",
						links: [
							"Privacy Policy",
							"Terms of Service",
							"DPA",
							"Cookies"
						]
					}
				].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: col.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2.5 text-sm",
					children: col.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "text-foreground/80 transition-colors hover:text-foreground",
						children: link
					}) }, link))
				})] }, col.title))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Claarvia, Inc. Built for modern commerce."
				] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none select-none overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mb-16 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text px-4 text-center font-display text-[18vw] leading-none tracking-tight text-transparent opacity-20",
				children: "claarvia"
			})
		})]
	});
}
//#endregion
export { Landing as component };
