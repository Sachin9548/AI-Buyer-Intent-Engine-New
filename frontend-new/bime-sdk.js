/**
 * Claarvia / BIME 3.0 — Production Master SDK (Auto-Discovery + Full Signal Engine)
 * Zero-Config | Universal Platform | Mobile-First | Modern Toast UI
 */
(function () {
  "use strict";

  // Auto-read storeId from script tag attribute [data-store-id]
  const currentScript =
    document.currentScript || document.querySelector("script[data-store-id]");
  const defaultStoreId = currentScript
    ? currentScript.getAttribute("data-store-id")
    : null;

  const BIME_CONFIG = {
    endpoint: "https://api.claarvia.com/api/ingestion/event",
    batchSize: 5,
    buffer: [],
    storeId: defaultStoreId || "default_store",
    pageStart: Date.now(),
    maxScroll: 0,
    isMobile:
      /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768,
    isTouch: "ontouchstart" in window,
    keyboardOpen: false,
    initialViewportH: window.innerHeight,
  };

  // Helper: Find DOM Elements by Keywords
  function findElementsByText(
    keywords,
    selectors = 'button, a, input[type="submit"], [role="button"]',
  ) {
    const matched = [];
    try {
      const elements = document.querySelectorAll(selectors);
      for (let el of elements) {
        const text = (el.innerText || el.value || "").toLowerCase();
        if (keywords.some((kw) => text.includes(kw))) {
          matched.push(el);
        }
      }
    } catch (e) {}
    return matched;
  }

  // Helper: Auto-Detect Product Price & Currency from Metadata / JSON-LD
  function autoDetectProductInfo() {
    try {
      // Layer 1: JSON-LD Structured SEO Data
      const jsonLds = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      for (let script of jsonLds) {
        try {
          const data = JSON.parse(script.innerText);
          const productData = Array.isArray(data)
            ? data.find((i) => i["@type"] === "Product" || i.offers)
            : data;
          if (productData && productData.offers) {
            const offer = Array.isArray(productData.offers)
              ? productData.offers[0]
              : productData.offers;
            if (offer && offer.price) {
              return {
                price: String(offer.price),
                currency: offer.priceCurrency || "USD",
                source: "json_ld",
              };
            }
          }
        } catch (e) {}
      }

      // Layer 2: Shopify Analytics Object
      if (window.ShopifyAnalytics?.meta?.product) {
        const p = window.ShopifyAnalytics.meta.product;
        const rawPrice = p.price
          ? p.price > 1000
            ? p.price / 100
            : p.price
          : null;
        return {
          price: String(rawPrice),
          currency: window.Shopify?.currency?.active || "USD",
          source: "shopify_meta",
        };
      }

      // Layer 3: OpenGraph Meta Tags
      const ogPrice = document.querySelector(
        'meta[property="og:price:amount"]',
      );
      if (ogPrice) {
        const ogCurrency = document.querySelector(
          'meta[property="og:price:currency"]',
        );
        return {
          price: ogPrice.content,
          currency: ogCurrency ? ogCurrency.content : "USD",
          source: "og_meta",
        };
      }
    } catch (err) {}
    return null;
  }

  const BIME = {
    init: function (overrideStoreId) {
      try {
        if (overrideStoreId && typeof overrideStoreId === "string") {
          BIME_CONFIG.storeId = overrideStoreId;
        }

        console.log(
          "🚀 Claarvia BIME Master SDK Initialized for:",
          BIME_CONFIG.storeId,
        );

        const productInfo = autoDetectProductInfo();

        // 1. Initial Page View Tracking
        this.track("page_view", {
          url: window.location.href,
          path: window.location.pathname,
          referrer: document.referrer || "direct",
          is_mobile: BIME_CONFIG.isMobile,
          product_info: productInfo,
        });

        // 2. Auto-Discovery & Binding: Size Chart / Fit Guides
        const sizeKeywords = [
          "size chart",
          "size guide",
          "find your size",
          "fit guide",
          "size help",
        ];
        const sizeElements = findElementsByText(sizeKeywords);

        sizeElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            BIME.track("hover_size_chart", {
              element: "size_chart",
              source: "auto_discovery",
            });
          });

          // Mobile Observer for Size Guide
          if (BIME_CONFIG.isMobile && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    this.sizeTimer = setTimeout(() => {
                      BIME.track("hover_size_chart", {
                        element: "size_chart_mobile",
                        source: "mobile_observer",
                      });
                    }, 2500);
                  } else {
                    clearTimeout(this.sizeTimer);
                  }
                });
              },
              { threshold: 0.5 },
            );
            observer.observe(el);
          }
        });

        // 3. Auto-Discovery & Binding: Add to Cart Buttons
        const cartKeywords = [
          "add to cart",
          "add to bag",
          "buy now",
          "buy it now",
        ];
        const cartElements = findElementsByText(cartKeywords);
        cartElements.forEach((el) => {
          el.addEventListener("click", () => {
            BIME.track("add_to_cart_click", { product_info: productInfo });
          });
        });

        // 4. Setup All Signal Listeners
        this.setupSignals();
      } catch (err) {
        console.warn("Claarvia SDK init warning:", err);
      }
    },

    setupSignals: function () {
      try {
        let lastScrollY = window.scrollY;
        let lastScrollTime = Date.now();
        let scrollPauseTimer;
        let lastActivity = Date.now();

        let slowScrollTracked = false;
        let slowScrollTimer;

        // Activity Tracker for User Idle
        ["click", "scroll", "touchstart", "keydown"].forEach((evt) => {
          document.addEventListener(
            evt,
            () => {
              lastActivity = Date.now();
            },
            { passive: true },
          );
        });

        let idleTracked = false;

        setInterval(() => {
          const idleSecs = Math.round((Date.now() - lastActivity) / 1000);
          if (idleSecs >= 30 && !idleTracked) {
            idleTracked = true;
            BIME.track("user_idle", {
              idle_seconds: idleSecs,
              time_on_page: Math.round(
                (Date.now() - BIME_CONFIG.pageStart) / 1000,
              ),
              scroll_depth: BIME_CONFIG.maxScroll,
            });
          }
          if (idleSecs < 5) idleTracked = false;
        }, 15000);

        // Scroll Signals: Milestones, Backward, Pause, and Scroll Velocity
        window.addEventListener(
          "scroll",
          () => {
            const now = Date.now();
            const totalScrollable =
              document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollable <= 0) return;

            const currentScrollY = window.scrollY;
            const pct = Math.round((currentScrollY / totalScrollable) * 100);

            // Velocity
            const dy = Math.abs(currentScrollY - lastScrollY);
            const dt = now - lastScrollTime;
            const velocity = dy / (dt || 1);

            if (velocity < 0.3 && dy > 5 && !slowScrollTracked) {
              slowScrollTracked = true;
              BIME.track("slow_scroll", {
                position_pct: pct,
                velocity: parseFloat(velocity.toFixed(3)),
              });
              clearTimeout(slowScrollTimer);
              slowScrollTimer = setTimeout(() => {
                slowScrollTracked = false;
              }, 10000);
            }

            // Backward scroll
            if (currentScrollY - lastScrollY < -100) {
              BIME.track("scroll_backward", {
                from_pct: Math.round((lastScrollY / totalScrollable) * 100),
                to_pct: pct,
              });
            }

            // Milestones
            if (pct > BIME_CONFIG.maxScroll) {
              BIME_CONFIG.maxScroll = pct;
              if ([25, 50, 75, 90].includes(pct)) {
                BIME.track("scroll_milestone", { depth: pct });
              }
            }

            // Pause
            clearTimeout(scrollPauseTimer);
            scrollPauseTimer = setTimeout(() => {
              BIME.track("scroll_pause", { position_pct: pct });
            }, 2000);

            lastScrollY = currentScrollY;
            lastScrollTime = now;
          },
          { passive: true },
        );

        // Touch Signals: Long Press & Pinch Zoom
        if (BIME_CONFIG.isTouch) {
          let touchStartY = 0;
          let touchStartTime = 0;

          document.addEventListener(
            "touchstart",
            (e) => {
              touchStartY = e.touches[0].clientY;
              touchStartTime = Date.now();
            },
            { passive: true },
          );

          document.addEventListener(
            "touchend",
            (e) => {
              const duration = Date.now() - touchStartTime;
              const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

              if (duration > 500 && dy < 10) {
                BIME.track("long_press", {
                  duration_ms: duration,
                  position_pct: Math.round(
                    ((touchStartY + window.scrollY) /
                      document.body.scrollHeight) *
                      100,
                  ),
                });
              }
            },
            { passive: true },
          );

          let pinchTracked = false;

          document.addEventListener(
            "touchmove",
            (e) => {
              if (e.touches && e.touches.length === 2 && !pinchTracked) {
                pinchTracked = true;
                BIME.track("pinch_zoom", {
                  position_pct: Math.round(
                    (window.scrollY / document.body.scrollHeight) * 100,
                  ),
                });
              }
            },
            { passive: true },
          );
        }

        // Keyboard Open Detection
        if (BIME_CONFIG.isMobile) {
          window.addEventListener("resize", () => {
            const diff = BIME_CONFIG.initialViewportH - window.innerHeight;
            if (diff > 150) {
              BIME_CONFIG.keyboardOpen = true;
              BIME.track("keyboard_open", {
                is_checkout: window.location.pathname.includes("checkout"),
                time_on_page: Math.round(
                  (Date.now() - BIME_CONFIG.pageStart) / 1000,
                ),
              });
            } else {
              BIME_CONFIG.keyboardOpen = false;
            }
          });
        }

        // Tab Visibility
        document.addEventListener("visibilitychange", () => {
          BIME.track(document.hidden ? "tab_hidden" : "tab_visible", {
            time_on_page: Math.round(
              (Date.now() - BIME_CONFIG.pageStart) / 1000,
            ),
          });
        });

        // Desktop Exit Intent
        if (!BIME_CONFIG.isMobile) {
          document.addEventListener("mouseleave", (e) => {
            if (e.clientY < 0) {
              BIME.track("exit_intent", {
                time_on_page: Math.round(
                  (Date.now() - BIME_CONFIG.pageStart) / 1000,
                ),
                scroll_depth: BIME_CONFIG.maxScroll,
              });
            }
          });
        }

        // Mobile Back Button Capture
        if (
          BIME_CONFIG.isMobile &&
          window.history &&
          window.history.pushState
        ) {
          try {
            window.history.pushState(null, "", window.location.href);
            window.addEventListener("popstate", () => {
              BIME.track("back_button_click", {
                time_on_page: Math.round(
                  (Date.now() - BIME_CONFIG.pageStart) / 1000,
                ),
                max_scroll: BIME_CONFIG.maxScroll,
              });
            });
          } catch (e) {}
        }

        // Session End Tracking & Flush Buffer
        window.addEventListener("beforeunload", () => {
          BIME.track("session_end", {
            time_on_page: Math.round(
              (Date.now() - BIME_CONFIG.pageStart) / 1000,
            ),
            max_scroll: BIME_CONFIG.maxScroll,
            device: BIME_CONFIG.isMobile ? "mobile" : "desktop",
          });
          BIME.send();
        });

        // Global Click Tracker
        document.addEventListener(
          "click",
          (e) => {
            BIME.track("click", {
              tag: e.target.tagName,
              id: e.target.id || "no-id",
              text: (e.target.innerText || "").substring(0, 30),
            });
          },
          { passive: true },
        );
      } catch (err) {}
    },

    track: function (type, metadata) {
      try {
        const event = {
          store_id: BIME_CONFIG.storeId,
          event_type: type,
          metadata: metadata || {},
          timestamp: new Date().toISOString(),
        };

        BIME_CONFIG.buffer.push(event);

        if (BIME_CONFIG.buffer.length >= BIME_CONFIG.batchSize) {
          this.send();
        }
      } catch (err) {}
    },

    send: function () {
      try {
        if (BIME_CONFIG.buffer.length === 0) return;

        const dataToSend = BIME_CONFIG.buffer;
        BIME_CONFIG.buffer = [];

        fetch(BIME_CONFIG.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
          keepalive: true,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.action && data.action !== "none") {
              this.triggerAction(data.action, data.message || "");
            }
          })
          .catch(() => {});
      } catch (err) {}
    },

    triggerAction: function (action, message) {
      try {
        console.log("🎯 BIME Evaluated Action:", action, message);

        if (window.BIME_ACTION_SHOWN) {
          console.log(
            "ℹ️ Action blocked: Already shown in this session. Use BIME.resetAction() to test again.",
          );
          return;
        }
        if (BIME_CONFIG.keyboardOpen) {
          console.log("ℹ️ Action blocked: Mobile keyboard is open.");
          return;
        }
        if (window.location.pathname.includes("/checkout")) {
          console.log("ℹ️ Action blocked: Checkout page.");
          return;
        }

        switch (action) {
          case "show_size_quiz":
            console.log("🎨 Rendering Sleek Size Quiz Toast...");
            this.showSizeQuiz();
            break;
          case "show_discount":
            console.log("🎨 Rendering Sleek Discount Toast...");
            this.showDiscount(message);
            break;
          case "show_trust":
            console.log("🎨 Rendering Sleek Trust Toast...");
            this.showTrust();
            break;
          default:
            console.log("🎨 Rendering Sleek Generic Toast...");
            this.showGeneric(message);
            break;
        }

        window.BIME_ACTION_SHOWN = true;
      } catch (err) {
        console.error("🚨 BIME Render Error in triggerAction:", err);
      }
    },

    // Modern SaaS Toast Shadow Container (Compact & Ultra-Clean)
    createShadowContainer: function () {
      let host = document.getElementById("bime-nudge-host");
      if (host) host.remove();

      host = document.createElement("div");
      host.id = "bime-nudge-host";

      // Force Container Toast Positioning
      host.style.cssText =
        "position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none !important; z-index: 2147483647 !important; display: block !important;";

      const target = document.body || document.documentElement;
      target.appendChild(host);

      const shadow = host.attachShadow({ mode: "open" });
      const isMobile = BIME_CONFIG.isMobile;

      const baseCss = `
        :host { display: block !important; }
        * { box-sizing: border-box !important; }
        
        .toast-card {
          position: fixed !important;
          pointer-events: auto !important;
          ${
            isMobile
              ? "bottom: 16px !important; left: 16px !important; right: 16px !important; width: auto !important; max-width: 400px !important; margin: 0 auto !important;"
              : "bottom: 24px !important; right: 24px !important; width: 310px !important;"
          }
          background: #ffffff !important;
          color: #0f172a !important;
          padding: 16px !important;
          border-radius: 12px !important;
          border: 1px solid #f1f5f9 !important;
          box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -4px rgba(15, 23, 42, 0.05) !important;
          z-index: 2147483647 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          animation: bimeToastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @keyframes bimeToastIn {
          from { transform: translateY(20px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .toast-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 8px !important;
        }

        .toast-title {
          font-weight: 600 !important;
          font-size: 13.5px !important;
          color: #0f172a !important;
          margin: 0 !important;
          line-height: 1.4 !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .close-x {
          background: transparent !important;
          border: none !important;
          color: #94a3b8 !important;
          font-size: 16px !important;
          cursor: pointer !important;
          padding: 2px 6px !important;
          line-height: 1 !important;
          border-radius: 4px !important;
          transition: color 0.15s !important;
        }
        .close-x:hover { color: #0f172a !important; background: #f8fafc !important; }

        .toast-btn {
          width: 100% !important;
          background: #4f46e5 !important;
          color: #ffffff !important;
          border: none !important;
          padding: 9px 12px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          margin-top: 10px !important;
          display: block !important;
          text-align: center !important;
          transition: background 0.15s !important;
        }
        .toast-btn:hover { background: #4338ca !important; }

        .input-inline-group {
          display: flex !important;
          gap: 6px !important;
          margin-top: 8px !important;
        }

        .input-sm {
          flex: 1 !important;
          width: 50% !important;
          padding: 7px 10px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 6px !important;
          font-size: 12.5px !important;
          outline: none !important;
          background: #f8fafc !important;
          color: #0f172a !important;
        }
        .input-sm:focus { border-color: #4f46e5 !important; background: #ffffff !important; }

        .trust-row {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          font-size: 12px !important;
          color: #334155 !important;
          margin-bottom: 5px !important;
          font-weight: 500 !important;
        }
        .trust-icon { color: #16a34a !important; font-weight: bold !important; }
      `;

      return { host, shadow, baseCss };
    },

    // Testing Helper: Reset Action Flag in Console
    resetAction: function () {
      window.BIME_ACTION_SHOWN = false;
      const host = document.getElementById("bime-nudge-host");
      if (host) host.remove();
      console.log("🔄 BIME Action Flag Reset! You can test triggers again.");
    },

    // Treatment 1: Compact Size Quiz Toast
    showSizeQuiz: function () {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
        <style>${baseCss}</style>
        <div class="toast-card">
          <div class="toast-header">
            <span class="toast-title">📏 Find Your Perfect Fit</span>
            <button class="close-x" id="bime-close">×</button>
          </div>
          
          <div id="quiz-form">
            <div class="input-inline-group">
              <input type="number" id="bime-height" class="input-sm" placeholder="Height (cm)" />
              <input type="number" id="bime-weight" class="input-sm" placeholder="Weight (kg)" />
            </div>
            <button class="toast-btn" id="bime-calc">Check My Size</button>
          </div>

          <div id="quiz-result" style="display:none; text-align: center; padding-top: 4px;">
            <p style="font-size: 14px; font-weight: 700; color: #16a34a; margin: 0 0 2px 0;" id="size-text"></p>
            <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0;" id="fit-text"></p>
            <button class="toast-btn" id="bime-done" style="margin-top:4px;">Got It</button>
          </div>
        </div>
      `;

      shadow.getElementById("bime-calc").addEventListener("click", () => {
        const h = parseFloat(shadow.getElementById("bime-height").value);
        const w = parseFloat(shadow.getElementById("bime-weight").value);

        if (!h || !w || h < 100 || h > 250 || w < 30 || w > 200) {
          shadow.getElementById("bime-height").style.borderColor = "#ef4444";
          shadow.getElementById("bime-weight").style.borderColor = "#ef4444";
          return;
        }

        let size = "M";
        if (h < 160) {
          size = w < 55 ? "XS" : w < 68 ? "S" : w < 80 ? "M" : "L";
        } else if (h < 170) {
          size = w < 60 ? "S" : w < 72 ? "M" : w < 85 ? "L" : "XL";
        } else if (h < 180) {
          size = w < 65 ? "S" : w < 78 ? "M" : w < 92 ? "L" : "XL";
        } else {
          size = w < 72 ? "M" : w < 88 ? "L" : w < 100 ? "XL" : "XXL";
        }

        const looseSize = {
          XS: "S",
          S: "M",
          M: "L",
          L: "XL",
          XL: "XXL",
          XXL: "XXL",
        }[size];
        const snugSize = {
          XS: "XS",
          S: "XS",
          M: "S",
          L: "M",
          XL: "L",
          XXL: "XL",
        }[size];

        shadow.getElementById("quiz-form").style.display = "none";
        shadow.getElementById("quiz-result").style.display = "block";
        shadow.getElementById("size-text").innerHTML =
          `Recommended: <b>${size}</b>`;
        shadow.getElementById("fit-text").innerHTML =
          `Loose fit: ${looseSize} &bull; Snug fit: ${snugSize}`;

        BIME.track("size_quiz_completed", {
          height: h,
          weight: w,
          calculated_size: size,
        });
      });

      shadow.getElementById("bime-close").addEventListener("click", () => {
        BIME.track("nudge_closed", { action: "show_size_quiz" });
        host.remove();
      });

      setTimeout(() => {
        const doneBtn = shadow.getElementById("bime-done");
        if (doneBtn) {
          doneBtn.addEventListener("click", () => {
            BIME.track("nudge_clicked", { action: "show_size_quiz" });
            host.remove();
          });
        }
      }, 50);
    },

    // Treatment 2: Sleek Discount Timer Toast
    showDiscount: function (message) {
      const { host, shadow, baseCss } = this.createShadowContainer();
      let secondsLeft = 300;

      shadow.innerHTML = `
        <style>${baseCss}
          .badge-timer {
            background: #fef2f2 !important;
            color: #dc2626 !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            padding: 3px 8px !important;
            border-radius: 12px !important;
            border: 1px solid #fecaca !important;
          }
          .coupon-code {
            background: #f0fdf4 !important;
            border: 1.5px dashed #16a34a !important;
            color: #15803d !important;
            font-size: 16px !important;
            font-weight: 800 !important;
            letter-spacing: 2px !important;
            padding: 8px !important;
            text-align: center !important;
            border-radius: 6px !important;
            margin-top: 8px !important;
          }
        </style>
        <div class="toast-card">
          <div class="toast-header">
            <span class="toast-title">🏷️ ${message || "Claim 10% Off Today"}</span>
            <span class="badge-timer" id="timer-text">05:00</span>
            <button class="close-x" id="bime-close">×</button>
          </div>

          <div id="claim-section">
            <button class="toast-btn" id="bime-claim">Claim Discount</button>
          </div>

          <div id="coupon-box" style="display:none;">
            <div class="coupon-code">SAVED10</div>
            <p style="font-size:11px; color:#64748b; text-align:center; margin:4px 0 0 0;">Code copied! Apply at checkout</p>
            <button class="toast-btn" id="bime-done" style="margin-top:8px;">Got It</button>
          </div>
        </div>
      `;

      const timerInterval = setInterval(() => {
        secondsLeft--;
        const m = Math.floor(secondsLeft / 60)
          .toString()
          .padStart(2, "0");
        const s = (secondsLeft % 60).toString().padStart(2, "0");
        const timerEl = shadow.getElementById("timer-text");
        if (timerEl) timerEl.innerText = `${m}:${s}`;
        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          BIME.track("discount_expired", { action: "show_discount" });
          host.remove();
        }
      }, 1000);

      shadow.getElementById("bime-claim").addEventListener("click", () => {
        clearInterval(timerInterval);

        // Actually copy karo clipboard mein
        navigator.clipboard?.writeText("SAVED10").catch(() => {});

        shadow.getElementById("claim-section").style.display = "none";
        shadow.getElementById("coupon-box").style.display = "block";
        shadow.getElementById("timer-text").style.display = "none";
        BIME.track("nudge_clicked", { action: "show_discount" });
      });

      shadow.getElementById("bime-close").addEventListener("click", () => {
        clearInterval(timerInterval);
        BIME.track("nudge_closed", { action: "show_discount" });
        host.remove();
      });

      setTimeout(() => {
        const doneBtn = shadow.getElementById("bime-done");
        if (doneBtn) {
          doneBtn.addEventListener("click", () => {
            host.remove();
          });
        }
      }, 50);
    },

    // Treatment 3: Sleek Trust Badge Toast
    showTrust: function () {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
        <style>${baseCss}</style>
        <div class="toast-card">
          <div class="toast-header">
            <span class="toast-title">🛡️ Shop with Confidence</span>
            <button class="close-x" id="bime-close">×</button>
          </div>
          <div class="trust-row"><span class="trust-icon">✓</span> 7-Day Hassle-Free Returns</div>
          <div class="trust-row"><span class="trust-icon">✓</span> 100% Original & Quality Assured</div>
          <div class="trust-row"><span class="trust-icon">✓</span> Cash on Delivery Available</div>
          <button class="toast-btn" id="bime-continue">Continue Shopping</button>
        </div>
      `;

      shadow.getElementById("bime-continue").addEventListener("click", () => {
        BIME.track("nudge_clicked", { action: "show_trust" });
        host.remove();
      });

      shadow.getElementById("bime-close").addEventListener("click", () => {
        BIME.track("nudge_closed", { action: "show_trust" });
        host.remove();
      });
    },

    // Fallback Treatment: Sleek Generic Toast
    showGeneric: function (message) {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
        <style>${baseCss}</style>
        <div class="toast-card">
          <div class="toast-header">
            <span class="toast-title">💬 Need any assistance?</span>
            <button class="close-x" id="bime-close">×</button>
          </div>
          <p style="font-size:12.5px; color:#475569; margin:0 0 6px 0;">${message || "We are here to help you pick the best item!"}</p>
          <button class="toast-btn" id="bime-cta">Quick Help</button>
        </div>
      `;

      shadow.getElementById("bime-cta").addEventListener("click", () => {
        BIME.track("nudge_clicked", { action: "generic" });
        host.remove();
      });

      shadow.getElementById("bime-close").addEventListener("click", () => {
        BIME.track("nudge_closed", { action: "generic" });
        host.remove();
      });
    },
  };

  // Expose Global Object
  window.BIME = BIME;

  // Auto-init on load if data-store-id is present on script tag
  if (defaultStoreId) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => BIME.init());
    } else {
      BIME.init();
    }
  }
})();
