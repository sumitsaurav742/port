/* =====================================================
   YASH GARG — PORTFOLIO SCRIPT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- INTRO ---- */
  const intro = document.getElementById('intro');
  const words = document.querySelectorAll('.intro-word');
  const reveal = document.querySelector('.intro-reveal');

  document.body.style.overflow = 'hidden';

  // stagger each word
  words.forEach((w, i) => {
    setTimeout(() => {
      w.style.transition = 'opacity .5s ease, transform .5s ease';
      w.style.opacity = '1';
      w.style.transform = 'translateY(0)';
    }, 200 + i * 350);
  });

  // "let me show you around"
  setTimeout(() => {
    reveal.style.transition = 'opacity .5s ease';
    reveal.style.opacity = '1';
  }, 1800);

  // fade out intro
  setTimeout(() => {
    intro.classList.add('done');
    document.body.style.overflow = '';
    animateHero();
  }, 2800);

  /* ---- HERO STAGGER ---- */
  function animateHero() {
    document.querySelectorAll('#hero .anim').forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), i * 140);
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const anims = document.querySelectorAll('.anim:not(#hero .anim)');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // try stagger among siblings
        const siblings = [...e.target.parentElement.querySelectorAll('.anim')];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('show'), idx * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  anims.forEach(el => obs.observe(el));

  /* ---- SKILL BARS ---- */
  const bars = document.querySelectorAll('.sbar-fill');

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => barObs.observe(b));

  /* ---- COUNTER ANIMATION ---- */
  const nums = document.querySelectorAll('.num[data-to]');

  const numObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target, +e.target.dataset.to);
        numObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => numObs.observe(n));

  function countUp(el, to) {
    const dur = 1200;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * to);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---- NAVBAR ---- */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', scrollY > 50);

    let cur = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 200) cur = s.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });

  /* ---- BURGER ---- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => navLinks.classList.toggle('open'));

  navAs.forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---- CONTACT FORM ---- */
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const orig = btn.innerHTML;
    btn.textContent = 'sent! ✓';
    btn.style.background = 'var(--accent2)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 2200);
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
