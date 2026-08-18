import type { EcoGuide } from '../types/guide'

const guideModules = import.meta.glob<{ default: EcoGuide }>('./guides/*.json', { eager: true })

export const allGuides: EcoGuide[] = Object.values(guideModules)
  .map((m) => m.default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
