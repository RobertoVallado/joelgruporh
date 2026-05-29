import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '../../types/blog'
import type { Lang } from '../../hooks/useLang'
import LazyImage from '../ui/LazyImage'

interface BlogCardProps {
  post: BlogPost
  lang: Lang
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  const { t } = useTranslation()
  const title = post[`title_${lang}` as keyof BlogPost] as string
  const description = post[`description_${lang}` as keyof BlogPost] as string
  const category = lang === 'es' ? post.category : post.category_en
  const imageAlt = (post[`image_alt_${lang}` as keyof BlogPost] as string) ?? title

  const dateObj = new Date(post.date)
  const formattedDate = dateObj.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="blog-card">
      {post.image && (
        <div className="blog-thumb">
          <LazyImage src={`/${post.image}`} alt={imageAlt} />
        </div>
      )}
      <div className="blog-body">
        <div className="blog-meta">
          <span className="blog-cat">{category}</span>
          <time className="blog-date" dateTime={post.date}>
            {formattedDate}
          </time>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/${lang}/blog/${post.slug}/`} className="blog-read">
          {t('blogPreview.readMore')}
        </Link>
      </div>
    </article>
  )
}
