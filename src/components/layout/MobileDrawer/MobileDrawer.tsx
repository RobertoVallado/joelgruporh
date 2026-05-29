import * as Dialog from '@radix-ui/react-dialog'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../../hooks/useLang'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { t } = useTranslation()
  const { lang, switchLang } = useLang()
  const targetLang = lang === 'es' ? 'en' : 'es'

  const close = () => onClose()

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-overlay" />
        <Dialog.Content
          id="mobile-drawer"
          className="mobile-drawer"
          aria-label={t('nav.mobileMenu')}
        >
          <Dialog.Title className="drawer-hdr">
            <span className="drawer-brand">Joel Pacheco</span>
            <Dialog.Close asChild>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: 'var(--muted)',
                  lineHeight: 1,
                }}
                aria-label={t('nav.closeMenu')}
              >
                ×
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <div className="drawer-nav">
            <Link to={`/${lang}/nosotros`}    onClick={close}>{t('nav.about')}</Link>
            <Link to={`/${lang}/garantias`}   onClick={close}>{t('nav.guarantees')}</Link>
            <Link to={`/${lang}/desarrollos`} onClick={close}>{t('nav.developments')}</Link>
            <Link to={`/${lang}/blog/`}       onClick={close}>{t('nav.blog')}</Link>
            <Link to={`/${lang}/contacto`}    onClick={close}>{t('nav.contact')}</Link>
          </div>
          <div className="drawer-foot">
            <a className="drawer-phone" href="tel:+529993708117">
              {t('mobile.phone')}
            </a>
            <button
              className="drawer-lang"
              onClick={() => {
                switchLang(targetLang)
                close()
              }}
            >
              {targetLang === 'en' ? t('mobile.switchToEnglish') : t('mobile.switchToSpanish')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
