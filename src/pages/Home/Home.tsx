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

export default function Home() {
  const { lang } = useLang()

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
        item: `${SITE_URL}/${lang}/#desarrollos`,
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
        titleKey="seo.homeTitle"
        descriptionKey="seo.homeDesc"
        canonical={`/${lang}/`}
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
