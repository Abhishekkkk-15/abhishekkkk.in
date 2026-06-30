import { useEffect, useRef, useState } from 'react'
import { RoughNotation } from 'react-rough-notation'
import type { RoughNotationProps } from 'react-rough-notation'
import { useInView } from 'framer-motion'

interface SketchProps extends Omit<RoughNotationProps, 'show'> {
  delay?: number
  /**
   * Set to false while an ancestor entrance animation (scale/opacity/
   * transform) is still running. rough-notation measures the wrapped
   * element the instant it's allowed to show, so showing it mid-animation
   * permanently strands the drawn shape at that transient position.
   * Defaults to true for content with no animated ancestor.
   */
  enabled?: boolean
}

// Waits for web fonts to finish swapping in before measuring, otherwise
// rough-notation draws its shape against pre-reflow text/image positions.
function useFontsReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      setReady(true)
      return
    }
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return ready
}

export default function Sketch({
  children,
  type = 'underline',
  color = '#0a0a0a',
  strokeWidth = 2,
  animationDuration = 700,
  delay = 0,
  enabled = true,
  ...rest
}: SketchProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const fontsReady = useFontsReady()

  return (
    <span ref={ref}>
      <RoughNotation
        type={type}
        show={isInView && fontsReady && enabled}
        color={color}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
        animationDelay={delay}
        {...rest}
      >
        {children}
      </RoughNotation>
    </span>
  )
}
