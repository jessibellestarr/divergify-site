document.addEventListener('DOMContentLoaded', () => {
  const mountNav = document.getElementById('nav-mount');
  const mountFooter = document.getElementById('footer-mount');

  const navHtml = `
  <div class="nav">
    <div class="nav-left">
      <a href="/"><img src="assets/logo_green.png" alt="Divergify logo" class="logo-img" /></a>
      <div class="brand-text">
        <div class="brand-name">DIVERGIFY</div>
        <div class="brand-tagline">Organize your neurospicy chaos</div>
      </div>
    </div>
    <nav class="nav-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/mission">Mission</a>
      <a href="/app">The App</a>
      <a href="/divergipedia">Divergipedia</a>
      <a href="/shop">Shop</a>
      <a href="/blog/">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
    <div class="nav-cta">
      <div class="nav-pill"><span class="nav-pill-dot"></span> Beta cohort forming</div>
      <a href="/contact#beta" class="nav-button">Join the beta <span class="chevron">↗</span></a>
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
  </div>`;

  if (mountNav) mountNav.innerHTML = navHtml;
  if (mountFooter) {
    mountFooter.innerHTML = footerHtml;
    const year = mountFooter.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();
  }
});
