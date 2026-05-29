import { useForm, ValidationError } from '@formspree/react'
import { useTranslation } from 'react-i18next'
import MotionSection from '../../../components/ui/MotionSection'
import { EMAIL, PHONE_DISPLAY, WHATSAPP_BASE, SOCIALS, FORMSPREE_ID } from '../../../config/site'
import { DESARROLLOS } from '../../../data/desarrollos'

function ContactForm() {
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

      <select name="proyecto">
        <option value="">{t('contact.formProject')}</option>
        {DESARROLLOS.map((dev) => (
          <option key={dev.slug} value={dev.name}>
            {dev.name}
          </option>
        ))}
      </select>

      <ValidationError errors={state.errors} className="form-error" />

      <button type="submit" className="btn btn-primary btn-full" disabled={state.submitting}>
        {state.submitting ? t('contact.formSending') : t('contact.formSubmit')}
      </button>

      <p className="contact-email-alt">
        {t('contact.orEmail')}{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </form>
  )
}

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contacto" aria-labelledby="contacto-title">
      <div className="container">
        <div className="section-hdr">
          <span className="label">{t('contact.sectionLabel')}</span>
          <h2 id="contacto-title">{t('contact.heading')}</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-items">
            <MotionSection className="c-item" delay={0.1}>
              <div className="c-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="c-item-inner">
                <p className="c-label">{t('contact.addressLabel')}</p>
                <p className="c-value">
                  C. 61 250B, entre C. 32A<br />
                  San Ramón Nte, 97117<br />
                  Mérida, Yucatán, México
                </p>
              </div>
            </MotionSection>

            <MotionSection className="c-item" delay={0.15}>
              <div className="c-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="c-item-inner">
                <p className="c-label">{t('contact.phoneLabel')}</p>
                <p className="c-value">
                  <a href="tel:+529993708117">{PHONE_DISPLAY}</a>
                </p>
              </div>
            </MotionSection>

            <MotionSection className="c-item" delay={0.2}>
              <div className="c-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="c-item-inner">
                <p className="c-label">{t('contact.emailLabel')}</p>
                <p className="c-value">
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </MotionSection>

            <MotionSection className="c-item" delay={0.25}>
              <div className="c-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="c-item-inner">
                <p className="c-label">{t('contact.hoursLabel')}</p>
                <p className="c-value">{t('contact.hoursValue')}</p>
              </div>
            </MotionSection>

            <MotionSection delay={0.3}>
              <p className="c-label" style={{ marginBottom: '.875rem' }}>
                {t('contact.followUs')}
              </p>
              <div className="socials" role="list">
                <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook Grupo RH" role="listitem">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram Grupo RH" role="listitem">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube Grupo RH" role="listitem">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" /></svg>
                </a>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn Grupo RH" role="listitem">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="TikTok Grupo RH" role="listitem">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>
                </a>
              </div>
            </MotionSection>
          </div>

          <MotionSection className="contact-agent-slot" delay={0.2}>
            <h3>{t('contact.slotHeading')}</h3>
            <p className="slot-sub">{t('contact.slotSub')}</p>
            <ContactForm />
          </MotionSection>
        </div>
      </div>
    </section>
  )
}
