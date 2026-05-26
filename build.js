#!/usr/bin/env node
/* ============================================================
   build.js — Grupo RH Static Blog Generator
   Usage:
     node build.js          → build all posts + sitemap + blog index
     node build.js --watch  → rebuild on file changes (requires chokidar)

   Workflow for rh-agente:
     1. Drop a JSON file into content/posts/<slug>.json
     2. Run: node build.js
     3. Commit the generated blog/ directory
   ============================================================ */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ── Config ─────────────────────────────────────────────────── */
const ROOT          = __dirname;
const POSTS_DIR     = path.join(ROOT, 'content', 'posts');
const BLOG_DIR      = path.join(ROOT, 'blog');
const TMPL_POST     = path.join(ROOT, 'templates', 'post.html');
const TMPL_INDEX    = path.join(ROOT, 'templates', 'blog-index.html');
const INDEX_HTML    = path.join(ROOT, 'index.html');
const SITEMAP_XML   = path.join(ROOT, 'sitemap.xml');
const SITE_URL      = 'https://joelgruporh.mx';
const DEFAULT_LANG  = 'es';

/* ── Helpers ────────────────────────────────────────────────── */
function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`✗ Could not parse ${filePath}:`, e.message);
    return null;
  }
}

function readTemplate(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Template not found: ${filePath}`);
    process.exit(1);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function formatDate(isoDate, lang) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/* ── Load all posts ─────────────────────────────────────────── */
function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => readJSON(path.join(POSTS_DIR, f)))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* ── Render a single blog card (used in listing pages) ─────── */
/* imgPrefix  — prepended to asset paths  ('' from root, '../' from blog/) */
/* inBlogDir  — true when rendering cards inside blog/index.html           */
function renderCard(post, imgPrefix = '', inBlogDir = false) {
  const linkHref = inBlogDir ? `${post.slug}/index.html` : `blog/${post.slug}/index.html`;

  const img = post.image
    ? `<img src="${imgPrefix}${post.image}" alt="${post.image_alt_es || ''}" loading="lazy" />`
    : `<div class="blog-thumb-placeholder">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8511F" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      </div>`;

  const excerpt_es = (post.content_es || '').replace(/<[^>]+>/g, '').slice(0, 160) + '…';
  const excerpt_en = (post.content_en || '').replace(/<[^>]+>/g, '').slice(0, 160) + '…';

  return `
<article class="blog-card reveal">
  <div class="blog-thumb">${img}</div>
  <div class="blog-body">
    <div class="blog-meta">
      <span class="blog-cat"
            data-es="${post.category || 'Artículo'}"
            data-en="${post.category_en || post.category || 'Article'}">${post.category || 'Artículo'}</span>
      <time class="blog-date" datetime="${post.date}">${formatDate(post.date, DEFAULT_LANG)}</time>
    </div>
    <h3 data-es="${post.title_es}" data-en="${post.title_en}">${post.title_es}</h3>
    <p data-es="${excerpt_es}" data-en="${excerpt_en}">${excerpt_es}</p>
    <a href="${linkHref}" class="blog-read"
       data-es="Leer más →" data-en="Read more →">Leer más →</a>
  </div>
</article>`.trim();
}

/* ── Generate individual post pages ────────────────────────── */
function buildPostPages(posts) {
  const tmpl = readTemplate(TMPL_POST);

  posts.forEach(post => {
    const postDir = path.join(BLOG_DIR, post.slug);
    ensureDir(postDir);

    const content = post.content_es || '<p>Contenido próximamente.</p>';
    const imageTag = post.image
      ? `<img class="post-img" src="../../${post.image}" alt="${post.image_alt_es || ''}" loading="lazy" />`
      : '';

    const html = tmpl
      .replace(/{{SLUG}}/g,           post.slug)
      .replace(/{{TITLE}}/g,          post.title_es)
      .replace(/{{DESCRIPTION}}/g,    post.description_es || '')
      .replace(/{{AUTHOR}}/g,         post.author || 'Agente RH')
      .replace(/{{DATE}}/g,           post.date)
      .replace(/{{DATE_FORMATTED}}/g, formatDate(post.date, DEFAULT_LANG))
      .replace(/{{CATEGORY}}/g,       post.category || 'Artículo')
      .replace(/{{IMAGE}}/g,          post.image || '')
      .replace(/{{IMAGE_ALT}}/g,      post.image_alt_es || '')
      .replace(/{{LANG}}/g,           DEFAULT_LANG)
      .replace('{{#if IMAGE}}',       post.image ? '' : '<!--')
      .replace('{{/if}}',             post.image ? '' : '-->')
      .replace(/{{CONTENT}}/g,        content);

    writeFile(path.join(postDir, 'index.html'), html);
    console.log(`  ✓ blog/${post.slug}/index.html`);
  });
}

/* ── Generate blog listing page ────────────────────────────── */
function buildBlogIndex(posts) {
  const tmpl  = readTemplate(TMPL_INDEX);
  const cards = posts.map(p => renderCard(p, '../', true)).join('\n');
  const html  = tmpl.replace('{{BLOG_CARDS}}', cards);
  ensureDir(BLOG_DIR);
  writeFile(path.join(BLOG_DIR, 'index.html'), html);
  console.log('  ✓ blog/index.html');
}

/* ── Inject blog preview cards into main index.html ────────── */
function updateIndexPreview(posts) {
  if (!fs.existsSync(INDEX_HTML)) return;
  let html = fs.readFileSync(INDEX_HTML, 'utf8');

  const START = '<!-- BLOG_PREVIEW_CARDS -->';
  const END   = '<!-- /BLOG_PREVIEW_CARDS -->';
  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s === -1 || e === -1) {
    console.log('  ⚠ Blog preview markers not found in index.html — skipping injection.');
    return;
  }

  const latest3 = posts.slice(0, 3);
  const cards   = latest3.map((p, i) => {
    const card = renderCard(p, '');
    return card.replace('class="blog-card reveal"', `class="blog-card reveal reveal-d${i + 1}"`);
  }).join('\n');

  html = html.slice(0, s + START.length) + '\n' + cards + '\n' + html.slice(e);
  writeFile(INDEX_HTML, html);
  console.log('  ✓ index.html blog preview updated');
}

/* ── Generate sitemap.xml ───────────────────────────────────── */
function buildSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/',      changefreq: 'weekly',  priority: '1.0', lastmod: today },
    { url: '/blog/', changefreq: 'daily',   priority: '0.9', lastmod: today },
  ];

  const postEntries = posts.map(p => ({
    url:        `/blog/${p.slug}/`,
    changefreq: 'monthly',
    priority:   '0.8',
    lastmod:    p.date,
  }));

  const entries = [...staticPages, ...postEntries].map(p => `
  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}
</urlset>
`;
  writeFile(SITEMAP_XML, xml);
  console.log('  ✓ sitemap.xml');
}

/* ── Main ───────────────────────────────────────────────────── */
function build() {
  console.log('\n🔨 Grupo RH — Building static blog...\n');

  const posts = loadPosts();
  console.log(`  Found ${posts.length} post(s) in content/posts/\n`);

  if (posts.length > 0) {
    buildPostPages(posts);
    buildBlogIndex(posts);
    updateIndexPreview(posts);
  } else {
    console.log('  ℹ No posts found. Add JSON files to content/posts/ and re-run.');
    /* Still write an empty blog index */
    buildBlogIndex([]);
  }

  buildSitemap(posts);

  console.log('\n✅ Build complete.\n');
}

build();
