import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'
import { useActiveNav } from '../../../hooks/useActiveNav'
import MobileDrawer from '../MobileDrawer/MobileDrawer'

const NAV_SECTIONS = ['nosotros', 'garantias', 'desarrollos', 'blog', 'contacto']

export default function Header() {
  const { t } = useTranslation()
  const { lang, switchLang } = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeId = useActiveNav(NAV_SECTIONS)
  const targetLang = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Determine active link: scroll-based on home, path-based elsewhere
  const isHome = location.pathname === `/${lang}` || location.pathname === `/${lang}/`
  const pathSection = location.pathname.split('/').pop() ?? ''
  const active = isHome ? activeId : pathSection

  const navLink = (section: string, label: string) => (
    <Link
      to={`/${lang}/${section}`}
      role="listitem"
      className={active === section ? 'active' : ''}
    >
      {label}
    </Link>
  )

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav aria-label={t('nav.mobileMenu')}>
        <Link to={`/${lang}/`} className="logo" aria-label="Joel Pacheco — Grupo RH">
          <span className="logo-name">Joel Pacheco</span>
          <span className="logo-sep" aria-hidden="true"> | </span>
          <span className="logo-title">{t('nav.logoTitle')}</span>
        </Link>

        <div className="nav-links" role="list">
          {navLink('nosotros',   t('nav.about'))}
          {navLink('garantias',  t('nav.guarantees'))}
          {navLink('desarrollos',t('nav.developments'))}
          <Link
            to={`/${lang}/blog/`}
            role="listitem"
            className={location.pathname.includes('/blog') ? 'active' : ''}
          >
            {t('nav.blog')}
          </Link>
          {navLink('contacto', t('nav.contact'))}
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
