import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'
import { useReveal } from '../../../hooks/useReveal'
import MotionSection from '../../../components/ui/MotionSection'
import { DESARROLLOS } from '../../../data/desarrollos'

const SOLD_OUT_GRADIENT = 'linear-gradient(135deg,#0D1F18,#1B3A2D)'

export default function Developments() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="desarrollos" aria-labelledby="desarrollos-title" ref={sectionRef}>
      <div className="container">
        <div className="dev-header-row">
          <MotionSection>
            <span className="label">{t('developments.sectionLabel')}</span>
            <h2 id="desarrollos-title">{t('developments.heading')}</h2>
          </MotionSection>
          <a href={`/${lang}/#contacto`} className="btn btn-outline">
            {t('developments.requestInfo')}
          </a>
        </div>

        <div className="developments-grid">
          {DESARROLLOS.map((dev, i) => (
            <article
              key={dev.slug}
              className={`dev-card reveal reveal-d${(i % 3) + 1}`}
            >
              <div className="dev-thumb" style={{ background: dev.gradient }}>
                {dev.conceptImages[0] && (
                  <img
                    src={dev.conceptImages[0]}
                    alt={t(dev.altKey)}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                )}
                <div className="dev-color-block" aria-hidden="true">
                  <span className="dev-color-initial">{dev.initials}</span>
                </div>
                <span className="dev-badge">{t(dev.badgeKey)}</span>
              </div>
              <div className="dev-body">
                <img
                  className="dev-logo"
                  data-logo={dev.slug}
                  src={dev.logo}
                  alt={dev.logoAlt}
                  loading="lazy"
                />
                <p className="dev-tagline">{t(dev.taglineKey)}</p>
                <h3>{dev.name}</h3>
                <p>{t(dev.bodyKey)}</p>
                <Link to={`/${lang}/desarrollos/${dev.slug}/`} className="btn btn-outline">
                  {t(dev.ctaKey)}
                </Link>
              </div>
            </article>
          ))}

          {/* Sold-out callout — matches original: reveal-d3 */}
          <article className="dev-card sold-out reveal reveal-d3">
            <div className="dev-thumb" style={{ background: SOLD_OUT_GRADIENT }}>
              <div className="dev-color-block" aria-hidden="true">
                <span className="dev-color-initial">100%</span>
              </div>
              <span className="dev-badge">{t('developments.soldOut.badge')}</span>
            </div>
            <div className="dev-body">
              <p className="dev-tagline">{t('developments.soldOut.tagline')}</p>
              <h3>{t('developments.soldOut.heading')}</h3>
              <p>{t('developments.soldOut.body')}</p>
              <a href={`/${lang}/#contacto`} className="btn btn-outline-light">
                {t('developments.soldOut.cta')}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
