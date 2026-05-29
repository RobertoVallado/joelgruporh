import { useTranslation } from 'react-i18next'
import MotionSection from '../../../components/ui/MotionSection'
import LazyImage from '../../../components/ui/LazyImage'

const CARDS = [
  {
    num: '01',
    img: '/assets/images/img-transparencia.webp',
    titleKey: 'guarantees.card1Title',
    bodyKey: 'guarantees.card1Body',
    altKey: 'guarantees.card1Alt',
  },
  {
    num: '02',
    img: '/assets/images/img-retorno.webp',
    titleKey: 'guarantees.card2Title',
    bodyKey: 'guarantees.card2Body',
    altKey: 'guarantees.card2Alt',
  },
  {
    num: '03',
    img: '/assets/images/img-seguridad.webp',
    titleKey: 'guarantees.card3Title',
    bodyKey: 'guarantees.card3Body',
    altKey: 'guarantees.card3Alt',
  },
]

export default function Guarantees() {
  const { t } = useTranslation()

  return (
    <section id="garantias" aria-labelledby="garantias-title">
      <div className="container">
        <MotionSection className="section-hdr">
          <span className="label">{t('guarantees.sectionLabel')}</span>
          <h2 id="garantias-title">{t('guarantees.heading')}</h2>
        </MotionSection>

        <div className="guarantees-grid">
          {CARDS.map(({ num, img, titleKey, bodyKey, altKey }, i) => (
            <MotionSection key={num} className="g-card" delay={i * 0.1}>
              <div className="g-card-img">
                <LazyImage src={img} alt={t(altKey)} />
              </div>
              <div className="g-card-body">
                <div className="g-card-num" aria-hidden="true">
                  {num}
                </div>
                <h3>{t(titleKey)}</h3>
                <p>{t(bodyKey)}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
