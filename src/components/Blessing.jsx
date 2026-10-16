import { motion } from 'framer-motion'
import { wedding } from '../content'

export default function Blessing() {
  const { blessing, images } = wedding

  return (
    <section className="relative py-14 px-5 overflow-hidden bg-[#FDF8F5]">
      <img
        src={images.mandala}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
      />

      <motion.div
        className="relative z-10 w-full max-w-xs mx-auto"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
      >
        <div className="bg-[#FDF8F5]/90 border border-[#C17373]/25 rounded-[28px] px-5 py-8 text-center shadow-sm">
          <img
            src={images.kirpan}
            alt=""
            className="w-8 h-auto mx-auto mb-6"
          />

          <div className="space-y-1 mb-5">
            {blessing.versePunjabi.map((line) => (
              <p
                key={line}
                className="text-[15px] leading-relaxed text-[#C17373] font-medium"
                lang="pa"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="w-12 h-px bg-[#C17373]/35 mx-auto mb-4" />

          <p className="text-[11px] font-playfair italic text-[#C17373]/85 leading-relaxed">
            &ldquo;{blessing.verseEnglish}&rdquo;
          </p>
        </div>
      </motion.div>
    </section>
  )
}
