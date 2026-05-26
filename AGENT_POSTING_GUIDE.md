# Blog Posting Guide — rh-agente

This document is the single source of truth for publishing blog posts on **joelgruporh.mx**. Follow every rule here exactly. No guessing.

---

## How the system works

```
content/posts/<slug>.json   ← you write this
        ↓  node build.js
blog/<slug>/index.html      ← generated automatically
blog/index.html             ← regenerated (listing page)
index.html                  ← regenerated (home preview)
sitemap.xml                 ← regenerated
```

**Workflow:**
1. Create `content/posts/<slug>.json` following the rules below
2. Run `node build.js` from the project root (`joelgruporh/`)
3. Verify output — build should report `✓ blog/<slug>/index.html`
4. Commit `content/posts/<slug>.json` + the entire `blog/` directory + `sitemap.xml` + `index.html`

---

## Slug rules (URL naming)

The slug becomes the public URL: `joelgruporh.mx/blog/<slug>/`

| Rule | ✓ Correct | ✗ Wrong |
|---|---|---|
| Lowercase only | `gran-verona-plusvalia` | `Gran-Verona-Plusvalia` |
| Hyphens as separators | `lotes-merida-norte` | `lotes_merida_norte` |
| No Spanish diacritics | `plusvalia-merida` | `plusvalía-mérida` |
| No stop words | `certeza-juridica-bienes-raices` | `por-que-tener-certeza-juridica` |
| 3–5 keywords max | `costa-esmeralda-lotes-vacacionales` | `costa-esmeralda-inversion-costera-yucatan-2026` |
| Lead with the search keyword | `lotes-yucatan-plusvalia` | `invertir-en-lotes-en-yucatan` |
| No dates unless evergreen | `mercado-inmobiliario-merida-2026` only if truly year-specific | never append year by default |
| Filename = slug | file: `lotes-yucatan-plusvalia.json` | file: `post1.json` |

**Diacritic conversion reference:**
`á→a  é→e  í→i  ó→o  ú→u  ñ→n  ü→u  ¿→(drop)  ¡→(drop)`

---

## Image rules

Images are referenced relative to the **site root** (`joelgruporh/`).

**Available images you can use today:**
```
assets/images/concept-images/gran-verona.webp
assets/images/concept-images/gran-verona-02.webp
assets/images/concept-images/gran-verona-03.webp
assets/images/concept-images/playa-clara.webp
assets/images/concept-images/playa-clara-02.webp
assets/images/concept-images/playa-clara-03.webp
assets/images/concept-images/playar.webp
assets/images/concept-images/playar-02.webp
assets/images/concept-images/playar-03.webp
assets/images/concept-images/cal-canto.webp
assets/images/concept-images/cal-canto-02.webp
assets/images/concept-images/cal-canto-03.webp
assets/images/concept-images/rhevo.webp
assets/images/concept-images/rhevo-02.webp
assets/images/concept-images/rhevo-03.webp
```

**Match image to topic:**
| Post topic | Use image |
|---|---|
| Gran Verona / Norte de Mérida / lotes urbanos | `gran-verona.webp` or `-02` / `-03` |
| Playa Clara / Costa Esmeralda / inversión costera | `playa-clara.webp` or `-02` / `-03` |
| Playar / Costa / vacacional | `playar.webp` or `-02` / `-03` |
| Cal & Canto / Conkal / cultura / historia | `cal-canto.webp` or `-02` / `-03` |
| RHEVO / fraccionario / lujo accesible | `rhevo.webp` or `-02` / `-03` |
| General / mercado / inversión (no specific dev) | `gran-verona.webp` (default) |

**To add a custom blog image:**
Drop the file in `assets/images/` and reference it as `assets/images/your-image.webp`.
Recommended: 1200×630px minimum, WebP or JPG, descriptive filename (no spaces).

---

## The JSON template

Copy this exactly. Fill every field. Do not add or remove fields.

```json
{
  "slug": "keyword-primary-secundario-tercero",
  "title_es": "Título en español — informativo, max 60 caracteres",
  "title_en": "English title — informative, max 60 characters",
  "description_es": "Descripción SEO en español. Debe ser entre 140 y 155 caracteres. Incluir el keyword principal y una llamada a la acción suave.",
  "description_en": "SEO description in English. Must be 140–155 characters. Include the primary keyword and a soft call to action.",
  "date": "YYYY-MM-DD",
  "author": "Joel Pacheco",
  "category": "Categoría en español",
  "category_en": "Category in English",
  "tags": ["tag1", "tag2", "tag3"],
  "image": "assets/images/concept-images/gran-verona.webp",
  "image_alt_es": "Descripción de la imagen en español — descriptiva y con keyword",
  "image_alt_en": "Image description in English — descriptive and keyword-rich",
  "content_es": "<p>Párrafo HTML en español...</p>",
  "content_en": "<p>HTML paragraph in English...</p>"
}
```

### Field rules

