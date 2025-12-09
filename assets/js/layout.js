document.addEventListener('DOMContentLoaded', () => {
  const mountNav = document.getElementById('nav-mount');
  const mountFooter = document.getElementById('footer-mount');

  const SHOP_BASE = 'https://dopamine-depot.myshopify.com';
  const CART_URL = SHOP_BASE + '/cart';

  const navHtml = `
  <div class="nav">
    <!-- LEFT: Logo + Wordmark + Tagline -->
    <div class="nav-left">
      <a href="/"><img src="assets/divergify_logo_transparent_5000.png" alt="Divergify brain logo" class="logo-img" /></a>
      <div class="brand-text">
        <div class="brand-name">Divergify</div>
        <div class="brand-tagline">Neurodivergent Ops Center</div>
      </div>
    </div>

    <!-- CENTER: Global Nav -->
    <nav class="nav-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/divergipedia">Divergipedia</a>
      <a href="/app">The App</a>
      <a href="/shop.html">Dopamine Depot</a>
      <a href="${SHOP_BASE}/collections/all" target="_blank" rel="noopener">Shop</a>
    </nav>

    <!-- RIGHT: Cart + Toggles + Takota -->
    <div class="nav-right">
      <button id="toggle-low-stim" class="nav-toggle" title="Low-Stim mode">🌙</button>
      <button id="toggle-tinfoil" class="nav-toggle" title="Tinfoil Hat mode">🧻</button>
      <a class="nav-cart" href="${CART_URL}" aria-label="Cart">🛒</a>
      <div id="nav-takota" class="nav-placeholder" title="Takota placeholder"></div>
    </div>
  </div>`;

  const footerHtml = `
  <div class="footer">
    <div class="footer-left">
      <img src="assets/logo_green.png" alt="Divergify logo" class="footer-logo" />
      <div>
        <div>© <span id="year"></span> Divergify.</div>
        <div class="footer-tagline">Built for brains that don’t do beige.</div>
      </div>
    </div>
    <div class="footer-right">
      <div id="legal-line">Legal-ish: Please don’t steal our stuff. Make your own weird.</div>
      <div id="aside-line">Side quest: be kind to your past self. They got you this far.</div>
    </div>
  </div>
  <div class="legal-disclaimer">
    <p><small>Divergify is not affiliated with, endorsed by, or related to DiversyFund (real estate crowdfunding platform) or Devignify (design agency). We are an independent neurodivergent productivity platform. All trademarks are property of their respective owners.</small></p>
  </div>`;

  if (mountNav) mountNav.innerHTML = navHtml;
  // Wire up toggles after nav is mounted
  const lowStimToggle = document.getElementById("toggle-low-stim");
  const tinFoilToggle = document.getElementById("toggle-tinfoil");
  if (lowStimToggle) {
    lowStimToggle.addEventListener("click", () => {
      document.body.classList.toggle("low_stim");
    });
  }
  if (tinFoilToggle) {
    tinFoilToggle.addEventListener("click", () => {
      document.body.classList.toggle("tinfoil");
    });
  }
  if (mountFooter) {
    mountFooter.innerHTML = footerHtml;
    const year = mountFooter.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();

    // Footer Easter eggs: deterministic per-path, professional but playful
    const legalPool = [
      'Legal-ish: Please cite, don\'t swipe. Make your own weird.',
      'Legal-ish: This is not medical, legal, or laundry advice.',
      'Legal-ish: No dark patterns, no data vampires, no drama.',
      'Legal-ish: Respect creators. Hydrate. Stretch. Carry on.',
      'Legal-ish: Your brain isn\'t a bug. Patent trolls might be.',
      'Legal-ish: We love feedback, not subpoenas.',
      'Legal-ish: Accessibility over aesthetics. Consent over clicks.',
      'Legal-ish: Keep it kind. Credit your sources. Refill your water.',
    ];
    const asidePool = [
      'Side quest: you found the footer. +1 dopamine.',
      'Side quest: inhale… exhale… carry on.',
      'Side quest: drink water, then chase the idea.',
      'Side quest: high-five past-you for getting here.',
      'Side quest: organize 1 thing; celebrate 3.',
      'Side quest: stretch wrists; blink eyes; uncurl shoulders.',
      'Side quest: your spark is not negotiable.',
      'Side quest: one tiny win beats ten perfect plans.',
    ];

    function hashStr(s){
      let h = 2166136261 >>> 0; // FNV-ish
      for (let i=0;i<s.length;i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
      return h >>> 0;
    }
    const path = (location && location.pathname) || '/';
    const h = hashStr(path);
    const legalIdx = h % legalPool.length;
    const asideIdx = (Math.floor(h / 97) + 1) % asidePool.length;
    const legalEl = mountFooter.querySelector('#legal-line');
    const asideEl = mountFooter.querySelector('#aside-line');
    if (legalEl) legalEl.textContent = legalPool[legalIdx];
    if (asideEl) asideEl.textContent = asidePool[asideIdx];
  }
});
