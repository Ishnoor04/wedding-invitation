import { motion } from 'framer-motion'
import { wedding } from '../content'

export default function ThankYou() {
  const { images, groom, bride } = wedding

  return (
    <section className="relative min-h-screen sm:min-h-[844px] bg-[#FDF8F5] overflow-hidden">
      <motion.img
        src={images.card03}
        alt={`${groom.name} & ${bride.name} — thank you`}
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </section>
  )
}
