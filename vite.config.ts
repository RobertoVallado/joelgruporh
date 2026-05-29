import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { readdirSync } from 'fs'
import { join } from 'path'

const SITE_URL = 'https://joelpacheco-gruporh.robertovallado.dev'
const LANGS = ['es', 'en']
const SECTION_SLUGS = ['nosotros', 'garantias', 'desarrollos', 'contacto']
const DESARROLLO_SLUGS = ['gran-verona', 'playa-clara', 'playar', 'cal-canto', 'rhevo']

function getPostSlugs(): string[] {
  try {
    return readdirSync(join(process.cwd(), 'src/data/posts'))
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''))
  } catch {
    return []
  }
}

export default defineConfig(() => {
  const postSlugs = getPostSlugs()

  const dynamicRoutes = LANGS.flatMap((lang) => [
    `/${lang}/`,
    ...SECTION_SLUGS.map((s) => `/${lang}/${s}`),
    `/${lang}/blog/`,
    ...postSlugs.map((slug) => `/${lang}/blog/${slug}/`),
    ...DESARROLLO_SLUGS.map((slug) => `/${lang}/desarrollos/${slug}/`),
  ])

  return {
    base: '/',
    plugins: [
      react(),
      sitemap({
        hostname: SITE_URL,
        dynamicRoutes,
        exclude: ['/404'],
        changefreq: 'weekly',
        priority: 0.8,
      }),
    ],
  }
})
