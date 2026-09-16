import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as AtSign, I as Building2, O as Eye, g as Phone, k as EyeOff, r as User, w as KeyRound, x as Lock } from "../_libs/lucide-react.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dqp0dLJH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NeuralMesh({ className = "" }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let width = 0;
		let height = 0;
		let raf = 0;
		let nodes = [];
		const pointer = {
			x: -9999,
			y: -9999
		};
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const density = width < 700 ? 26 : 54;
			nodes = Array.from({ length: density }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - .5) * .16,
				vy: (Math.random() - .5) * .16
			}));
		};
		const onMove = (e) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
		};
		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			const maxDist = width < 700 ? 130 : 170;
			for (const n of nodes) {
				if (!reduced) {
					n.x += n.vx;
					n.y += n.vy;
				}
				if (n.x < 0 || n.x > width) n.vx *= -1;
				if (n.y < 0 || n.y > height) n.vy *= -1;
			}
			for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
				const a = nodes[i];
				const b = nodes[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const dist = Math.hypot(dx, dy);
				if (dist > maxDist) continue;
				const mx = (a.x + b.x) / 2;
				const my = (a.y + b.y) / 2;
				const near = Math.hypot(mx - pointer.x, my - pointer.y);
				const boost = near < 180 ? (1 - near / 180) * .5 : 0;
				const alpha = (1 - dist / maxDist) * .16 + boost * .35;
				ctx.strokeStyle = `rgba(${boost > .12 ? "140,225,246" : "124,108,255"}, ${alpha.toFixed(3)})`;
				ctx.lineWidth = .7;
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.stroke();
			}
			for (const n of nodes) {
				const near = Math.hypot(n.x - pointer.x, n.y - pointer.y);
				const boost = near < 160 ? (1 - near / 160) * .6 : 0;
				ctx.fillStyle = `rgba(34,211,238,${(.22 + boost).toFixed(3)})`;
				ctx.beginPath();
				ctx.arc(n.x, n.y, 1.3 + boost * 1.2, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = window.requestAnimationFrame(draw);
		};
		resize();
		draw();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onMove);
		return () => {
			window.cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		"aria-hidden": true,
		className: `h-full w-full ${className}`
	});
}
var LINES = [
	"They came.",
	"They explored.",
	"They hesitated.",
	"Until Claarvia started watching."
];
function IntroSequence({ onDone, duration }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [showSkip, setShowSkip] = (0, import_react.useState)(false);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const per = duration / (LINES.length + 1);
	(0, import_react.useEffect)(() => {
		const timers = [];
		LINES.forEach((_, i) => {
			timers.push(window.setTimeout(() => setStep(i + 1), per * i));
		});
		timers.push(window.setTimeout(() => setShowSkip(true), 1e3));
		timers.push(window.setTimeout(() => setLeaving(true), duration - 500));
		timers.push(window.setTimeout(onDone, duration));
		return () => timers.forEach(window.clearTimeout);
	}, [
		duration,
		per,
		onDone
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-[#05060b] transition-opacity duration-500",
		style: { opacity: leaving ? 0 : 1 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute h-2 w-2 rounded-full bg-[color:var(--auth-cyan)]",
				style: {
					boxShadow: "0 0 18px 6px rgba(34,211,238,0.55)",
					animation: "claarvia-drift-in 1.6s cubic-bezier(0.2,0.7,0.2,1) forwards",
					top: "46%",
					left: "50%"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 px-6 text-center",
				children: LINES.map((line, i) => {
					const isLast = i === LINES.length - 1;
					const past = step > i + 1;
					if (step < i + 1) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: isLast ? "auth-gradient-text font-display text-2xl font-bold tracking-tight sm:text-4xl" : "font-mono text-sm tracking-[0.28em] text-[color:var(--muted-foreground)] uppercase sm:text-base",
						style: {
							position: isLast ? "relative" : "absolute",
							inset: isLast ? void 0 : 0,
							margin: "auto",
							height: isLast ? void 0 : "1.5em",
							animation: `claarvia-line-in 520ms ease-out both${past && !isLast ? `, claarvia-line-out 420ms ease-in forwards` : ""}`,
							opacity: !isLast && past ? 0 : 1,
							textShadow: isLast ? "0 0 34px rgba(124,108,255,0.55)" : void 0
						},
						children: line
					}, line);
				})
			}),
			showSkip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onDone,
				className: "absolute bottom-10 font-mono text-xs tracking-[0.2em] text-[color:var(--muted-foreground)] uppercase transition-colors duration-300 hover:text-[color:var(--foreground)]",
				style: { animation: "claarvia-fade-up 600ms ease-out both" },
				children: "Skip"
			})
		]
	});
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function useCountUp(target, run) {
	const [value, setValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!run) return;
		let frame = 0;
		const total = 90;
		const id = window.setInterval(() => {
			frame += 1;
			const t = Math.min(frame / total, 1);
			setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
			if (t === 1) window.clearInterval(id);
		}, 24);
		return () => window.clearInterval(id);
	}, [target, run]);
	return value;
}
function Chip({ children, className, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `auth-glass-panel pointer-events-none absolute rounded-2xl px-4 py-3 ${className}`,
		style: { animation: `claarvia-fade-up 700ms ease-out ${delay}ms both, claarvia-float 7s ease-in-out ${delay}ms infinite` },
		children
	});
}
function AmbientChips({ active }) {
	const isMobile = useIsMobile();
	const recovered = useCountUp(18420, active);
	const [confidence, setConfidence] = (0, import_react.useState)(92);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setConfidence(90 + Math.floor(Math.random() * 5));
		}, 2600);
		return () => window.clearInterval(id);
	}, []);
	if (!active) return null;
	const circumference = 2 * Math.PI * 16;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				className: "top-[12%] left-[6%] hidden items-center gap-3 lg:flex",
				delay: 200,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "44",
					height: "44",
					viewBox: "0 0 40 40",
					className: "-rotate-90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "20",
							cy: "20",
							r: "16",
							fill: "none",
							stroke: "rgba(255,255,255,0.1)",
							strokeWidth: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "20",
							cy: "20",
							r: "16",
							fill: "none",
							stroke: "url(#gaugeGrad)",
							strokeWidth: "3",
							strokeLinecap: "round",
							strokeDasharray: circumference,
							strokeDashoffset: circumference * (1 - confidence / 100),
							style: { transition: "stroke-dashoffset 900ms cubic-bezier(0.34,1.2,0.5,1)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "gaugeGrad",
							x1: "0",
							y1: "0",
							x2: "1",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#7c6cff"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#22d3ee"
							})]
						}) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-sm text-[color:var(--foreground)]",
					children: [confidence, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-[color:var(--muted-foreground)]",
					children: "confidence"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				className: "top-[18%] right-[6%] hidden lg:block",
				delay: 500,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-sm text-[color:var(--foreground)]",
					children: ["$", recovered.toLocaleString()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] text-[color:var(--muted-foreground)]",
					children: ["recovered", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[color:var(--auth-signal)]",
						children: "+12.4%"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				className: `hidden md:block bottom-[10%] left-1/2 -translate-x-1/2 lg:right-[10%] lg:bottom-[16%] lg:left-auto lg:translate-x-0 ${isMobile ? "" : ""}`,
				delay: 800,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full bg-[color:var(--auth-hesitation)]",
						style: { animation: "claarvia-flicker 2.4s ease-in-out infinite" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] tracking-wide text-[color:var(--foreground)]",
						children: "Hesitation classified: price shock"
					})]
				})
			})
		]
	});
}
function Field({ id, label, type = "text", icon, value, onChange, trailing, disabled = false }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const lifted = focused || value.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative rounded-xl border bg-[rgba(255,255,255,0.04)] auth-spring transition-all",
		style: {
			borderColor: focused ? "transparent" : "var(--auth-glass-border)",
			boxShadow: focused ? "0 0 0 1.5px rgba(124,108,255,0.9), 0 0 0 4px rgba(34,211,238,0.14), 0 0 26px -6px rgba(124,108,255,0.6)" : "none"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "pointer-events-none absolute left-11 auth-spring transition-all",
				style: {
					top: lifted ? "7px" : "50%",
					transform: lifted ? "none" : "translateY(-50%)",
					fontSize: lifted ? "10px" : "13px",
					letterSpacing: lifted ? "0.12em" : "0",
					textTransform: lifted ? "uppercase" : "none",
					color: focused ? "var(--auth-cyan)" : "var(--muted-foreground)"
				},
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type,
				disabled,
				value,
				onChange: (e) => onChange(e.target.value),
				onFocus: () => setFocused(true),
				onBlur: () => setFocused(false),
				className: "w-full bg-transparent pt-5 pr-11 pb-2 pl-11 text-sm text-[color:var(--foreground)] outline-none disabled:opacity-50"
			}),
			trailing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-4 top-1/2 -translate-y-1/2",
				children: trailing
			})
		]
	});
}
function strengthOf(pw) {
	let s = 0;
	if (pw.length >= 8) s++;
	if (/[A-Z]/.test(pw)) s++;
	if (/[0-9]/.test(pw)) s++;
	if (/[^A-Za-z0-9]/.test(pw)) s++;
	return s;
}
function AuthCard({ onSubmitted }) {
	const isMobile = useIsMobile();
	const cardRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [tilt, setTilt] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [granted, setGranted] = (0, import_react.useState)(false);
	const [pulse, setPulse] = (0, import_react.useState)(false);
	const [exiting, setExiting] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [otp, setOtp] = (0, import_react.useState)("");
	const [fields, setFields] = (0, import_react.useState)({
		email: "",
		password: "",
		name: "",
		store_url: "",
		whatsapp_number: "",
		confirm: ""
	});
	let formattedStoreUrl = fields.store_url.trim();
	if (!/^https?:\/\//i.test(formattedStoreUrl)) formattedStoreUrl = `https://${formattedStoreUrl}`;
	const set = (k) => (v) => {
		setErrorMessage(null);
		setFields((f) => ({
			...f,
			[k]: v
		}));
	};
	const API_URL = typeof processModule !== "undefined" && processModule.env.NEXT_PUBLIC_API_URL || "https://api.claarvia.com/api";
	const onMove = (e) => {
		if (isMobile || !cardRef.current) return;
		const r = cardRef.current.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - .5;
		const py = (e.clientY - r.top) / r.height - .5;
		setTilt({
			x: -py * 7,
			y: px * 9
		});
	};
	const submit = async (e) => {
		e.preventDefault();
		if (loading) return;
		setErrorMessage(null);
		if (mode === "signup") {
			if (fields.password !== fields.confirm) {
				setErrorMessage("Passwords do not match!");
				return;
			}
			if (fields.password.length < 8) {
				setErrorMessage("Password must be at least 8 characters long.");
				return;
			}
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/auth/signup`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: fields.name,
						store_url: fields.store_url,
						email: fields.email,
						password: fields.password,
						whatsapp_number: fields.whatsapp_number
					})
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "Failed to create account.");
				setLoading(false);
				setMode("otp");
			} catch (err) {
				setLoading(false);
				setErrorMessage(err.message || "Something went wrong.");
			}
			return;
		}
		if (mode === "otp") {
			if (otp.length !== 6) {
				setErrorMessage("Please enter a valid 6-digit OTP code.");
				return;
			}
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/auth/verify-otp`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: fields.email,
						otp: otp.trim()
					})
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "Verification failed. Check your OTP.");
				if (data.access_token) localStorage.setItem("claarvia_token", data.access_token);
				handleSuccessRedirect();
			} catch (err) {
				setLoading(false);
				setErrorMessage(err.message || "Invalid or expired OTP.");
			}
			return;
		}
		if (mode === "login") {
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: fields.email,
						password: fields.password
					})
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "Invalid email or password.");
				if (data.access_token) localStorage.setItem("claarvia_token", data.access_token);
				handleSuccessRedirect();
			} catch (err) {
				setLoading(false);
				setErrorMessage(err.message || "Login failed.");
			}
		}
	};
	const handleSuccessRedirect = () => {
		setLoading(false);
		setPulse(true);
		setGranted(true);
		window.setTimeout(() => setExiting(true), 900);
		window.setTimeout(() => {
			onSubmitted?.();
			window.location.href = "/dashboard";
		}, 1500);
	};
	const strength = strengthOf(fields.password);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-20 w-full max-w-[420px] px-5 sm:px-0",
		onMouseMove: onMove,
		onMouseLeave: () => setTilt({
			x: 0,
			y: 0
		}),
		style: { perspective: "1200px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: cardRef,
			className: "auth-glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-8",
			style: {
				transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				transition: "transform 320ms cubic-bezier(0.34,1.3,0.5,1)",
				animation: exiting ? "claarvia-exit 600ms ease-in forwards" : "claarvia-card-in 900ms cubic-bezier(0.2,0.9,0.2,1) both"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]",
					style: { animation: "claarvia-shimmer 3.5s ease-out 700ms infinite both" }
				}),
				granted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.12)] px-3 py-1 font-mono text-[11px] text-[color:var(--auth-signal)]",
					style: { animation: "claarvia-fade-up 400ms ease-out both" },
					children: "+ Access granted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display inline-flex items-baseline gap-1 text-xl font-bold tracking-[0.22em] text-[color:var(--foreground)]",
						children: ["CLAARVIA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 w-1.5 rounded-full bg-[color:var(--auth-cyan)]",
							style: { boxShadow: "0 0 12px 3px rgba(34,211,238,0.6)" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-[color:var(--muted-foreground)]",
						children: mode === "otp" ? "Verify your merchant email" : "Behavioral intelligence for modern commerce"
					})]
				}),
				mode !== "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-5 grid grid-cols-2 rounded-full border border-[color:var(--auth-glass-border)] bg-[rgba(255,255,255,0.04)] p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "auth-gradient-fill absolute inset-y-1 w-[calc(50%-4px)] rounded-full opacity-90",
						style: {
							left: mode === "login" ? "4px" : "calc(50%)",
							transition: "left 320ms cubic-bezier(0.34,1.3,0.5,1)",
							boxShadow: "0 0 32px -6px rgba(124,108,255,0.5)"
						}
					}), ["login", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setErrorMessage(null);
							setMode(m);
						},
						className: "relative z-10 rounded-full py-2 text-xs font-medium tracking-wide auth-spring transition-colors",
						style: { color: mode === m ? "#05060b" : "var(--muted-foreground)" },
						children: m === "login" ? "Log in" : "Sign up"
					}, m))]
				}),
				errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-center text-xs text-rose-300",
					children: errorMessage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-3.5",
					style: { animation: "claarvia-fade-up 340ms ease-out both" },
					children: [
						mode === "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-center text-xs text-indigo-200",
								children: [
									"A 6-digit verification code was sent to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: fields.email
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "otp",
								label: "Enter 6-Digit OTP",
								type: "text",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 16 }),
								value: otp,
								onChange: (v) => {
									setErrorMessage(null);
									if (v.length <= 6) setOtp(v);
								}
							})]
						}),
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "name",
								label: "Full Name",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 16 }),
								value: fields.name,
								onChange: set("name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "store_url",
								label: "Store Website URL",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 }),
								value: fields.store_url,
								onChange: set("store_url")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "whatsapp_number",
								label: "WhatsApp Number (e.g. +91...)",
								type: "tel",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }),
								value: fields.whatsapp_number,
								onChange: set("whatsapp_number")
							})
						] }),
						mode !== "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "email",
							label: mode === "signup" ? "Work email" : "Email",
							type: "email",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { size: 16 }),
							value: fields.email,
							onChange: set("email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "password",
							label: "Password",
							type: showPw ? "text" : "password",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }),
							value: fields.password,
							onChange: set("password"),
							trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPw((s) => !s),
								className: "text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]",
								"aria-label": showPw ? "Hide password" : "Show password",
								children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
							})
						})] }),
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "auth-gradient-fill h-full rounded-full",
								style: {
									width: `${strength / 4 * 100}%`,
									transition: "width 300ms cubic-bezier(0.34,1.3,0.5,1)"
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "confirm",
							label: "Confirm password",
							type: "password",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }),
							value: fields.confirm,
							onChange: set("confirm")
						})] }),
						mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRemember((r) => !r),
								className: "flex items-center gap-2 text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-4 w-4 place-items-center rounded-[6px] border auth-spring transition-all",
									style: {
										borderColor: remember ? "transparent" : "var(--auth-glass-border)",
										backgroundImage: remember ? "var(--auth-gradient-primary)" : "none",
										transform: remember ? "scale(1.05)" : "scale(1)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "10",
										height: "10",
										viewBox: "0 0 12 12",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 6.4 4.6 9 10 3.2",
											stroke: "#05060b",
											strokeWidth: "1.8",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											style: {
												strokeDasharray: 14,
												strokeDashoffset: remember ? 0 : 14,
												transition: "stroke-dashoffset 260ms ease-out"
											}
										})
									})
								}), "Remember me"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-[color:var(--muted-foreground)] hover:text-[color:var(--auth-cyan)]",
								children: "Forgot password?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pt-2",
							children: [pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "pointer-events-none absolute inset-0 rounded-xl border border-[rgba(52,211,153,0.6)]",
								style: { animation: "claarvia-pulse-ring 900ms ease-out forwards" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "auth-gradient-fill relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-[#05060b] auth-spring transition-all hover:-translate-y-0.5",
								style: {
									animation: "claarvia-sweep 6s linear infinite alternate",
									boxShadow: "0 10px 30px -10px rgba(124,108,255,0.7)"
								},
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#05060b]/30 border-t-[#05060b]" }), mode === "otp" ? "Verifying code…" : mode === "signup" ? "Creating account & sending OTP…" : "Authenticating…"]
								}) : mode === "otp" ? "Verify & Enter Dashboard" : mode === "login" ? "Log in" : "Create account"
							})]
						}),
						mode === "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setErrorMessage(null);
								setMode("signup");
							},
							className: "w-full text-center text-xs text-[color:var(--muted-foreground)] hover:text-white transition",
							children: "← Wrong email? Edit details"
						}),
						mode !== "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-center gap-2.5 rounded-xl border border-[color:var(--auth-glass-border)] bg-[rgba(255,255,255,0.04)] py-3 text-sm text-[color:var(--foreground)] auth-spring transition-colors hover:bg-[rgba(255,255,255,0.08)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 48 48",
								"aria-hidden": true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#FFC107",
										d: "M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#FF3D00",
										d: "m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#4CAF50",
										d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#1976D2",
										d: "M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C36.9 40.2 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"
									})
								]
							}), "Continue with Google"]
						})
					]
				}, mode),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-[11px] text-[color:var(--muted-foreground)]",
					children: "Built for modern commerce · SOC2-minded · GDPR ready"
				})
			]
		}), mode !== "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-5 text-center text-xs text-[color:var(--muted-foreground)]",
			children: [mode === "login" ? "Don't have an account? " : "Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setErrorMessage(null);
					setMode(mode === "login" ? "signup" : "login");
				},
				className: "text-[color:var(--auth-cyan)] transition-opacity hover:opacity-80",
				children: mode === "login" ? "Sign up" : "Log in"
			})]
		})]
	});
}
function LoginPage() {
	const [introDone, setIntroDone] = (0, import_react.useState)(true);
	const [duration, setDuration] = (0, import_react.useState)(4600);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		setDuration(window.innerWidth < 768 ? 2500 : 4600);
		setIntroDone(false);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#05060b_0%,#0b0f1e_100%)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full",
					style: {
						background: "radial-gradient(circle, rgba(109,93,252,0.15), transparent 65%)",
						animation: "claarvia-bloom 18s ease-in-out infinite"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -right-40 -bottom-56 h-[42rem] w-[42rem] rounded-full",
					style: {
						background: "radial-gradient(circle, rgba(34,211,238,0.11), transparent 65%)",
						animation: "claarvia-bloom 22s ease-in-out infinite reverse"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 transition-opacity duration-1000",
				style: { opacity: introDone ? .7 : 0 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeuralMesh, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbientChips, { active: introDone }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-screen items-center justify-center py-16 transition-all duration-1000",
				style: {
					opacity: introDone ? 1 : 0,
					transform: introDone ? "scale(1)" : "scale(1.04)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "sr-only",
					children: "Claarvia — log in or sign up"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, {})]
			}),
			!introDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroSequence, {
				duration,
				onDone: () => setIntroDone(true)
			})
		]
	});
}
//#endregion
export { LoginPage as component };
