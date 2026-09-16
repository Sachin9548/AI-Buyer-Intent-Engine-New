import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Building2, P as CircleCheck, b as LogOut, c as Sparkles, d as ShieldCheck, g as Phone, r as User, y as Mail } from "../_libs/lucide-react.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BfMHpkxs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const navigate = useNavigate();
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const API_URL = typeof processModule !== "undefined" && processModule.env.NEXT_PUBLIC_API_URL || "https://api.claarvia.com/api";
	(0, import_react.useEffect)(() => {
		const token = localStorage.getItem("claarvia_token");
		if (!token) {
			navigate({ to: "/login" });
			return;
		}
		fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
			if (!res.ok) throw new Error("Unauthorized");
			return res.json();
		}).then((data) => {
			setUser(data.user);
			setLoading(false);
		}).catch(() => {
			localStorage.removeItem("claarvia_token");
			navigate({ to: "/login" });
		});
	}, [navigate, API_URL]);
	const handleLogout = () => {
		localStorage.removeItem("claarvia_token");
		navigate({ to: "/login" });
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#05060b] flex flex-col items-center justify-center text-slate-400 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500 mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium tracking-wide animate-pulse text-slate-300",
			children: "Loading your verified merchant dashboard…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#05060b] text-slate-100 font-sans px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-1/2 -right-40 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between pb-8 border-b border-white/[0.08]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-bold tracking-[0.22em] text-white",
							children: "CLAARVIA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
							children: "BIME 3.0"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleLogout,
						className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.07] transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 }), "Log out"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mt-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "Merchant Account Verified & Active"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-2xl sm:text-3xl font-bold text-white tracking-tight",
									children: [
										"Welcome aboard, ",
										user?.name || "Merchant",
										"! 🎉"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-slate-400 text-sm leading-relaxed",
									children: [
										"Thank you for choosing ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-indigo-400",
											children: "Claarvia BIME"
										}),
										". Your merchant account has been activated successfully. Our specialized e-commerce onboarding team is reviewing your store setup and will connect with you shortly on your registered WhatsApp number to assist with zero-friction integration."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] flex items-start gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										className: "text-indigo-400 shrink-0 mt-0.5",
										size: 18
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-slate-300 leading-relaxed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-white block mb-0.5",
											children: "Autonomous Setup In Progress"
										}), "Your unique AI buyer intent engine models are being configured for your store domain. No action required from your side right now."]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-7 shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xs uppercase font-mono tracking-wider text-slate-400 mb-5 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 14,
									className: "text-cyan-400"
								}), "Verified Store Profile"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-slate-500 mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 14 }), " Full Name"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-slate-100",
											children: user?.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-slate-500 mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }), " Registered Email"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-slate-100",
											children: user?.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-slate-500 mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 14 }), " Store Website"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: user?.store_url?.startsWith("http") ? user.store_url : `https://${user?.store_url}`,
											target: "_blank",
											rel: "noreferrer",
											className: "text-sm font-semibold text-cyan-400 hover:underline truncate block",
											children: user?.store_url
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-slate-500 mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 }), " WhatsApp Number"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-slate-100",
											children: user?.whatsapp_number
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
							className: "text-center pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-500",
								children: [
									"Questions or immediate assistance? Contact us at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:support.claarvia@gmail.com",
										className: "text-slate-400 underline hover:text-white transition",
										children: "support.claarvia@gmail.com"
									})
								]
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
