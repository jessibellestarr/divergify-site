document.addEventListener('DOMContentLoaded', () => {
  const mountNav = document.getElementById('nav-mount');
  const mountFooter = document.getElementById('footer-mount');

  const navHtml = `
  <div class="nav">
    <div class="nav-left">
      <a href="/"><img src="assets/divergify_logo_transparent_5000.png" alt="Divergify rainbow brain logo" class="logo-img" /></a>
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
      <a href="community.html">Community</a>
      <a href="shop.html">Shop</a>
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

// LOW SENSORY MODE TOGGLE
const lowSensoryToggle = document.getElementById("toggle-low-sensory");
if (lowSensoryToggle) {
  const saved = localStorage.getItem("dg_low_sensory") === "true";
  if (saved) document.body.classList.add("low-sensory");
  lowSensoryToggle.checked = saved;

  lowSensoryToggle.addEventListener("change", () => {
    if (lowSensoryToggle.checked) {
      document.body.classList.add("low-sensory");
      localStorage.setItem("dg_low_sensory","true");
    } else {
      document.body.classList.remove("low-sensory");
      localStorage.setItem("dg_low_sensory","false");
    }
  });
}

// TINFOIL HAT MODE TOGGLE
const tinToggle = document.getElementById("toggle-tinfoil");
if (tinToggle) {
  const savedTin = localStorage.getItem("dg_tinfoil") === "true";
  if (savedTin) document.body.classList.add("tinfoil");
  tinToggle.checked = savedTin;

  tinToggle.addEventListener("change", () => {
    if (tinToggle.checked) {
      document.body.classList.add("tinfoil");
      localStorage.setItem("dg_tinfoil","true");
    } else {
      document.body.classList.remove("tinfoil");
      localStorage.setItem("dg_tinfoil","false");
    }
  });
}

// Floating Takoda follows cursor
document.addEventListener("mousemove", (e) => {
  const el = document.getElementById("takoda-floating");
  if (!el) return;
  el.style.transform = "translate(" + (e.clientX * 0.02) + "px," + (e.clientY * 0.02) + "px)";
});
