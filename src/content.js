/**
 * Rajwant Singh & Pawanpreet Kaur — wedding invitation content
 * Assets live in /public/assets (optimized from /public/Rajwant)
 */

export const wedding = {
  siteTitle: 'Rajwant Singh & Pawanpreet Kaur • Wedding Invitation',

  groom: {
    name: 'Rajwant Singh',
  },

  bride: {
    name: 'Pawanpreet Kaur',
  },

  weddingDate: '2026-11-01T05:00:00+11:00',
  weddingDateLabel: '1 November 2026',
  weddingDateShort: '1.NOV.26',
  tagline: 'are getting married',

  images: {
    card01: '/assets/card-01.webp',
    card02: '/assets/card-02.webp',
    card03: '/assets/card-03.webp',
    couple: '/assets/couple.webp',
    kirpan: '/assets/kirpan.webp',
    mandala: '/assets/mandala.webp',
    floralTop: '/assets/floral-top.webp',
    floralDivider: '/assets/floral-divider.webp',
    floralThankYou: '/assets/floral-thankyou.webp',
    floralCorner: '/assets/floral-corner.webp',
  },

  audio: {
    shabad: '/assets/shabad.mp3',
  },

  cover: {
    eyebrow: 'The Wedding Invitation',
    cta: 'Open Invitation',
  },

  blessing: {
    versePunjabi: [
      'ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮੇਹਰ ਕਰਾਈ ॥',
      'ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸਦੀ ਵਡਿਆਈ ॥',
    ],
    verseEnglish:
      'The True Guru, the Giver, has arranged this affair; by His Grace it has come to pass. He Himself completes the tasks of His servants — this is His greatness.',
  },

  eventsIntro: {
    badge: 'Sacred Celebrations',
    title: 'Event Details',
    subtitle: 'We eagerly await your gracious presence',
  },

  events: [
    {
      city: 'Adelaide',
      title: 'Watna',
      date: 'Thursday, 29th October 2026',
      time: '6:00 PM Onwards',
      venue: '37 Reservoir Road, Hope Valley 5090',
      variant: 'light',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=37+Reservoir+Road+Hope+Valley+5090',
    },
    {
      city: 'Melbourne',
      title: 'Watna & Jago',
      date: 'Saturday, 31st October 2026',
      time: '4:00 PM Onwards',
      venue: '2 Cygnet Street, Tooradin Vic 3980',
      variant: 'solid',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=2+Cygnet+Street+Tooradin+VIC+3980',
    },
    {
      city: 'Melbourne',
      title: 'Anand Karaj',
      date: 'Sunday, 1st November 2026',
      time: '5:00 AM Onwards',
      venue: 'Jagjeet Mandir, Manks Rd, Koo Wee Rup VIC 3981',
      variant: 'light',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Jagjeet+Mandir+Manks+Rd+Koo+Wee+Rup+VIC+3981',
    },
  ],

  rsvp: {
    badge: 'Kindly Reply',
    title: 'RSVP',
    subtitle: 'Help us plan for Thursday & Saturday celebrations',
    occasionsHint: 'Select one or both — guest counts can differ',
    guestsHint: 'Including yourself',
    submitLabel: 'Confirm RSVP',
    successTitle: 'Thank you',
    successMessage: 'Your response has been received. We look forward to celebrating with you.',
    occasions: {
      thursday: {
        label: 'Thursday Watna',
        detail: 'Adelaide · 29 Oct · 6:00 PM',
      },
      saturday: {
        label: 'Saturday Watna & Jago',
        detail: 'Melbourne · 31 Oct · 4:00 PM',
      },
    },
  },

  thankYou: {
    title: 'Thank You',
    message:
      'We look forward to celebrating this sacred milestone with you. Your presence and blessings mean the world to us.',
  },
}
