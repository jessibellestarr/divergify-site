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
  <div class="dg-footer">
    <div class="dg-footer-inner">

      <!-- BRAND -->
      <div class="dg-footer-brand">
        <strong>Divergify™</strong>
        <p>Built deliberately for neurodivergent minds.</p>
      </div>

      <!-- NAV -->
      <nav class="dg-footer-nav">
        <a href="/hub.html">The Hub</a>
        <a href="/blog/index.html">Field Notes</a>
        <a href="/divergipedia.html">Divergipedia</a>
        <a href="/contact.html">Contact</a>
      </nav>

      <!-- SOCIAL -->
      <div class="dg-footer-social">
        <a href="https://www.instagram.com/divergify.app/" aria-label="Instagram" target="_blank" rel="noopener">IG</a>
        <a href="https://x.com/divergifyapp" aria-label="X" target="_blank" rel="noopener">X</a>
        <a href="https://www.tiktok.com/@divergify.app" aria-label="TikTok" target="_blank" rel="noopener">TT</a>
        <a href="https://www.facebook.com/profile.php?id=61579035562612" aria-label="Facebook" target="_blank" rel="noopener">FB</a>
        <a href="https://ko-fi.com/divergify" aria-label="Ko-fi" target="_blank" rel="noopener">Ko</a>
      </div>

      <!-- LEGAL / DISCLAIMER -->
      <div class="dg-footer-legal">
        <div class="footer-legal">
          <p class="footer-trademark">© <span id="year"></span> Divergify™</p>
          <p class="footer-disclaimer">Divergify is not affiliated with, endorsed by, or related to DiversyFund or Devignify.</p>
        </div>
        <div class="dg-footer-meta">
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Terms</a>
        </div>
      </div>

    </div>
  </div>
`;

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
  }
});
