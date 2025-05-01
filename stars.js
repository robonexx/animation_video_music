/* stars.js  – generates a twinkling sky and
 * switches the page background when a button is hovered / tapped
 * -------------------------------------------------------------- */

(() => {
  /* ---------- CONFIG ---------- */
  const STAR_COUNT = 140; // how many <span class="star"> to create
  const TWEEN_MIN = 0.5; // s  • gsap duration lower bound
  const TWEEN_VAR = 0.5; // s  • upper bound is TWEEN_MIN+TWEEN_VAR
  const DARK_SKY =
    'linear-gradient(99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8%)';
  const SUNSET_SKY = 'linear-gradient(to right, #FFA69E, #861657)';

  /* ---------- BOOT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildStarDom(STAR_COUNT);
    const stars = document.querySelectorAll('.star');
    twinkle(stars);

    // attach background swapper to any element carrying .sky-toggle
    document.querySelectorAll('.sky-toggle').forEach((el) => {
      el.addEventListener('mouseenter', () => switchBg(DARK_SKY, '#ededed'));
      el.addEventListener('touchstart', () => switchBg(DARK_SKY, '#ededed'));
      el.addEventListener('mouseleave', () => switchBg(SUNSET_SKY, '#181818'));
      el.addEventListener('touchend', () => switchBg(SUNSET_SKY, '#181818'));
    });
  });

  /* ---------- HELPERS ---------- */
  function buildStarDom(count) {
    const underlay = ensureUnderlay();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.style.top = 100 * Math.random() + '%';
      star.style.left = 100 * Math.random() + '%';
      underlay.appendChild(star);
    }
  }

  function ensureUnderlay() {
    let u = document.querySelector('.underlay');
    if (!u) {
      u = document.createElement('div');
      u.className = 'underlay';
      document.body.prepend(u);
    }
    return u;
  }

  function twinkle(nodeList) {
    nodeList.forEach((el) => {
      gsap.to(el, {
        opacity: Math.random(),
        duration: Math.random() * TWEEN_VAR + TWEEN_MIN,
        onComplete: () => twinkle([el]), // recurse 1-by-1 for continuous twinkle
      });
    });
  }

  function switchBg(gradient, h1Color) {
    document.body.style.background = gradient;
    const h = document.querySelector('h1');
    if (h) h.style.color = h1Color;
  }
})();
