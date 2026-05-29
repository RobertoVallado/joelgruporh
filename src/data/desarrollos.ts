export interface Desarrollo {
  slug: string
  name: string
  gradient: string
  initials: string
  logo: string
  logoAlt: string
  conceptImages: string[]
  whatsappMsg: string
  badgeKey: string
  taglineKey: string
  bodyKey: string
  ctaKey: string
  altKey: string
  seoTitleKey: string
  seoDescKey: string
}

export const DESARROLLOS: Desarrollo[] = [
  {
    slug: 'gran-verona',
    name: 'Gran Verona',
    gradient: 'linear-gradient(135deg,#1A3A2A,#2D6B47)',
    initials: 'GV',
    logo: '/assets/images/logos/gran-verona-logo.png',
    logoAlt: 'Gran Verona',
    conceptImages: [
      '/assets/images/concept-images/gran-verona.webp',
      '/assets/images/concept-images/gran-verona-02.webp',
      '/assets/images/concept-images/gran-verona-03.webp',
    ],
    whatsappMsg: 'Hola%2C%20me%20interesa%20cotizar%20Gran%20Verona',
    badgeKey: 'developments.granVerona.badge',
    taglineKey: 'developments.granVerona.tagline',
    bodyKey: 'developments.granVerona.body',
    ctaKey: 'developments.quoteNow',
    altKey: 'developments.granVerona.alt',
    seoTitleKey: 'seo.granVeronaTitle',
    seoDescKey: 'seo.granVeronaDesc',
  },
  {
    slug: 'playa-clara',
    name: 'Playa Clara',
    gradient: 'linear-gradient(135deg,#0D3B5E,#1A6FA0)',
    initials: 'PC',
    logo: '/assets/images/logos/playa-clara-logo.svg',
    logoAlt: 'Playa Clara',
    conceptImages: [
      '/assets/images/concept-images/playa-clara.webp',
      '/assets/images/concept-images/playa-clara-02.webp',
      '/assets/images/concept-images/playa-clara-03.webp',
    ],
    whatsappMsg: 'Hola%2C%20me%20interesa%20cotizar%20Playa%20Clara',
    badgeKey: 'developments.playaClara.badge',
    taglineKey: 'developments.playaClara.tagline',
    bodyKey: 'developments.playaClara.body',
    ctaKey: 'developments.quoteNow',
    altKey: 'developments.playaClara.alt',
    seoTitleKey: 'seo.playaClaraTitle',
    seoDescKey: 'seo.playaClaraDesc',
  },
  {
    slug: 'playar',
    name: 'Playar',
    gradient: 'linear-gradient(135deg,#7A2C12,#D4622A)',
    initials: 'PL',
    logo: '/assets/images/logos/playar-logo.webp',
    logoAlt: 'Playar',
    conceptImages: [
      '/assets/images/concept-images/playar.webp',
      '/assets/images/concept-images/playar-02.webp',
      '/assets/images/concept-images/playar-03.webp',
    ],
    whatsappMsg: 'Hola%2C%20me%20interesa%20cotizar%20Playar',
    badgeKey: 'developments.playar.badge',
    taglineKey: 'developments.playar.tagline',
    bodyKey: 'developments.playar.body',
    ctaKey: 'developments.quoteNow',
    altKey: 'developments.playar.alt',
    seoTitleKey: 'seo.playarTitle',
    seoDescKey: 'seo.playarDesc',
  },
  {
    slug: 'cal-canto',
    name: 'Cal & Canto',
    gradient: 'linear-gradient(135deg,#4A2E0A,#9C6320)',
    initials: 'C&C',
    logo: '/assets/images/logos/cal-canto-logo.png',
    logoAlt: 'Cal y Canto',
    conceptImages: [
      '/assets/images/concept-images/cal-canto.webp',
      '/assets/images/concept-images/cal-canto-02.webp',
      '/assets/images/concept-images/cal-canto-03.webp',
    ],
    whatsappMsg: 'Hola%2C%20me%20interesa%20cotizar%20Cal%20%26%20Canto',
    badgeKey: 'developments.calCanto.badge',
    taglineKey: 'developments.calCanto.tagline',
    bodyKey: 'developments.calCanto.body',
    ctaKey: 'developments.quoteNow',
    altKey: 'developments.calCanto.alt',
    seoTitleKey: 'seo.calCantoTitle',
    seoDescKey: 'seo.calCantoDesc',
  },
  {
    slug: 'rhevo',
    name: 'RHEVO',
    gradient: 'linear-gradient(135deg,#1A0A35,#4A1A7A)',
    initials: 'EVO',
    logo: '/assets/images/logos/rhevo-logo.png',
    logoAlt: 'RHEVO',
    conceptImages: [
      '/assets/images/concept-images/rhevo.webp',
      '/assets/images/concept-images/rhevo-02.webp',
      '/assets/images/concept-images/rhevo-03.webp',
    ],
    whatsappMsg: 'Hola%2C%20me%20interesa%20invertir%20en%20RHEVO',
    badgeKey: 'developments.rhevo.badge',
    taglineKey: 'developments.rhevo.tagline',
    bodyKey: 'developments.rhevo.body',
    ctaKey: 'developments.rhevo.cta',
    altKey: 'developments.rhevo.alt',
    seoTitleKey: 'seo.rhevoTitle',
    seoDescKey: 'seo.rhevoDesc',
  },
]
