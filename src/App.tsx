import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import WhatsAppFloat from './components/ui/WhatsAppFloat'

const Home = lazy(() => import('./pages/Home/Home'))
const BlogList = lazy(() => import('./pages/BlogList/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost/BlogPost'))
const DesarrolloDetail = lazy(() => import('./pages/DesarrolloDetail/DesarrolloDetail'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function LangLayout() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang === 'es' || lang === 'en') {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  if (lang !== 'es' && lang !== 'en') {
    return <Navigate to="/es/" replace />
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
        <Outlet />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/es/" replace />} />
      <Route path=":lang" element={<LangLayout />}>
        <Route index element={<Home />} />
        {/* Section routes — render Home and scroll to the named section */}
        <Route path="nosotros" element={<Home section="nosotros" />} />
        <Route path="garantias" element={<Home section="garantias" />} />
        <Route path="desarrollos" element={<Home section="desarrollos" />} />
        <Route path="contacto" element={<Home section="contacto" />} />
        {/* Content routes */}
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="desarrollos/:slug" element={<DesarrolloDetail />} />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}
