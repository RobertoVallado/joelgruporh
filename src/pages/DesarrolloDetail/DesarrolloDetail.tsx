import { useParams, Link } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import PageSeo from '../../components/seo/PageSeo'
import JsonLd from '../../components/seo/JsonLd'
import ImageGallery from '../../components/ui/ImageGallery'
import MotionSection from '../../components/ui/MotionSection'
import { DESARROLLOS } from '../../data/desarrollos'
import { SITE_URL, WHATSAPP_BASE, EMAIL, FORMSPREE_ID } from '../../config/site'
import NotFound from '../NotFound/NotFound'

function DesarrolloForm({ devName }: { devName: string }) {
  const { t } = useTranslation()
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  if (state.succeeded) {
    return (
      <p style={{ color: 'var(--green)', fontWeight: 600, padding: '1rem 0' }}>
        {t('contact.formSuccess')}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input name="nombre" type="text" placeholder={t('contact.formName')} required />
      <ValidationError field="nombre" prefix={t('contact.formName')} errors={state.errors} className="form-error" />

      <input name="email" type="email" placeholder={t('contact.formEmail')} required />
      <ValidationError field="email" prefix={t('contact.formEmail')} errors={state.errors} className="form-error" />

      <input name="telefono" type="tel" placeholder={t('contact.formPhone')} />

      <input type="hidden" name="proyecto" value={devName} />

      <ValidationError errors={state.errors} className="form-error" />

      <button type="submit" className="btn btn-primary btn-full" disabled={state.submitting}>
        {state.submitting ? t('contact.formSending') : t('contact.formSubmit')}
      </button>

      <p className="contact-email-alt">
        {t('contact.orEmail')} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </form>
  )
}

export default function DesarrolloDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { lang } = useLang()

  const dev = DESARROLLOS.find((d) => d.slug === slug)
  if (!dev) return <NotFound />

  const seoTitle = t(dev.seoTitleKey)
  const seoDesc = t(dev.seoDescKey)
  const ogImage = dev.conceptImages[0] ? `${SITE_URL}${dev.conceptImages[0]}` : undefined

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: dev.name,
    description: seoDesc,
    url: `${SITE_URL}/${lang}/desarrollos/${dev.slug}/`,
    ...(ogImage && { image: ogImage }),
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Joel Pacheco — Grupo RH',
      url: SITE_URL,
    },
  }

  return (
    <>
      <PageSeo
        titleOverride={seoTitle}
        descriptionOverride={seoDesc}
        canonical={`/${lang}/desarrollos/${dev.slug}/`}
        ogImage={ogImage}
      />
      <JsonLd schema={productSchema} />

      {/* Hero */}
      <section
        className="dev-detail-hero"
        style={{ background: dev.gradient }}
        aria-label={dev.name}
      >
        <div className="container">
          <Link to={`/${lang}/#desarrollos`} className="dev-detail-back">
            {t('desarrollos.back')}
          </Link>
          <img src={dev.logo} alt={dev.logoAlt} className="dev-detail-logo" />
          <span className="label dev-detail-label">{t(dev.badgeKey)}</span>
          <h1 className="dev-detail-tagline">{t(dev.taglineKey)}</h1>
          <p className="dev-detail-name">{dev.name}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="dev-detail-section">
        <div className="container">
          <MotionSection>
            <h2 className="dev-detail-section-title">{t('desarrollos.conceptImages')}</h2>
            <ImageGallery images={dev.conceptImages} alt={dev.name} />
          </MotionSection>
        </div>
      </section>

      {/* Body + Form */}
      <section className="dev-detail-section dev-detail-section--alt">
        <div className="container">
          <div className="dev-detail-grid">
            <MotionSection>
              <p className="dev-detail-body">{t(dev.bodyKey)}</p>
              <a
                href={`${WHATSAPP_BASE}?text=${dev.whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '2rem' }}
              >
                {t('desarrollos.whatsapp')}
              </a>
            </MotionSection>

            <MotionSection delay={0.1}>
              <div className="contact-agent-slot">
                <h3>{t('desarrollos.formHeading')}</h3>
                <p className="slot-sub">{t('desarrollos.formSub')}</p>
                <DesarrolloForm devName={dev.name} />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </>
  )
}
