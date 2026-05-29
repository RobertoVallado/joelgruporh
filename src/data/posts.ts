import type { BlogPost } from '../types/blog'

const postModules = import.meta.glob<{ default: BlogPost }>('./posts/*.json', { eager: true })

export const allPosts: BlogPost[] = Object.values(postModules)
  .map((m) => m.default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
