import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import { SITE_URL } from '../../config/site'

interface PageSeoProps {
  titleKey?: string
  descriptionKey?: string
  titleOverride?: string
  descriptionOverride?: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  articleMeta?: {
    publishedTime: string
    author: string
    section: string
  }
}

export default function PageSeo({
  titleKey,
  descriptionKey,
  titleOverride,
  descriptionOverride,
  canonical,
  ogImage = `${SITE_URL}/assets/images/og-cover.jpg`,
  ogType = 'website',
  articleMeta,
}: PageSeoProps) {
  const { t } = useTranslation()
  const { lang } = useLang()

  const title = titleOverride ?? (titleKey ? t(titleKey) : '')
  const description = descriptionOverride ?? (descriptionKey ? t(descriptionKey) : '')

  const canonicalUrl = `${SITE_URL}${canonical}`
  const altLang = lang === 'es' ? 'en' : 'es'
  const altCanonical = canonicalUrl.replace(`/${lang}/`, `/${altLang}/`)
  const xDefaultCanonical = canonicalUrl.replace(`/${lang}/`, '/es/')

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      <link rel="alternate" hrefLang={altLang} href={altCanonical} />
      <link rel="alternate" hrefLang="x-default" href={xDefaultCanonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Grupo RH — Joel Pacheco" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'es' ? 'es_MX' : 'en_US'} />
      <meta
        property="og:locale:alternate"
        content={lang === 'es' ? 'en_US' : 'es_MX'}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {articleMeta && (
        <>
          <meta property="article:published_time" content={articleMeta.publishedTime} />
          <meta property="article:author" content={articleMeta.author} />
          <meta property="article:section" content={articleMeta.section} />
        </>
      )}
    </Helmet>
  )
}
