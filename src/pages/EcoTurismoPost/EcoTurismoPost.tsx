import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import JsonLd from '../../components/seo/JsonLd'
import LazyImage from '../../components/ui/LazyImage'
import { allGuides } from '../../data/guides'
import NotFound from '../NotFound/NotFound'
import { SITE_URL } from '../../config/site'

export default function EcoTurismoPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { lang } = useLang()

  const guide = allGuides.find((g) => g.slug === slug)
  if (!guide) return <NotFound />

  const title = guide[`title_${lang}` as keyof typeof guide] as string
  const description = guide[`description_${lang}` as keyof typeof guide] as string
  const content = guide[`content_${lang}` as keyof typeof guide] as string
  const place = lang === 'es' ? guide.place_es : guide.place_en
  const imageAlt = (guide[`image_alt_${lang}` as keyof typeof guide] as string) ?? title

  const dateFormatted = new Date(guide.date).toLocaleDateString(
    lang === 'es' ? 'es-MX' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: guide.author },
    datePublished: guide.date,
    publisher: {
      '@type': 'Organization',
      name: 'Grupo RH — Joel Pacheco',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/gruporh-logo.webp`,
      },
    },
    ...(guide.image && { image: `${SITE_URL}/${guide.image}` }),
    articleSection: place,
    inLanguage: lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/eco-turismo/${guide.slug}/`,
    },
  }

  return (
    <>
      <PageSeo
        titleOverride={title}
        descriptionOverride={description}
        canonical={`/${lang}/eco-turismo/${guide.slug}/`}
        ogType="article"
        ogImage={guide.image ? `${SITE_URL}/${guide.image}` : undefined}
        articleMeta={{
          publishedTime: guide.date,
          author: guide.author,
          section: place,
        }}
      />
      <JsonLd schema={articleSchema} />

      <section className="post-hero">
        <div className="container">
          <nav className="post-breadcrumb" aria-label="Breadcrumb">
            <Link to={`/${lang}/eco-turismo/`}>{t('ecoTurismo.backToGuides')}</Link>
          </nav>
          <span className="blog-cat">{place}</span>
          <h1>{title}</h1>
          <div className="post-meta-bar">
            <span className="author">
              {t('blog.by')} {guide.author}
            </span>
            <time dateTime={guide.date}>{dateFormatted}</time>
          </div>
        </div>
      </section>

      <div className="post-body-wrap">
        {guide.image && (
          <LazyImage
            src={`/${guide.image}`}
            alt={imageAlt}
            className="post-img"
          />
        )}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link to={`/${lang}/eco-turismo/`} className="post-back">
          {t('ecoTurismo.backToGuides')}
        </Link>
      </div>
    </>
  )
}
