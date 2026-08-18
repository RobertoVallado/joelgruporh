import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import GuideCard from '../../components/guides/GuideCard'
import MotionSection from '../../components/ui/MotionSection'
import { allGuides } from '../../data/guides'

export default function EcoTurismoList() {
  const { t } = useTranslation()
  const { lang } = useLang()

  return (
    <>
      <PageSeo
        titleKey="seo.ecoTurismoListTitle"
        descriptionKey="seo.ecoTurismoListDesc"
        canonical={`/${lang}/eco-turismo/`}
      />

      <section className="blog-page-hero">
        <div className="container">
          <span className="label">{t('ecoTurismo.heroLabel')}</span>
          <h1>{t('ecoTurismo.heroHeading')}</h1>
        </div>
      </section>

      <section className="blog-page-grid">
        <div className="container">
          {allGuides.length > 0 ? (
            <div className="blog-full-grid">
              {allGuides.map((guide, i) => (
                <MotionSection key={guide.slug} delay={(i % 3) * 0.1}>
                  <GuideCard guide={guide} lang={lang} />
                </MotionSection>
              ))}
            </div>
          ) : (
            <MotionSection className="empty-state">
              <h2>{t('ecoTurismo.emptyTitle')}</h2>
              <p>{t('ecoTurismo.emptyBody')}</p>
            </MotionSection>
          )}
        </div>
      </section>
    </>
  )
}
