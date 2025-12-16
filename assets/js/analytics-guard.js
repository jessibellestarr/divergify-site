// ================= TIN FOIL HAT ANALYTICS GUARD =================
// Place this block BEFORE any analytics or third-party scripts.
// It conditionally loads analytics ONLY when Tin Foil Hat is OFF.
// Compatible with existing dg-tinfoil / dg_tinfoil / dg_mode keys.
// ================================================================

(function () {
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function isTinFoilHatOn() {
    const direct =
      safeGet("dg-tinfoil") === "true" ||
      safeGet("dg_tinfoil") === "true";

    const legacyMode = safeGet("dg_mode") === "tin_foil";

    return direct || legacyMode;
  }

  // Expose state for other scripts (e.g., to gate embeds like Ko‑fi)
  try { window.__dgTinFoilHatOn = isTinFoilHatOn(); } catch {}

  // 🚫 If Tin Foil Hat is ON, do NOT load analytics
  if (window.__dgTinFoilHatOn === true) {
    try { console.info("[Divergify] Tin Foil Hat ON — analytics disabled."); } catch {}
    return;
  }

  // ✅ Tin Foil Hat OFF — load analytics below this line

  /* EXAMPLE: Google Analytics (replace with your actual provider if different)
  const ga = document.createElement("script");
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  ga.async = true;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  */

  /* EXAMPLE: Plausible
  const p = document.createElement("script");
  p.src = "https://plausible.io/js/plausible.js";
  p.defer = true;
  p.dataset.domain = "divergify.app";
  document.head.appendChild(p);
  */

})();
