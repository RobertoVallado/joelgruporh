import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('seo.notFoundTitle')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'calc(var(--nav-h) + 4rem) var(--pad-x) 4rem',
          textAlign: 'center',
        }}
      >
        <p className="label" style={{ marginBottom: '1rem' }}>404</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
          {t('notFound.heading')}
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          {t('notFound.body')}
        </p>
        <Link to="/es/" className="btn btn-primary">
          {t('notFound.cta')}
        </Link>
      </section>
    </>
  )
}
