// ─── js/main.js ─────────────────────────────────────────────────────────────

// ─── Custom cursor ──────────────────────────────────────────────────────────
const cursor    = document.getElementById('cursor');
const ring      = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '50px';
    ring.style.height   = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});

// ─── Scroll reveal ──────────────────────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const revealOb = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealOb.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealOb.observe(el));

// ─── Header scroll state ─────────────────────────────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Active nav link on scroll ───────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionOb = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionOb.observe(s));

// ─── Mobile nav toggle ───────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close on link click
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ─── Contact form (demo handler) ─────────────────────────────────────────────
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--clr-accent2)';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Simulate sending (replace with your fetch/FormData logic)
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 1200);
  });
}

// ─── Smooth anchor offset (fixed header) ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
