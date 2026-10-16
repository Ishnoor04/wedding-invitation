import { motion } from 'framer-motion'
import { wedding } from '../content'
import Countdown from './Countdown'

export default function Hero() {
  const { weddingDate, images, groom, bride } = wedding

  return (
    <>
      {/* First page after open — same as invitation card 01 */}
      <section className="relative min-h-screen sm:min-h-[844px] bg-[#FDF8F5] overflow-hidden">
        <motion.img
          src={images.card01}
          alt={`${groom.name} & ${bride.name} wedding invitation`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </section>

      <section className="relative px-5 pt-8 pb-10 overflow-hidden bg-[#FDF8F5]">
        <img
          src={images.mandala}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        />

        <motion.div
          className="relative z-10 w-full max-w-xs mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <img
            src={images.floralDivider}
            alt=""
            className="w-full max-w-[200px] mx-auto mb-6 opacity-90"
          />
          <Countdown targetDate={weddingDate} />
        </motion.div>
      </section>
    </>
  )
}
