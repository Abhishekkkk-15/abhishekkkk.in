interface SquiggleProps {
  className?: string
  width?: number
}

export default function Squiggle({ className = '', width = 64 }: SquiggleProps) {
  return (
    <svg
      width={width}
      height={10}
      viewBox="0 0 64 10"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 6.5C7 2 13 2 19 5.5C25 9 31 2.5 37 4C43 5.5 49 1.5 55 4.5C58 6 60.5 4.5 62.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
