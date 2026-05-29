export const SITE_URL = 'https://joelpacheco-gruporh.robertovallado.dev'
export const PHONE = '+529993708117'
export const PHONE_DISPLAY = '+52 999 370 8117'
export const EMAIL = 'joel.pacheco@gruporh.mx'
export const WHATSAPP_BASE = `https://wa.me/${PHONE}`

export const SOCIALS = {
  facebook: 'https://www.facebook.com/gruporhyucatan',
  instagram: 'https://www.instagram.com/gruporh.mx/',
  youtube: 'https://www.youtube.com/@SomosGrupoRH',
  linkedin: 'https://mx.linkedin.com/company/desarrolladora-gruporh',
  tiktok: 'https://www.tiktok.com/@gruporh_mx',
}

export const REAL_ESTATE_AGENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'LocalBusiness'],
  name: 'Joel Pacheco — Grupo RH',
  alternateName: 'Grupo RH Desarrollo Inmobiliario Peninsular',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/gruporh-logo.webp`,
  image: `${SITE_URL}/assets/images/og-cover.jpg`,
  description:
    'Desarrollos inmobiliarios residenciales y costeros en Mérida y Yucatán con certeza jurídica y alta plusvalía.',
  telephone: PHONE,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C. 61 250B, entre C. 32A',
    addressLocality: 'Mérida',
    addressRegion: 'Yucatán',
    postalCode: '97117',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 20.9733,
    longitude: -89.6216,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: '$$',
  areaServed: { '@type': 'State', name: 'Yucatán' },
  sameAs: [
    'https://www.facebook.com/gruporhyucatan',
    'https://www.instagram.com/gruporh.mx/',
    'https://www.youtube.com/@SomosGrupoRH',
    'https://mx.linkedin.com/company/desarrolladora-gruporh',
    'https://www.tiktok.com/@gruporh_mx',
  ],
}
