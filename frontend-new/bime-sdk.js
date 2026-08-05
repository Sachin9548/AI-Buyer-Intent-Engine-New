/**
 * Claarvia / BIME 3.0 — Production Master SDK (Auto-Discovery + Full Signal Engine)
 * Zero-Config | Universal Platform | Mobile-First
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

        // 4. Setup All Signal Listeners (Issue 1 - 5 Fixes)
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

        // Activity Tracker for User Idle (Issue 4 Fix)
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
            idleTracked = true; // Sirf ek baar track karo
            BIME.track("user_idle", {
              idle_seconds: idleSecs,
              time_on_page: Math.round(
                (Date.now() - BIME_CONFIG.pageStart) / 1000,
              ),
              scroll_depth: BIME_CONFIG.maxScroll,
            });
          }
          // User activity aaye toh reset karo
          if (idleSecs < 5) idleTracked = false;
        }, 15000);

        // Scroll Signals: Milestones, Backward, Pause, and Scroll Velocity (Issue 1 Fix)

        window.addEventListener(
          "scroll",
          () => {
            const now = Date.now();
            const totalScrollable =
              document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollable <= 0) return;

            const currentScrollY = window.scrollY; // Pehle save karo
            const pct = Math.round((currentScrollY / totalScrollable) * 100);

            // Velocity — lastScrollY use karo BEFORE update
            const dy = Math.abs(currentScrollY - lastScrollY);
            const dt = now - lastScrollTime;
            const velocity = dy / (dt || 1);

            if (velocity < 0.3 && dy > 5 && !slowScrollTracked) {
              slowScrollTracked = true;
              BIME.track("slow_scroll", {
                position_pct: pct,
                velocity: parseFloat(velocity.toFixed(3)),
              });
              // 10 seconds baad reset — nayi position pe track kar sake
              clearTimeout(slowScrollTimer);
              slowScrollTimer = setTimeout(() => {
                slowScrollTracked = false;
              }, 10000);
            }
            // Backward scroll — lastScrollY use karo BEFORE update
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

            // Ab update karo — SABSE LAST MEIN
            lastScrollY = currentScrollY;
            lastScrollTime = now;
          },
          { passive: true },
        );

        // Touch Signals: Long Press & Pinch Zoom (Issue 2 Fix)
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

          let pinchTracked = false; // Session mein ek baar kaafi hai

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

        // Keyboard Open Detection (Issue 3 Fix)
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

        // Session End Tracking & Flush Buffer (Issue 5 Fix)
        window.addEventListener("beforeunload", () => {
          BIME.track("session_end", {
            time_on_page: Math.round(
              (Date.now() - BIME_CONFIG.pageStart) / 1000,
            ),
            max_scroll: BIME_CONFIG.maxScroll,
            device: BIME_CONFIG.isMobile ? "mobile" : "desktop",
          });
          BIME.send(); // Force send buffer immediately
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
            console.log("🎨 Rendering Size Quiz UI Card Now...");
            this.showSizeQuiz();
            break;
          case "show_discount":
            console.log("🎨 Rendering Discount UI Card Now...");
            this.showDiscount(message);
            break;
          case "show_trust":
            console.log("🎨 Rendering Trust UI Card Now...");
            this.showTrust();
            break;
          default:
            console.log("🎨 Rendering Generic UI Card Now...");
            this.showGeneric(message);
            break;
        }

        window.BIME_ACTION_SHOWN = true;
      } catch (err) {
        console.error("🚨 BIME Render Error in triggerAction:", err);
      }
    },

    createShadowContainer: function () {
      let host = document.getElementById("bime-nudge-host");
      if (host) host.remove();

      host = document.createElement("div");
      host.id = "bime-nudge-host";

      // Force Host Container to float over ALL Shopify themes
      host.style.cssText =
        "position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none !important; z-index: 2147483647 !important; display: block !important;";

      const target = document.body || document.documentElement;
      target.appendChild(host);

      const shadow = host.attachShadow({ mode: "open" });
      const isMobile = BIME_CONFIG.isMobile;

      const baseCss = `
        :host { display: block !important; }
        * { box-sizing: border-box !important; }
        .nudge-card {
          position: fixed !important;
          pointer-events: auto !important;
          ${isMobile ? "bottom: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; border-radius: 16px 16px 0 0 !important;" : "bottom: 25px !important; right: 25px !important; width: 340px !important; border-radius: 12px !important; border-left: 5px solid #4F46E5 !important;"}
          background-color: #ffffff !important;
          color: #111827 !important;
          padding: 20px !important;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3) !important;
          z-index: 2147483647 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }
        .nudge-title { font-weight: 700 !important; font-size: 15px !important; color: #111827 !important; margin: 0 0 10px 0 !important; line-height: 1.4 !important; }
        .btn-primary { width: 100% !important; background: #4F46E5 !important; color: #ffffff !important; border: none !important; padding: 12px 14px !important; font-weight: 600 !important; font-size: 14px !important; border-radius: 8px !important; cursor: pointer !important; margin-top: 10px !important; display: block !important; text-align: center !important; }
        .btn-secondary { width: 100% !important; background: #F3F4F6 !important; color: #4B5563 !important; border: none !important; padding: 10px 14px !important; font-weight: 500 !important; font-size: 13px !important; border-radius: 8px !important; cursor: pointer !important; margin-top: 8px !important; display: block !important; text-align: center !important; }
        .input-field { width: 100% !important; padding: 10px 12px !important; border: 1px solid #D1D5DB !important; border-radius: 8px !important; margin-bottom: 8px !important; font-size: 14px !important; box-sizing: border-box !important; outline: none !important; background: #FAFAFA !important; color: #111827 !important; }
        .trust-item { display: flex !important; align-items: center !important; gap: 8px !important; font-size: 13px !important; color: #374151 !important; margin-bottom: 8px !important; font-weight: 500 !important; }
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

    // Treatment 1: Size Quiz Action
    showSizeQuiz: function () {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
        <style>${baseCss}</style>
        <div class="nudge-card">
          <p class="nudge-title">📏 Find Your Perfect Fit in 10 Seconds</p>
          <div id="quiz-form">
            <input type="number" id="bime-height" class="input-field" placeholder="Height (in cm or ft e.g., 175)" />
            <input type="number" id="bime-weight" class="input-field" placeholder="Weight (in kg e.g., 70)" />
            <button class="btn-primary" id="bime-calc">Calculate My Size</button>
            <button class="btn-secondary" id="bime-close">Dismiss</button>
          </div>
          <div id="quiz-result" style="display:none; text-align: center;">
            <p style="font-size: 16px; font-weight: 700; color: #059669;" id="size-text"></p>
            <p style="font-size: 12px; color: #6B7280; margin-top: 4px;">Lowest return rate for this size!</p>
            <button class="btn-primary" id="bime-done">Got it, thanks!</button>
          </div>
        </div>
      `;

      shadow.getElementById("bime-calc").addEventListener("click", () => {
        const h = parseFloat(shadow.getElementById("bime-height").value);
        const w = parseFloat(shadow.getElementById("bime-weight").value);

        // Validation
        if (!h || !w || h < 100 || h > 250 || w < 30 || w > 200) {
          shadow.getElementById("bime-height").style.border =
            "1px solid #DC2626";
          shadow.getElementById("bime-weight").style.border =
            "1px solid #DC2626";
          return;
        }

        // Height + Weight dono use karo
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
        shadow.getElementById("size-text").innerHTML = `
    Recommended: <b>${size}</b><br>
    <span style="font-size:12px;color:#6B7280">
      Loose fit? → ${looseSize} &nbsp;|&nbsp; Snug fit? → ${snugSize}
    </span>
  `;

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

      const doneBtn = shadow.getElementById("bime-done");
      if (doneBtn) {
        doneBtn.addEventListener("click", () => {
          BIME.track("nudge_clicked", { action: "show_size_quiz" });
          host.remove();
        });
      }
    },

    // Treatment 2: Discount Timer Action
    showDiscount: function (message) {
      const { host, shadow, baseCss } = this.createShadowContainer();
      let secondsLeft = 300;

      shadow.innerHTML = `
    <style>${baseCss}
      .timer { font-size: 18px; font-weight: 700; color: #DC2626; margin: 6px 0; }
      .coupon-box {
        background: #F0FDF4; border: 2px dashed #16A34A;
        border-radius: 8px; padding: 12px; text-align: center;
        margin: 10px 0; display: none;
      }
      .coupon-code {
        font-size: 20px; font-weight: 800;
        color: #15803D; letter-spacing: 2px;
      }
      .coupon-label { font-size: 12px; color: #6B7280; margin-top: 4px; }
    </style>
    <div class="nudge-card">
      <p class="nudge-title">🏷️ ${message || "Still thinking? Claim 10% Off!"}</p>
      <div class="timer" id="timer-text">05:00</div>

      <div id="claim-section">
        <button class="btn-primary" id="bime-claim">Claim 10% Discount</button>
        <button class="btn-secondary" id="bime-close">No thanks</button>
      </div>

      <div class="coupon-box" id="coupon-box">
        <div class="coupon-code">SAVED10</div>
        <div class="coupon-label">
          Copy this code and paste at checkout
        </div>
        <button class="btn-primary" id="bime-done" 
          style="margin-top:10px">
          Got it!
        </button>
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
        // ✅ In-card success — no alert()
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

      // Done button — coupon dekh liya
      setTimeout(() => {
        const doneBtn = shadow.getElementById("bime-done");
        if (doneBtn) {
          doneBtn.addEventListener("click", () => {
            host.remove();
          });
        }
      }, 100);
    },

    // Treatment 3: Trust Badge Action
    showTrust: function () {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
    <style>${baseCss}</style>
    <div class="nudge-card">
      <p class="nudge-title">🛡️ Shop with 100% Confidence</p>
      <div class="trust-item">✔ 7-Day Hassle Free Returns</div>
      <div class="trust-item">✔ 100% Original & Quality Assured</div>
      <div class="trust-item">✔ Cash on Delivery Available</div>
      <button class="btn-primary" id="bime-continue">Continue Shopping</button>
      <button class="btn-secondary" id="bime-close">Dismiss</button>
    </div>
  `;

      shadow.getElementById("bime-continue").addEventListener("click", () => {
        BIME.track("nudge_clicked", { action: "show_trust" });
        host.remove();
      });

      // ✅ Close button add karo
      shadow.getElementById("bime-close").addEventListener("click", () => {
        BIME.track("nudge_closed", { action: "show_trust" });
        host.remove();
      });
    },

    // Fallback Treatment: Generic Nudge
    showGeneric: function (message) {
      const { host, shadow, baseCss } = this.createShadowContainer();
      shadow.innerHTML = `
        <style>${baseCss}</style>
        <div class="nudge-card">
          <p class="nudge-title">${message || "Need any help with your choice?"}</p>
          <button class="btn-primary" id="bime-cta">Yes, Help Me!</button>
          <button class="btn-secondary" id="bime-close">Dismiss</button>
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
