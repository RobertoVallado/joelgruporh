export interface BlogPost {
  slug: string
  title_es: string
  title_en: string
  description_es: string
  description_en: string
  date: string
  author: string
  category: string
  category_en: string
  tags: string[]
  image?: string
  image_alt_es?: string
  image_alt_en?: string
  content_es: string
  content_en: string
}
