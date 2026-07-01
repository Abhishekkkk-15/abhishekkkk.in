import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { RoughNotation } from 'react-rough-notation'
import Reveal from './Reveal'
import Squiggle from './Squiggle'

interface SectionHeaderProps {
  index: string
  title: string
  description?: string
  align?: 'left' | 'center'
  total?: string
}

export default function SectionHeader({
  index,
  title,
  description,
  align = 'left',
  total = '06',
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div className={isCenter ? 'flex flex-col items-center text-center' : ''}>
      <Reveal>
        <div ref={ref} className="flex items-center gap-3">
          <RoughNotation
            type="circle"
            show={inView}
            color="#0a0a0a"
            strokeWidth={1.5}
            animationDuration={600}
            padding={6}
          >
            <span className="section-index">{index}</span>
          </RoughNotation>
          <Squiggle width={40} className="text-black/30" />
          <span className="eyebrow">/ {total}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className={isCenter ? 'flex flex-col items-center' : ''}>
          <h2 className="mt-5 font-sans text-4xl font-semibold tracking-tight text-black md:text-5xl">
            {title}
          </h2>
          <Squiggle width={56} className="mt-3 text-black/20" />
        </div>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p
            className={`mt-5 max-w-xl font-light leading-relaxed text-black/55 ${
              isCenter ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
