import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { EcoGuide } from '../../types/guide'
import type { Lang } from '../../hooks/useLang'
import LazyImage from '../ui/LazyImage'
import ThumbPlaceholder from '../ui/ThumbPlaceholder'

interface GuideCardProps {
  guide: EcoGuide
  lang: Lang
}

export default function GuideCard({ guide, lang }: GuideCardProps) {
  const { t } = useTranslation()
  const title = guide[`title_${lang}` as keyof EcoGuide] as string
  const description = guide[`description_${lang}` as keyof EcoGuide] as string
  const place = lang === 'es' ? guide.place_es : guide.place_en
  const imageAlt = (guide[`image_alt_${lang}` as keyof EcoGuide] as string) ?? title

  return (
    <article className="blog-card">
      <div className="blog-thumb">
        {guide.image ? (
          <LazyImage src={`/${guide.image}`} alt={imageAlt} />
        ) : (
          <ThumbPlaceholder label={place} />
        )}
      </div>
      <div className="blog-body">
        <div className="blog-meta">
          <span className="blog-cat">{place}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/${lang}/eco-turismo/${guide.slug}/`} className="blog-read">
          {t('blogPreview.readMore')}
        </Link>
      </div>
    </article>
  )
}
