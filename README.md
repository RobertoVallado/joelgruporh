# joelgruporh — Joel Pacheco | Grupo RH

React + TypeScript marketing site for Joel Pacheco / Grupo RH real estate (Mérida, Yucatán).

**Live:** https://joelpacheco-gruporh.robertovallado.dev

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Routing | React Router v7 (language-prefix `/es/`, `/en/`) |
| i18n | react-i18next (ES/EN, path-based detection) |
| SEO | react-helmet-async (dynamic meta/OG/hreflang) + vite-plugin-sitemap |
| Motion | Framer Motion (scroll-reveal, swipeable gallery) |
| Mobile drawer | Radix UI Dialog |
| Images | react-lazy-load-image-component (blur-up lazy load) |
| Contact form | Formspree (`VITE_FORMSPREE_ID`) + WhatsApp CTA |
| Hosting | GitHub Pages via `gh-pages` |

---

## Dev

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy

```bash
npm run build      # outputs dist/, generates sitemap.xml
npm run deploy     # builds + pushes dist/ to the gh-pages branch
```

## Environment

Create `.env.local`:

```
VITE_FORMSPREE_ID=your_form_id   # enables Formspree contact forms
```

Without it the contact sections fall back to the WhatsApp CTA.

---

## Project structure

```
public/
  assets/images/      ← all images (logos, concept photos, badges)
  404.html            ← GitHub Pages SPA routing fix
  CNAME               ← custom domain
  robots.txt

src/
  App.tsx             ← route tree (/:lang → LangLayout → pages)
  config/
    i18n.ts           ← i18next init with path-prefix detection
    site.ts           ← SITE_URL, contact constants, JSON-LD schemas
    locales/
      es/translation.json
      en/translation.json
  data/
    posts/            ← blog posts (*.json) — drop new files here
    desarrollos.ts    ← 5 active project definitions
  pages/
    Home/             ← 7 sections: Hero, Guarantees, Developments, About, BlogPreview, Contact
    BlogList/         ← /es/blog/
    BlogPost/         ← /es/blog/:slug/
    DesarrolloDetail/ ← /es/desarrollos/:slug/ (gallery + Formspree form)
    NotFound/
  components/
    layout/           ← Header, MobileDrawer (Radix), Footer
    seo/              ← PageSeo (helmet wrapper), JsonLd
    ui/               ← MotionSection, ImageGallery, LazyImage, WhatsAppFloat
    blog/             ← BlogCard
  hooks/
    useLang.ts        ← current lang + switchLang()
    useActiveNav.ts   ← section-tracking for nav highlight
  styles/
    global.css        ← full design system (CSS custom properties, verbatim from v1)
    additions.css     ← new component styles (gallery, WhatsApp float, form inputs)
  types/
    blog.ts           ← BlogPost interface
```

---

## Adding a blog post

1. Create `src/data/posts/<slug>.json` — see `AGENT_POSTING_GUIDE.md` for the full schema and rules
2. `npm run build && npm run deploy`

The file is auto-discovered by `import.meta.glob` — no other changes needed, sitemap updates automatically.

## Translations

All UI strings → `src/config/locales/{es,en}/translation.json`  
Blog post bilingual content → inside each post JSON (`content_es`, `content_en`)

## DNS

Add a CNAME record at your registrar:
```
joelpacheco-gruporh  →  robertovallado.github.io
```
Then enable GitHub Pages (Settings → Pages → Deploy from branch → `gh-pages`).
