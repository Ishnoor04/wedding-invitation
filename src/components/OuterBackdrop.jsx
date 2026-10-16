import { wedding } from '../content'

/**
 * Soft outer stage around the phone invitation —
 * light cream + dots + florals (no kirpan / Elements-03).
 */
export default function OuterBackdrop() {
  const { images, weddingDateShort } = wedding

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block"
      aria-hidden
    >
      <div className="absolute inset-0 outer-dot-pattern opacity-70" />

      {/* Soft rose glow orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#C17373]/10 blur-3xl" />
      <div className="absolute bottom-[-120px] left-[8%] w-[380px] h-[380px] rounded-full bg-[#D4A3A3]/18 blur-3xl" />
      <div className="absolute top-[20%] right-[6%] w-[280px] h-[280px] rounded-full bg-[#C9A66B]/12 blur-3xl" />

      {/* Dashed decorative rings */}
      <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full border border-dashed border-[#C17373]/25" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full border border-dashed border-[#C17373]/20" />

      {/* Florals only — Elements-05 / 12 / 13 */}
      <img
        src={images.floralTop}
        alt=""
        className="absolute -top-6 -left-10 w-[280px] opacity-55 rotate-[-8deg]"
      />
      {/* <img
        src={images.floralThankYou}
        alt=""
        className="absolute -bottom-6 -right-6 w-[300px] opacity-45"
      /> */}
      <img
        src={images.floralDivider}
        alt=""
        className="absolute top-[40%] -left-14 w-[220px] opacity-40"
      />
      <img
        src={images.floralTop}
        alt=""
        className="absolute bottom-[28%] -right-16 w-[200px] opacity-30 rotate-12"
      />

      {/* Soft mandala watermarks */}
      <img
        src={images.mandala}
        alt=""
        className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[220px] opacity-[0.12]"
      />
      <img
        src={images.mandala}
        alt=""
        className="absolute top-1/2 right-[4%] -translate-y-1/2 w-[200px] opacity-[0.1]"
      />

      {/* Corner labels */}
      <p className="absolute top-8 left-10 text-[#C17373]/70 text-lg font-display tracking-wide">
        ੴ
      </p>
      <p className="absolute top-9 right-10 text-[11px] tracking-[0.2em] text-[#C17373]/55 font-semibold uppercase">
        {weddingDateShort}
      </p>
    </div>
  )
}
