import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import JsonLd from '../../components/seo/JsonLd'
import LazyImage from '../../components/ui/LazyImage'
import { allPosts } from '../../data/posts'
import NotFound from '../NotFound/NotFound'
import { SITE_URL } from '../../config/site'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { lang } = useLang()

  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const title = post[`title_${lang}` as keyof typeof post] as string
  const description = post[`description_${lang}` as keyof typeof post] as string
  const content = post[`content_${lang}` as keyof typeof post] as string
  const category = lang === 'es' ? post.category : post.category_en
  const imageAlt = (post[`image_alt_${lang}` as keyof typeof post] as string) ?? title

  const dateFormatted = new Date(post.date).toLocaleDateString(
    lang === 'es' ? 'es-MX' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Grupo RH — Joel Pacheco',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/gruporh-logo.webp`,
      },
    },
    ...(post.image && { image: `${SITE_URL}/${post.image}` }),
    articleSection: category,
    inLanguage: lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/blog/${post.slug}/`,
    },
  }

  return (
    <>
      <PageSeo
        titleOverride={title}
        descriptionOverride={description}
        canonical={`/${lang}/blog/${post.slug}/`}
        ogType="article"
        ogImage={post.image ? `${SITE_URL}/${post.image}` : undefined}
        articleMeta={{
          publishedTime: post.date,
          author: post.author,
          section: category,
        }}
      />
      <JsonLd schema={articleSchema} />

      <section className="post-hero">
        <div className="container">
          <nav className="post-breadcrumb" aria-label="Breadcrumb">
            <Link to={`/${lang}/blog/`}>{t('blog.backToBlog')}</Link>
          </nav>
          <span className="blog-cat">{category}</span>
          <h1>{title}</h1>
          <div className="post-meta-bar">
            <span className="author">
              {t('blog.by')} {post.author}
            </span>
            <time dateTime={post.date}>{dateFormatted}</time>
          </div>
        </div>
      </section>

      <div className="post-body-wrap">
        {post.image && (
          <LazyImage
            src={`/${post.image}`}
            alt={imageAlt}
            className="post-img"
          />
        )}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link to={`/${lang}/blog/`} className="post-back">
          {t('blog.backToBlog')}
        </Link>
      </div>
    </>
  )
}
