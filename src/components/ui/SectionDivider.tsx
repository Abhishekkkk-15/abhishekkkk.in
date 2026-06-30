import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-px origin-left bg-gradient-to-r from-black/25 via-black/10 to-transparent"
      />
    </div>
  )
}
