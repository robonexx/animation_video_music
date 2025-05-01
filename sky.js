/* sky.js – starfield + background hover
 * ------------------------------------ */
(() => {
  /* ---------- CONFIG ---------- */
  const STAR_COUNT = 140;
  const MIN_DUR = 0.5; // s
  const MAX_DUR = 1.0; // s
  const DARK_BG =
    'linear-gradient(99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8%)';
  const SUNSET_BG = 'linear-gradient(to right, #FFA69E, #861657)';

  /* ---------- BOOT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const stars = buildStars(STAR_COUNT);
    twinkle(stars);
    wireButtons();
  });

  /* ---------- STARFIELD ---------- */
  function buildStars(count) {
    const host = getUnderlay();
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.style.top = Math.random() * 100 + '%';
      s.style.left = Math.random() * 100 + '%';
      frag.appendChild(s);
    }
    host.appendChild(frag);
    return host.querySelectorAll('.star');
  }

  function getUnderlay() {
    let u = document.querySelector('.underlay');
    if (!u) {
      u = document.createElement('div');
      u.className = 'underlay';
      document.body.prepend(u);
    }
    return u;
  }

  /* ---------- TWINKLE (GSAP-agnostic) ---------- */
  function twinkle(nodes) {
    nodes.forEach((star) => animateOne(star));

    function animateOne(el) {
      const dur = rand(MIN_DUR, MAX_DUR);
      if (window.gsap) {
        // GSAP 3 syntax
        gsap.to(el, {
          opacity: Math.random(),
          duration: dur,
          onComplete: () => animateOne(el),
        });
      } else if (window.TweenMax) {
        // GSAP 2 / TweenMax syntax
        TweenMax.to(el, dur, {
          opacity: Math.random(),
          onComplete: animateOne,
          onCompleteParams: [el],
        });
      }
    }
  }

  /* ---------- BUTTON HOVER ---------- */
  function wireButtons() {
    document.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('mouseenter', () => swapBg(DARK_BG, '#ededed80'));
      btn.addEventListener('touchstart', () => swapBg(DARK_BG, '#ededed80'));

      btn.addEventListener('mouseleave', () => swapBg(SUNSET_BG, '#18181880'));
      btn.addEventListener('touchend', () => swapBg(SUNSET_BG, '#18181880'));
    });
  }

  function swapBg(gradient, h1Colour) {
    document.body.style.background = gradient;
    const h1 = document.querySelector('h1');
    if (h1) h1.style.color = h1Colour;
  }

  /* ---------- UTIL ---------- */
  const rand = (min, max) => min + Math.random() * (max - min);
})();
