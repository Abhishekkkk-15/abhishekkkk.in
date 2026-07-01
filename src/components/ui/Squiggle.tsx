import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SquiggleProps {
  className?: string
  width?: number
}

export default function Squiggle({ className = '', width = 64 }: SquiggleProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  return (
    <svg
      ref={ref}
      width={width}
      height={10}
      viewBox="0 0 64 10"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M1 6.5C7 2 13 2 19 5.5C25 9 31 2.5 37 4C43 5.5 49 1.5 55 4.5C58 6 60.5 4.5 62.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </svg>
  )
}
