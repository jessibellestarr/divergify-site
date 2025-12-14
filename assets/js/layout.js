document.addEventListener('DOMContentLoaded', () => {
  const mountNav = document.getElementById('nav-mount');
  const mountFooter = document.getElementById('footer-mount');

  const SHOP_BASE = 'https://dopamine-depot-2.myshopify.com';
  const CART_URL = SHOP_BASE + '/cart';

  const navHtml = `
  <div class="nav">
    <!-- LEFT: Logo + Wordmark + Tagline -->
    <div class="nav-left">
      <a href="/"><img src="/assets/divergify_logo_transparent_5000.png" alt="Divergify brain logo" class="logo-img" /></a>
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
      <a href="/blog/">Blog</a>
      <a href="/app">The App</a>
      <a href="${SHOP_BASE}" target="_blank" rel="noopener">Dopamine Depot</a>
    </nav>

    <!-- RIGHT: Cart + Feature Toggles + Takota -->
    <div class="nav-right" style="display:flex; align-items:center;">
      <div class="feature-toggles">
        <label class="toggle-wrapper" data-takota="Low Stim Mode. Removes visual noise, animations, and bright colors. For when the world is too loud.">
          <div class="switch">
            <input type="checkbox" id="toggle-low-stim" onchange="toggleFeature('low-stim')">
            <span class="slider"></span>
          </div>
          <span class="toggle-icon">☁️</span>
        </label>
        <label class="toggle-wrapper" data-takota="Tin Foil Hat Mode. Blocks 5G, bad vibes, and algorithmic tracking. (Simulation only).">
          <div class="switch">
            <input type="checkbox" id="toggle-tinfoil" onchange="toggleFeature('tinfoil')">
            <span class="slider"></span>
          </div>
          <span class="toggle-icon">🧢</span>
        </label>
      </div>
      <a class="nav-cart" href="${CART_URL}" aria-label="Cart">🛒</a>
      <div id="nav-takota" class="nav-placeholder" title="Takota placeholder"></div>
    </div>
  </div>`;

  const footerHtml = `
  <div class="footer">
    <div class="footer-left">
      <img src="/assets/logo_green.png" alt="Divergify logo" class="footer-logo" />
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
  // Initial mode from storage (persist across pages)
  try {
    const savedMode = localStorage.getItem('dg_mode');
    const savedLow = localStorage.getItem('dg_low_stim') === 'true';
    const savedTin = localStorage.getItem('dg_tinfoil') === 'true';
    if (savedMode === 'low_sensory' || savedLow) document.body.classList.add('low_stim');
    if (savedMode === 'tin_foil' || savedTin) document.body.classList.add('tinfoil');
  } catch {}

  // Wire up toggles after nav is mounted (persist state)
  const lowStimToggle = document.getElementById('toggle-low-stim');
  const tinFoilToggle = document.getElementById('toggle-tinfoil');

  function syncAria() {
    if (lowStimToggle) lowStimToggle.setAttribute('aria-pressed', String(document.body.classList.contains('low_stim')));
    if (tinFoilToggle) tinFoilToggle.setAttribute('aria-pressed', String(document.body.classList.contains('tinfoil')));
  }
  syncAria();

  if (lowStimToggle && !lowStimToggle.dataset.bound) {
    lowStimToggle.dataset.bound = '1';
    lowStimToggle.addEventListener('click', () => {
      const on = !document.body.classList.contains('low_stim');
      document.body.classList.toggle('low_stim', on);
      try { localStorage.setItem('dg_low_stim', String(on)); } catch {}
      // Also reflect into dg_mode for pages using it
      try { localStorage.setItem('dg_mode', on ? 'low_sensory' : 'default'); } catch {}
      syncAria();
    });
  }
  if (tinFoilToggle && !tinFoilToggle.dataset.bound) {
    tinFoilToggle.dataset.bound = '1';
    tinFoilToggle.addEventListener('click', () => {
      const on = !document.body.classList.contains('tinfoil');
      document.body.classList.toggle('tinfoil', on);
      try { localStorage.setItem('dg_tinfoil', String(on)); } catch {}
      if (on) { try { localStorage.setItem('dg_mode', 'tin_foil'); } catch {} }
      syncAria();
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
