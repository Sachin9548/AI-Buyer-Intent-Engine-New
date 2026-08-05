// bime-sdk.js
(function () {
  const BIME_CONFIG = {
    // endpoint: "http://localhost:3000/api/ingestion/event",
    endpoint: "https://api.claarvia.com/api/ingestion/event",
    batchSize: 5,
    buffer: [],
    storeId: null, 
  };

     // Heuristic Helper Functions
const findElementByText = (tagName, text) => {
    const elements = document.querySelectorAll(tagName);
    for (let el of elements) {
        if (el.innerText.toLowerCase().includes(text.toLowerCase())) {
            return el;
        }
    }
    return null;
};

  const BIME = {
    init: function (config) {
      BIME_CONFIG.storeId = config.storeId;
      console.log("🚀 BIME SDK Initialized for:", config.storeId);

      // 1. Initial Page View track karo
      this.track("page_view", { url: window.location.href });
      
      if (config.sizeChartSelector) {
        const sizeChart = findElementByText('a', 'Size Chart') || findElementByText('button', 'Size Guide');

        if (sizeChart) {
          sizeChart.addEventListener("mouseenter", () => {
            BIME.track("hover_size_chart", {
              element: "size_chart",
            });
          });

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  this.timer = setTimeout(() => {
                    BIME.track("hover_size_chart", {
                      element: "size_chart_mobile",
                    });
                  }, 3000);
                } else {
                  clearTimeout(this.timer);
                }
              });
            },
            { threshold: 0.5 },
          );

          observer.observe(sizeChart);
        }
      }

      // Price section
          const priceEl = document.querySelector('[class*="price"]') || document.querySelector('[id*="price"]');

      if (priceEl) {
        priceEl.addEventListener("mouseenter", () => {
          BIME.track("price_hover", { element: "price" });
        });
        }
      

      // 2. Click listener
      document.addEventListener("click", (e) => {
        this.track("click", {
          tag: e.target.tagName,
          id: e.target.id || "no-id",
          text: e.target.innerText?.substring(0, 20),
        }); 
      });
    },

    track: function (type, metadata) {
      const event = {
        store_id: BIME_CONFIG.storeId,
        event_type: type,
        metadata: metadata,
        timestamp: new Date().toISOString(),
      };

      BIME_CONFIG.buffer.push(event);

      if (BIME_CONFIG.buffer.length >= BIME_CONFIG.batchSize) {
        this.send();
      }
    },

    send: function () {
      if (BIME_CONFIG.buffer.length === 0) return;

      const dataToSend = BIME_CONFIG.buffer;
      BIME_CONFIG.buffer = []; // Reset buffer

      fetch(BIME_CONFIG.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        keepalive: true, // Yahi hai wo magic flag!
      })
        .then((response) => response.json())
        .then((data) => {
          // Yahan handle karo Action!
          if (data.action) {
            this.triggerAction(data.action, data.message);
          }
        })
        .catch((err) => console.error("BIME SDK Error:", err));
    },

    triggerAction: function (action, message) {
      if (window.BIME_ACTION_SHOWN) return;

      const host = document.createElement("div");
      host.id = "bime-nudge-host";
      document.body.appendChild(host);

      const shadow = host.attachShadow({ mode: "open" });

      shadow.innerHTML = `
        <style>
            .nudge-card { position: fixed; bottom: 20px; right: 20px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999; border-left: 4px solid #4F46E5; font-family: sans-serif; min-width: 250px; }
            .btn-container { margin-top: 10px; display: flex; gap: 10px; }
            .nudge-btn { background: #4F46E5; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
            .close-btn { background: #E5E7EB; color: #374151; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
        </style>
        <div class="nudge-card">
            <p>${message}</p>
            <div class="btn-container">
                <button class="nudge-btn" id="bime-cta">Yes!</button>
                <button class="close-btn" id="bime-close">Close</button>
            </div>
        </div>
    `;

      // Positive Feedback
      shadow.getElementById("bime-cta").addEventListener("click", () => {
        BIME.track("nudge_clicked", { action: action });
        host.remove();
        window.BIME_ACTION_SHOWN = true;
      });

      // Negative Feedback
      shadow.getElementById("bime-close").addEventListener("click", () => {
        BIME.track("nudge_closed", { action: action }); // ML ke liye gold data
        host.remove();
        window.BIME_ACTION_SHOWN = true;
      });
    },
  };
  window.BIME = BIME;
})();
