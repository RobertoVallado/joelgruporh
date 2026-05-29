import { useParams, useNavigate, useLocation } from 'react-router-dom'

export type Lang = 'es' | 'en'

export function useLang() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const currentLang: Lang = lang === 'en' ? 'en' : 'es'

  function switchLang(target: Lang) {
    const newPath = location.pathname.replace(/^\/(es|en)/, `/${target}`)
    navigate(newPath + location.search, { replace: true })
  }

  return { lang: currentLang, switchLang }
}
