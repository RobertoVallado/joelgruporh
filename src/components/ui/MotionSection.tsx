import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MotionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
