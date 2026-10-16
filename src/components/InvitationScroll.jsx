import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react'
import { wedding } from '../content'
import Countdown from './Countdown'

function FloralRule({ images, className = '' }) {
  return (
    <img
      src={images.floralDivider}
      alt=""
      className={`w-full max-w-[200px] mx-auto opacity-90 ${className}`}
    />
  )
}

function EventCard({ event, index }) {
  const isSolid = event.variant === 'solid'
  const shell = isSolid
    ? 'bg-[#C17373] text-white'
    : 'bg-[#FFFCFA] text-[#5B4141] border border-[#C17373]/30 card-stack'
  const badge = isSolid
    ? 'bg-white text-[#C17373]'
    : 'bg-[#C17373] text-white'
  const details = isSolid
    ? 'bg-white text-[#C17373]'
    : 'bg-[#C17373] text-white'
  const icon = isSolid ? 'text-[#C17373]' : 'text-white'
  const maps = isSolid
    ? 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
    : 'bg-[#C17373] text-white hover:bg-[#B86868]'

  return (
    <motion.article
      className={`rounded-[24px] p-5 ${shell}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold mb-3 ${badge}`}
      >
        <MapPin className="w-3 h-3" />
        <span>{event.city}</span>
      </div>

      <h3
        className={`text-[1.75rem] font-display leading-tight mb-4 ${isSolid ? 'text-white' : 'text-[#C17373]'}`}
      >
        {event.title}
      </h3>

      <div className={`rounded-2xl p-3.5 flex flex-col gap-2.5 mb-4 ${details}`}>
        <div className="flex items-center gap-3 text-xs">
          <Calendar className={`w-4 h-4 shrink-0 ${icon}`} />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Clock className={`w-4 h-4 shrink-0 ${icon}`} />
          <span className="font-medium">{event.time}</span>
        </div>
        <div className="flex items-start gap-3 text-xs">
          <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${icon}`} />
          <span className="font-medium leading-relaxed">{event.venue}</span>
        </div>
      </div>

      {event.mapsUrl ? (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 px-4 rounded-full font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors ${maps}`}
        >
          <Navigation className="w-3.5 h-3.5" />
          Open in Google Maps
        </a>
      ) : null}
    </motion.article>
  )
}

export default function InvitationScroll({ showRest = false }) {
  const {
    images,
    groom,
    bride,
    weddingDate,
    blessing,
    events,
    eventsIntro,
  } = wedding

  return (
    <div className="relative bg-[#FFFCFA]">
      <img
        src={images.card01}
        alt={`${groom.name} & ${bride.name}`}
        className="relative z-10 block w-full max-w-none"
        style={{ height: 'auto', aspectRatio: '1200 / 2601' }}
        draggable={false}
      />

      {showRest ? (
        <>
          <div className="pointer-events-none absolute inset-0 top-[20%] bottom-[20%] overflow-hidden">
            <img
              src={images.mandala}
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none opacity-[0.18]"
            />
          </div>

          <section className="relative px-5 py-8">
            <FloralRule images={images} className="mb-5" />
            <div className="max-w-xs mx-auto">
              <Countdown targetDate={weddingDate} />
            </div>
          </section>

          <section className="relative px-6 py-12 text-center">
            <motion.div
              className="max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
            >
              <img src={images.kirpan} alt="" className="w-12 h-auto mx-auto mb-7" />
              <div className="space-y-2 mb-5">
                {blessing.versePunjabi.map((line) => (
                  <p
                    key={line}
                    className="text-[19px] sm:text-[20px] leading-relaxed text-[#C17373] font-medium"
                    lang="pa"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="w-14 h-px bg-[#C17373]/35 mx-auto mb-4" />
              <p className="text-[14px] sm:text-[15px] font-playfair italic text-[#C17373] leading-relaxed px-1 font-medium">
                &ldquo;{blessing.verseEnglish}&rdquo;
              </p>
            </motion.div>
            <FloralRule images={images} className="mt-10" />
          </section>

          <section id="events" className="relative px-5 pt-4 pb-10">
            <motion.div
              className="text-center mb-8 max-w-xs mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#C17373] text-[10px] uppercase tracking-[0.18em] text-[#C17373] font-semibold mb-3">
                {eventsIntro.badge}
              </div>
              <h2 className="text-[2rem] font-display text-[#C17373] mb-1">
                {eventsIntro.title}
              </h2>
              <p className="text-xs text-[#C17373]/75">{eventsIntro.subtitle}</p>
            </motion.div>

            <div className="flex flex-col gap-5 max-w-xs mx-auto">
              {events.map((event, index) => (
                <EventCard key={event.title} event={event} index={index} />
              ))}
            </div>
          </section>

          <img
            src={images.card03}
            alt="Thank you"
            className="relative z-10 block w-full max-w-none"
            style={{ height: 'auto', aspectRatio: '1200 / 2601' }}
          />
          {/* <div className="h-20" aria-hidden="true" /> */}
        </>
      ) : null}
    </div>
  )
}
