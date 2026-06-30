interface HandCircleProps {
  className?: string
}

// Static, hand-wobbled circle outline. Unlike the dynamic Sketch/
// RoughNotation annotations, this never measures anything, so it's safe
// to drop behind any icon or badge regardless of entrance animations.
export default function HandCircle({ className = '' }: HandCircleProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <path
        d="M50 6C74 5 93 23 94 48C95 72 76 93 51 94C28 95 7 77 6 51C5 27 25 7 50 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  )
}
