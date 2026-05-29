import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'

export default function Hero() {
  const { t } = useTranslation()
  const { lang } = useLang()

  return (
    <section id="hero" aria-label="Hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-mark" aria-hidden="true">RH</div>

      <div className="hero-content">
        <p className="hero-eyebrow">{t('hero.eyebrow')}</p>

        <h1>
          {t('hero.headingLine1')}
          <br />
          <em>{t('hero.headingLine2')}</em>
        </h1>

        <p className="hero-sub">{t('hero.sub')}</p>

        <div className="hero-ctas">
          <Link to={`/${lang}/desarrollos`} className="btn btn-outline-light">
            {t('hero.ctaView')}
          </Link>
          <Link to={`/${lang}/contacto`} className="btn btn-primary">
            {t('hero.ctaTalk')}
          </Link>
        </div>
      </div>

      <div className="hero-stats" aria-label="Estadísticas">
        <div className="hero-stat">
          <div className="hero-stat-num">5</div>
          <div className="hero-stat-label">{t('hero.stat1Label')}</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">4</div>
          <div className="hero-stat-label">{t('hero.stat2Label')}</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">24/7</div>
          <div className="hero-stat-label">{t('hero.stat3Label')}</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">GPW</div>
          <div className="hero-stat-label">{t('hero.stat4Label')}</div>
        </div>
      </div>
    </section>
  )
}
