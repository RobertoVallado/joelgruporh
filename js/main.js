/* ============================================================
   GRUPO RH — main.js
   Language toggle (ES/EN), nav scroll, mobile drawer,
   scroll reveal, active nav link tracking
   ============================================================ */

'use strict';

/* ── Language ───────────────────────────────────────────────── */
const LANG_KEY = 'rh_lang';

function getLang() {
  return localStorage.getItem(LANG_KEY) || 'es';
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'META') {
      el.content = val;
    } else {
      el.innerHTML = val;
    }
  });

  /* Update aria-label attributes that carry translations */
  document.querySelectorAll('[data-aria-es]').forEach(el => {
    const val = el.getAttribute('data-aria-' + lang);
    if (val) el.setAttribute('aria-label', val);
  });

  /* Toggle button label */
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';

  /* Drawer toggle label */
  const drawerLang = document.querySelector('.drawer-lang');
  if (drawerLang) drawerLang.textContent = lang === 'es' ? 'Switch to English' : 'Cambiar a Español';
}

function toggleLang() {
  const next = getLang() === 'es' ? 'en' : 'es';
  localStorage.setItem(LANG_KEY, next);
  applyLang(next);
}

/* ── Navigation scroll ──────────────────────────────────────── */
function initNav() {
  const header = document.querySelector('header');
  if (!header) return;
  const threshold = 20;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > threshold);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile drawer ──────────────────────────────────────────── */
function initDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const overlay   = document.getElementById('mobile-overlay');
  if (!hamburger || !drawer) return;

  function open() {
    drawer.classList.add('open');
    hamburger.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function close() {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggle() {
    drawer.classList.contains('open') ? close() : open();
  }

  hamburger.addEventListener('click', toggle);
  overlay && overlay.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  /* Drawer language toggle */
  const drawerLang = drawer.querySelector('.drawer-lang');
  drawerLang && drawerLang.addEventListener('click', () => {
    toggleLang();
    close();
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ── Scroll reveal ──────────────────────────────────────────── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    /* Fallback: show everything instantly */
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  items.forEach(el => obs.observe(el));
}

/* ── Active nav link ────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}

/* ── Smooth scroll for hash links ───────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(getLang());
  initNav();
  initDrawer();
  initReveal();
  initActiveNav();
  initSmoothScroll();

  document.getElementById('lang-toggle')
    ?.addEventListener('click', toggleLang);
});


/* ============================================================
   RH-AGENTE INTEGRATION: WhatsApp floating button
   Uncomment the block below and set the correct number/message
   ============================================================

const WA_NUMBER  = '529993708117';
const WA_MESSAGE = encodeURIComponent('Hola, me interesa conocer sus desarrollos inmobiliarios.');

function initWhatsAppFloat() {
  const btn = document.createElement('a');
  btn.id        = 'wa-float';
  btn.href      = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
  btn.target    = '_blank';
  btn.rel       = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Contactar por WhatsApp');
  btn.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
               -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
               -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
               .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
               -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
               -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
               -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
               .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
               .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
               .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L0 24l6.335-1.494
               A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818
               a9.818 9.818 0 0 1-5.005-1.369l-.359-.213-3.72.877.943-3.613-.233-.373
               A9.817 9.817 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182
               S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
    </svg>`;
  document.body.appendChild(btn);
}

// Add to your CSS: #wa-float { position:fixed; bottom:1.5rem; right:1.5rem; z-index:90;
//   width:56px; height:56px; border-radius:50%; background:#25D366; color:#fff;
//   display:flex; align-items:center; justify-content:center;
//   box-shadow:0 4px 16px rgba(37,211,102,.4); transition:transform .3s ease; }
// #wa-float:hover { transform:scale(1.08); }

// initWhatsAppFloat();

============================================================ */


/* ============================================================
   RH-AGENTE INTEGRATION: Embedded chat widget
   Replace AGENT_WIDGET_URL with your Hermes gateway URL
   ============================================================

function initChatWidget() {
  const container = document.getElementById('rh-chat-widget');
  if (!container) return;
  const iframe = document.createElement('iframe');
  iframe.src             = 'https://AGENT_WIDGET_URL';
  iframe.title           = 'Agente RH — Asistente inmobiliario';
  iframe.allow           = 'microphone';
  iframe.style.cssText   = 'width:100%;height:520px;border:none;border-radius:14px;';
  container.appendChild(iframe);
}

// Place <div id="rh-chat-widget"></div> wherever you want the widget.
// initChatWidget();

============================================================ */


/* ============================================================
   RH-AGENTE INTEGRATION: Contact form → CRM webhook
   Replace CRM_WEBHOOK_URL with your Hermes/HubSpot/Zoho endpoint
   ============================================================

function initLeadForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    try {
      await fetch('https://CRM_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      form.innerHTML = '<p class="form-success">¡Gracias! Te contactaremos pronto.</p>';
    } catch {
      alert('Error al enviar. Intenta de nuevo o escríbenos por WhatsApp.');
    }
  });
}

// Lead form HTML template:
// <form id="lead-form">
//   <input name="nombre"   type="text"  placeholder="Tu nombre"   required />
//   <input name="telefono" type="tel"   placeholder="Teléfono"    required />
//   <input name="email"    type="email" placeholder="Correo"      required />
//   <select name="proyecto">
//     <option value="">Selecciona un desarrollo</option>
//     <option>Gran Verona</option><option>Playa Clara</option>
//     <option>Playar</option><option>Cal & Canto</option><option>RHEVO</option>
//   </select>
//   <button type="submit" class="btn btn-primary btn-full">Enviar solicitud</button>
// </form>

// initLeadForm();

============================================================ */
