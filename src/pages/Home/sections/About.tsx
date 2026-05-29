import { useTranslation } from 'react-i18next'
import MotionSection from '../../../components/ui/MotionSection'

const VALUES = [
  { strongKey: 'about.value1Strong', restKey: 'about.value1Rest' },
  { strongKey: 'about.value2Strong', restKey: 'about.value2Rest' },
  { strongKey: 'about.value3Strong', restKey: 'about.value3Rest' },
  { strongKey: 'about.value4Strong', restKey: 'about.value4Rest' },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="nosotros" aria-labelledby="nosotros-title">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-hdr">
              <span className="label">{t('about.sectionLabel')}</span>
              <h2 id="nosotros-title">{t('about.heading')}</h2>
            </div>

            <MotionSection className="about-lead">
              <p>{t('about.lead')}</p>
            </MotionSection>

            <MotionSection className="gpw-badge" delay={0.1}>
              <img
                src="/assets/images/gptw.png"
                alt={t('about.gpwAlt')}
                width={48}
                height={48}
                loading="lazy"
              />
              <div className="gpw-text">
                <span>{t('about.gpwCertifiedAs')}</span>
                <strong>{t('about.gpwTitle')}</strong>
              </div>
            </MotionSection>
          </div>

          <div className="values-list">
            {VALUES.map(({ strongKey, restKey }, i) => (
              <MotionSection key={strongKey} className="val-item" delay={i * 0.1}>
                <div className="val-dot" />
                <p>
                  <strong>{t(strongKey)}</strong>
                  {' '}
                  {t(restKey)}
                </p>
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
