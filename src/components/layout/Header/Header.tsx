import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'
import { useActiveNav } from '../../../hooks/useActiveNav'
import MobileDrawer from '../MobileDrawer/MobileDrawer'

const NAV_SECTIONS = ['nosotros', 'garantias', 'desarrollos', 'blog', 'contacto']

export default function Header() {
  const { t } = useTranslation()
  const { lang, switchLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeId = useActiveNav(NAV_SECTIONS)
  const targetLang = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav aria-label={t('nav.mobileMenu')}>
        <Link to={`/${lang}/`} className="logo" aria-label="Joel Pacheco — Grupo RH">
          <span className="logo-name">Joel Pacheco</span>
          <span className="logo-sep" aria-hidden="true"> | </span>
          <span className="logo-title">{t('nav.logoTitle')}</span>
        </Link>

        <div className="nav-links" role="list">
          <a
            href={`/${lang}/#nosotros`}
            role="listitem"
            className={activeId === 'nosotros' ? 'active' : ''}
          >
            {t('nav.about')}
          </a>
          <a
            href={`/${lang}/#garantias`}
            role="listitem"
            className={activeId === 'garantias' ? 'active' : ''}
          >
            {t('nav.guarantees')}
          </a>
          <a
            href={`/${lang}/#desarrollos`}
            role="listitem"
            className={activeId === 'desarrollos' ? 'active' : ''}
          >
            {t('nav.developments')}
          </a>
          <Link
            to={`/${lang}/blog/`}
            role="listitem"
            className={activeId === 'blog' ? 'active' : ''}
          >
            {t('nav.blog')}
          </Link>
          <a
            href={`/${lang}/#contacto`}
            role="listitem"
            className={activeId === 'contacto' ? 'active' : ''}
          >
            {t('nav.contact')}
          </a>
        </div>

        <div className="nav-actions">
          <button
            id="lang-toggle"
            aria-label={`Switch to ${targetLang.toUpperCase()}`}
            onClick={() => switchLang(targetLang)}
          >
            {t('nav.langLabel')}
          </button>
          <button
            className="hamburger"
            aria-label={t('nav.openMenu')}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}
