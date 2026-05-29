import { useEffect } from 'react'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import JsonLd from '../../components/seo/JsonLd'
import Hero from './sections/Hero'
import Guarantees from './sections/Guarantees'
import Developments from './sections/Developments'
import About from './sections/About'
import BlogPreview from './sections/BlogPreview'
import Contact from './sections/Contact'
import { REAL_ESTATE_AGENT_SCHEMA, SITE_URL } from '../../config/site'

const NAV_H = 72

const SECTION_SEO: Record<string, { titleKey: string; descKey: string }> = {
  nosotros:   { titleKey: 'seo.nosotrosTitle',   descKey: 'seo.nosotrosDesc'   },
  garantias:  { titleKey: 'seo.garantiasTitle',  descKey: 'seo.garantiasDesc'  },
  desarrollos:{ titleKey: 'seo.desarrollosSectionTitle', descKey: 'seo.desarrollosSectionDesc' },
  contacto:   { titleKey: 'seo.contactoTitle',   descKey: 'seo.contactoDesc'   },
}

interface HomeProps {
  section?: string
}

export default function Home({ section }: HomeProps) {
  const { lang } = useLang()

  useEffect(() => {
    if (!section) {
      window.scrollTo({ top: 0 })
      return
    }
    const el = document.getElementById(section)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_H
    window.scrollTo({ top, behavior: 'smooth' })
  }, [section])

  const seo = section ? SECTION_SEO[section] : null
  const titleKey = seo?.titleKey ?? 'seo.homeTitle'
  const descKey  = seo?.descKey  ?? 'seo.homeDesc'
  const canonical = section ? `/${lang}/${section}` : `/${lang}/`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'es' ? 'Inicio' : 'Home',
        item: `${SITE_URL}/${lang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'es' ? 'Desarrollos' : 'Developments',
        item: `${SITE_URL}/${lang}/desarrollos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blog',
        item: `${SITE_URL}/${lang}/blog/`,
      },
    ],
  }

  return (
    <>
      <PageSeo
        titleKey={titleKey}
        descriptionKey={descKey}
        canonical={canonical}
      />
      <JsonLd schema={REAL_ESTATE_AGENT_SCHEMA as Record<string, unknown>} />
      <JsonLd schema={breadcrumbSchema} />
      <Hero />
      <Guarantees />
      <Developments />
      <About />
      <BlogPreview />
      <Contact />
    </>
  )
}
