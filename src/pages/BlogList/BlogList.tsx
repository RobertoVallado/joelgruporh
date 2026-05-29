import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import BlogCard from '../../components/blog/BlogCard'
import MotionSection from '../../components/ui/MotionSection'
import { allPosts } from '../../data/posts'

export default function BlogList() {
  const { t } = useTranslation()
  const { lang } = useLang()

  return (
    <>
      <PageSeo
        titleKey="seo.blogListTitle"
        descriptionKey="seo.blogListDesc"
        canonical={`/${lang}/blog/`}
      />

      <section className="blog-page-hero">
        <div className="container">
          <span className="label">{t('blog.heroLabel')}</span>
          <h1>{t('blog.heroHeading')}</h1>
        </div>
      </section>

      <section className="blog-page-grid">
        <div className="container">
          <div className="blog-full-grid">
            {allPosts.map((post, i) => (
              <MotionSection key={post.slug} delay={(i % 3) * 0.1}>
                <BlogCard post={post} lang={lang} />
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
