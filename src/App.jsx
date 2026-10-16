import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import InvitationScroll from './components/InvitationScroll'
import MusicToggle from './components/MusicToggle'
import OuterBackdrop from './components/OuterBackdrop'
import { wedding } from './content'
import { celebrateOpen } from './lib/celebrate'

/** Closed mini-card width — centered inside the phone frame */
const CLOSED_WIDTH = 320

export default function App() {
  const [opened, setOpened] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    document.title = wedding.siteTitle
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || opened) return undefined
    el.scrollTop = 0
    return undefined
  }, [opened])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleOpen = () => {
    celebrateOpen()

    if (!audioRef.current) {
      const audio = new Audio(wedding.audio.shabad)
      audio.loop = true
      audio.preload = 'auto'
      audioRef.current = audio
    }

    audioRef.current.play().catch(() => {})
    setAudioReady(true)
    setOpened(true)
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#FFFCFA] sm:flex sm:h-auto sm:min-h-screen sm:items-center sm:justify-center sm:px-4 sm:py-8">
      <OuterBackdrop />

      <div className="mobile-invitation-container relative z-10 flex h-dvh w-full flex-col overflow-hidden bg-[#FFFCFA] sm:h-[min(844px,94dvh)] sm:max-h-[94dvh] sm:rounded-[36px] sm:shadow-[0_25px_80px_rgba(91,65,65,0.18)] sm:ring-8 sm:ring-[#C17373]/15">
        {/* Soft stage behind mini card */}
        {!opened ? (
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={wedding.images.mandala}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-[0.14]"
            />
            <div className="absolute inset-5 border border-[#C17373]/18 rounded-[28px] flex justify-between p-4 text-[#C17373]/60 text-[10px] tracking-widest uppercase">
              {/* <span className="text-sm font-display normal-case tracking-normal">ੴ</span>
              <span className="font-semibold">{wedding.weddingDateShort}</span> */}
            </div>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          className={
            opened
              ? 'invitation-scroll relative z-10 min-h-0 flex-1 no-scrollbar'
              : 'relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-5 py-6'
          }
        >
          {/* Same card DOM — width animates mini → full (no remount / no flicker) */}
          <motion.div
            initial={false}
            animate={{
              width: opened ? '100%' : CLOSED_WIDTH,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className={
              opened
                ? 'w-full bg-[#FFFCFA]'
                : 'closed-invite-card shrink min-h-0 overflow-hidden rounded-[28px] bg-[#FFFCFA] shadow-[0_20px_50px_rgba(193,115,115,0.28)] ring-1 ring-[#C17373]/20'
            }
            style={{ width: opened ? '100%' : CLOSED_WIDTH }}
          >
            <InvitationScroll showRest={opened} />
          </motion.div>

          {!opened ? (
            <motion.button
              type="button"
              onClick={handleOpen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="group relative shrink-0 py-3.5 rounded-full bg-[#C17373] text-white font-semibold text-xs uppercase tracking-[0.22em] shadow-lg shadow-[#C17373]/35 overflow-hidden"
              style={{ width: CLOSED_WIDTH }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">{wedding.cover.cta}</span>
            </motion.button>
          ) : null}
        </div>

        {opened && audioReady ? <MusicToggle audio={audioRef.current} /> : null}
      </div>
    </main>
  )
}