| Field | Rules |
|---|---|
| `slug` | See slug rules above. Must match filename exactly (minus `.json`) |
| `title_es` / `title_en` | Max 60 chars. Lead with keyword. No clickbait. No "¿Por qué...?" openings |
| `description_es` / `description_en` | Exactly 140–155 chars. One sentence. Include primary keyword. End with implicit CTA |
| `date` | ISO format: `2026-05-26`. Use the actual publish date |
| `author` | Always `"Joel Pacheco"` |
| `category` / `category_en` | Short noun phrase. See valid categories below |
| `tags` | 3–6 tags. Lowercase. Spanish. No duplicates with slug keywords |
| `image` | Path relative to site root. Must be an existing file. See image rules above |
| `image_alt_es` / `image_alt_en` | 1 sentence, descriptive, includes location and development name if relevant |
| `content_es` / `content_en` | Valid HTML string. See content rules below |

### Valid categories

```
Spanish                    English
─────────────────────────  ──────────────────────────
Inversión                  Investment
Inversión costera          Coastal Investment
Desarrollos                Developments
Mercado inmobiliario       Real Estate Market
Guías de compra            Buying Guides
Certeza jurídica           Legal Certainty
Estilo de vida             Lifestyle
RHEVO                      RHEVO
```

---

## Content rules

### Structure

Every post must have this structure in both languages:

```
<p>Opening hook — 2–3 sentences. No heading. Grab attention immediately.</p>

<h2>Section heading</h2>
<p>Body paragraph...</p>

<h2>Section heading</h2>
<p>Body paragraph...</p>
<ul>
  <li><strong>Key point</strong> — explanation</li>
</ul>

<h2>Final section — soft CTA</h2>
<p>Close with a gentle call to action toward contacting Joel. No hard sell.</p>
```

### Length
- **Minimum:** 400 words per language
- **Recommended:** 600–900 words per language
- **Maximum:** 1,200 words (beyond this, split into two posts)

### Tone
- First person where appropriate ("En Grupo RH..." / "At Grupo RH...")
- Authoritative but accessible — not academic, not salesy
- Always honest: if a development has a waitlist or is sold out, say so
- Spanish: formal usted/tú hybrid — conversational but professional
- English: direct, clear, no filler

### HTML allowed in content
```html
<p>          paragraph
<h2>         section heading (use sparingly — 2–4 per post max)
<h3>         sub-heading
<ul><li>     unordered list
<ol><li>     ordered list
<strong>     bold emphasis
<em>         italic emphasis
<a href="">  links (use sparingly, only to internal pages or trusted external sources)
<blockquote> pullquote for key stats or quotes
```

Do **not** use: `<div>`, `<span>`, `<br>`, `<h1>`, `<h4>–<h6>`, inline styles, scripts.

### SEO within content
- Use the primary keyword naturally in the first paragraph
- Use secondary keywords in at least one `<h2>`
- Do not keyword-stuff — maximum density ~1.5%
- Link to relevant sections of the main site where natural:
  - Gran Verona → `../../index.html#desarrollos`
  - Contact → `../../index.html#contacto`

---

## Routing reference

After running `node build.js`, these URLs become live:

| File generated | Public URL (production) | Local file path |
|---|---|---|
| `blog/<slug>/index.html` | `joelgruporh.mx/blog/<slug>/` | `blog/<slug>/index.html` |
| `blog/index.html` | `joelgruporh.mx/blog/` | `blog/index.html` |
| `index.html` (preview) | `joelgruporh.mx/` | `index.html` |

**Internal links within post content** must use relative paths from `blog/<slug>/`:
- To home: `../../index.html`
- To blog listing: `../index.html`
- To a section on home: `../../index.html#desarrollos`
- To another post: `../other-slug/index.html`

**Do not use absolute URLs** (`https://joelgruporh.mx/...`) inside `content_es` / `content_en` — they only work on the production server. Use relative paths so posts work locally too.

---

## Checklist before running build.js

- [ ] Filename matches `slug` field exactly
- [ ] Slug is lowercase, hyphens only, no diacritics, 3–5 keywords
- [ ] Both `title_es` and `title_en` are under 60 chars
- [ ] Both descriptions are 140–155 chars
- [ ] `image` path references an existing file
- [ ] `content_es` and `content_en` are valid HTML (no unclosed tags)
- [ ] Both language versions are complete (not placeholder text)
- [ ] `date` is today's date in `YYYY-MM-DD` format
- [ ] `author` is `"Joel Pacheco"`

---

## Complete example post

See `content/posts/lotes-yucatan-plusvalia.json` and `content/posts/costa-esmeralda-lotes-vacacionales.json` as working reference examples.

---

## Running the build

```bash
# From the joelgruporh/ directory:
node build.js
```

Expected output:
```
🔨 Grupo RH — Building static blog...

  Found N post(s) in content/posts/

  ✓ blog/<slug>/index.html
  ✓ blog/index.html
  ✓ index.html blog preview updated
  ✓ sitemap.xml

✅ Build complete.
```

If you see `⚠ Blog preview markers not found` — do not commit. The `index.html` markers were accidentally removed and must be restored before publishing.
