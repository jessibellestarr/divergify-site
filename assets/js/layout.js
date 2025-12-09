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
      <div>Legal-ish: Please don’t steal our stuff. Make your own weird.</div>
      <div>Side quest: be kind to your past self. They got you this far.</div>
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
  }
});
