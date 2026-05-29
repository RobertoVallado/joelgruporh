import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'
import MotionSection from '../../../components/ui/MotionSection'
import BlogCard from '../../../components/blog/BlogCard'
import { allPosts } from '../../../data/posts'

export default function BlogPreview() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const previewPosts = allPosts.slice(0, 2)

  return (
    <section id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div className="blog-hdr">
          <div>
            <MotionSection>
              <span className="label">{t('blogPreview.sectionLabel')}</span>
              <h2 id="blog-title">{t('blogPreview.heading')}</h2>
            </MotionSection>
          </div>
          <Link to={`/${lang}/blog/`} className="btn btn-outline">
            {t('blogPreview.viewAll')}
          </Link>
        </div>

        <div className="blog-grid">
          {previewPosts.map((post, i) => (
            <MotionSection key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} lang={lang} />
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
