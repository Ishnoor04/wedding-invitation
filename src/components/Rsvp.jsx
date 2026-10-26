import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { wedding } from '../content'

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? ''

const fieldClass =
  'w-full rounded-2xl border border-[#C17373]/25 bg-white px-3.5 py-3 text-sm text-[#5B4141] outline-none transition-colors placeholder:text-[#C17373]/45 focus:border-[#C17373] focus:ring-2 focus:ring-[#C17373]/15'

function OccasionBlock({ occasion, attending, guests, onToggle, onGuestsChange, guestsHint }) {
  return (
    <div
      className={`rounded-2xl border p-3.5 transition-colors ${
        attending
          ? 'border-[#C17373]/45 bg-[#C17373]/10'
          : 'border-[#C17373]/20 bg-white'
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={attending}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#C17373]"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-[#5B4141]">{occasion.label}</span>
          <span className="mt-0.5 block text-[11px] text-[#C17373]/70">{occasion.detail}</span>
        </span>
      </label>

      {attending ? (
        <label className="mt-3 flex flex-col gap-1.5 pl-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C17373]">
            Number of people *
          </span>
          <input
            type="number"
            required
            min={1}
            max={20}
            inputMode="numeric"
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className={fieldClass}
          />
          <span className="text-[11px] text-[#C17373]/65">{guestsHint}</span>
        </label>
      ) : null}
    </div>
  )
}

export default function Rsvp() {
  const { rsvp, images } = wedding
  const [name, setName] = useState('')
  const [thursday, setThursday] = useState({ attending: false, guests: '1' })
  const [saturday, setSaturday] = useState({ attending: false, guests: '1' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const resetForm = () => {
    setName('')
    setThursday({ attending: false, guests: '1' })
    setSaturday({ attending: false, guests: '1' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!SCRIPT_URL) {
      setStatus('error')
      setError('RSVP is not connected yet. Please try again later.')
      return
    }

    if (!name.trim()) {
      setStatus('error')
      setError('Please enter your name.')
      return
    }

    if (!thursday.attending && !saturday.attending) {
      setStatus('error')
      setError('Please select at least one occasion.')
      return
    }

    const thursdayGuests = thursday.attending ? Number(thursday.guests) : 0
    const saturdayGuests = saturday.attending ? Number(saturday.guests) : 0

    if (
      (thursday.attending && (!Number.isFinite(thursdayGuests) || thursdayGuests < 1)) ||
      (saturday.attending && (!Number.isFinite(saturdayGuests) || saturdayGuests < 1))
    ) {
      setStatus('error')
      setError('Enter how many people for each selected occasion.')
      return
    }

    setStatus('submitting')

    const payload = {
      name: name.trim(),
      thursday_attending: thursday.attending ? 'Yes' : 'No',
      thursday_guests: String(thursdayGuests),
      saturday_attending: saturday.attending ? 'Yes' : 'No',
      saturday_guests: String(saturdayGuests),
    }

    try {
      // text/plain avoids a CORS preflight; Apps Script can still parse JSON body.
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      })

      const text = await response.text()
      let result = null
      try {
        result = JSON.parse(text)
      } catch {
        result = null
      }

      if (result?.result === 'success') {
        setStatus('success')
        resetForm()
        return
      }

      // Login HTML / wrong access setting usually returns non-JSON
      if (!result) {
        setStatus('error')
        setError(
          'Could not reach the RSVP sheet. Re-deploy the Apps Script with access set to Anyone.',
        )
        return
      }

      setStatus('error')
      setError(result.message || 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="rsvp" className="relative px-5 pt-4 pb-12">
      <motion.div
        className="mx-auto max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center rounded-full border border-[#C17373] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C17373]">
            {rsvp.badge}
          </div>
          <h2 className="mb-1 font-display text-[2rem] text-[#C17373]">{rsvp.title}</h2>
          <p className="text-xs text-[#C17373]/75">{rsvp.subtitle}</p>
        </div>

        <div className="rounded-[24px] border border-[#C17373]/30 bg-[#FFFCFA] p-5 card-stack">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-[#C17373]" aria-hidden="true" />
              <p className="font-playfair text-lg italic text-[#C17373]">{rsvp.successTitle}</p>
              <p className="text-xs leading-relaxed text-[#5B4141]/80">{rsvp.successMessage}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#C17373] underline-offset-2 hover:underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C17373]">
                  Name *
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C17373]">
                  Which occasions? *
                </span>
                {/* <p className="mb-1 text-[11px] text-[#C17373]/65">{rsvp.occasionsHint}</p> */}
                <div className="flex flex-col gap-2.5">
                  <OccasionBlock
                    occasion={rsvp.occasions.thursday}
                    attending={thursday.attending}
                    guests={thursday.guests}
                    guestsHint={rsvp.guestsHint}
                    onToggle={(attending) => setThursday((prev) => ({ ...prev, attending }))}
                    onGuestsChange={(guests) => setThursday((prev) => ({ ...prev, guests }))}
                  />
                  <OccasionBlock
                    occasion={rsvp.occasions.saturday}
                    attending={saturday.attending}
                    guests={saturday.guests}
                    guestsHint={rsvp.guestsHint}
                    onToggle={(attending) => setSaturday((prev) => ({ ...prev, attending }))}
                    onGuestsChange={(guests) => setSaturday((prev) => ({ ...prev, guests }))}
                  />
                </div>
              </div>

              {status === 'error' && error ? (
                <p className="text-xs text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#C17373] py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#C17373]/25 transition-colors hover:bg-[#B86868] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  rsvp.submitLabel
                )}
              </button>
            </form>
          )}
        </div>

        <img
          src={images.floralDivider}
          alt=""
          className="mx-auto mt-8 w-full max-w-[200px] opacity-90"
        />
      </motion.div>
    </section>
  )
}
