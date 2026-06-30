import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  onAnimationComplete?: () => void
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  onAnimationComplete,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  )
}
