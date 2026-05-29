import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../../../hooks/useReveal'
import MotionSection from '../../../components/ui/MotionSection'

const CARDS = [
  {
    num: '01',
    img: '/assets/images/img-transparencia.webp',
    titleKey: 'guarantees.card1Title',
    bodyKey: 'guarantees.card1Body',
    altKey: 'guarantees.card1Alt',
    delayClass: 'reveal',        // no stagger — matches original
  },
  {
    num: '02',
    img: '/assets/images/img-retorno.webp',
    titleKey: 'guarantees.card2Title',
    bodyKey: 'guarantees.card2Body',
    altKey: 'guarantees.card2Alt',
    delayClass: 'reveal reveal-d2',
  },
  {
    num: '03',
    img: '/assets/images/img-seguridad.webp',
    titleKey: 'guarantees.card3Title',
    bodyKey: 'guarantees.card3Body',
    altKey: 'guarantees.card3Alt',
    delayClass: 'reveal reveal-d3',
  },
]

export default function Guarantees() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="garantias" aria-labelledby="garantias-title" ref={sectionRef}>
      <div className="container">
        <MotionSection className="section-hdr">
          <span className="label">{t('guarantees.sectionLabel')}</span>
          <h2 id="garantias-title">{t('guarantees.heading')}</h2>
        </MotionSection>

        <div className="guarantees-grid">
          {CARDS.map(({ num, img, titleKey, bodyKey, altKey, delayClass }) => (
            <article key={num} className={`g-card ${delayClass}`}>
              <div className="g-card-img">
                <img src={img} alt={t(altKey)} loading="lazy" />
              </div>
              <div className="g-card-body">
                <div className="g-card-num" aria-hidden="true">
                  {num}
                </div>
                <h3>{t(titleKey)}</h3>
                <p>{t(bodyKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
