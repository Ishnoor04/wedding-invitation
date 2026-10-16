import { useEffect, useState } from 'react'

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function Countdown({ targetDate }) {
  const targetMs = new Date(targetDate).getTime()
  const [time, setTime] = useState(() => getRemaining(targetMs))

  useEffect(() => {
    const tick = () => setTime(getRemaining(targetMs))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins', value: time.minutes },
    { label: 'Secs', value: time.seconds },
  ]

  return (
    <div className="w-full rounded-[22px] bg-[#C17373] px-3 pt-4 pb-3 shadow-lg">
      <p className="text-center text-[10px] uppercase tracking-[0.22em] text-white font-playfair font-semibold mb-3">
        Countdown to our union
      </p>
      <div className="grid grid-cols-4 gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="bg-white rounded-xl py-3 px-1 text-center shadow-sm"
          >
            <div className="text-xl font-playfair font-bold text-[#C17373] tabular-nums leading-none">
              {pad(unit.value)}
            </div>
            <div className="text-[9px] uppercase tracking-widest text-[#C17373]/80 font-semibold mt-1.5">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
