import { useEffect, type RefObject } from 'react'

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>('.reveal')
    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 },
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
