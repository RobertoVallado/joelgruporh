import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'

export default function Footer() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">GRUPO RH</span>
          <nav className="footer-links" aria-label="Footer">
            <Link to={`/${lang}/nosotros`}>{t('footer.about')}</Link>
            <Link to={`/${lang}/desarrollos`}>{t('footer.developments')}</Link>
            <Link to={`/${lang}/blog/`}>{t('footer.blog')}</Link>
            <Link to={`/${lang}/contacto`}>{t('footer.contact')}</Link>
            <a href="#">{t('footer.privacy')}</a>
          </nav>
          <p className="footer-copy">
            &copy; {year} Grupo RH &mdash; Joel Pacheco.{' '}
            <span>{t('footer.copyright')}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
