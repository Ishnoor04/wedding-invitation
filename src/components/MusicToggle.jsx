import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function MusicToggle({ audio }) {
  const [playing, setPlaying] = useState(() => Boolean(audio && !audio.paused))

  useEffect(() => {
    if (!audio) return undefined

    const onEnded = () => setPlaying(false)
    const onPause = () => setPlaying(false)
    const onPlay = () => setPlaying(true)

    setPlaying(!audio.paused)

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)

    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
    }
  }, [audio])

  const toggle = async () => {
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
      return
    }

    audio.pause()
    setPlaying(false)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause shabad' : 'Play shabad'}
      title={playing ? 'Pause shabad' : 'Play shabad'}
      className="fixed z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#C17373] text-white shadow-lg shadow-[#C17373]/40 transition-transform hover:scale-105 active:scale-95 bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] sm:absolute"
    >
      {playing ? (
        <Pause className="w-5 h-5 fill-white" />
      ) : (
        <Play className="w-5 h-5 fill-white ml-0.5" />
      )}
    </button>
  )
}
