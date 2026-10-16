# Wedding Invitation

Mobile-first digital marriage card (React + Vite + Tailwind), styled after a royal Punjabi / Anand Karaj invitation.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL, then click **Open Invitation**.

## Customize your card

Edit one file: [`src/content.js`](src/content.js)

- Couple names, parents, family labels
- Wedding date (countdown + labels)
- Blessing / Gurbani text
- Event list (date, time, venue, maps link)
- Thank-you message

Replace images in `public/`:

- `hero-couple.jpg` — cover + couple portrait
- `home-bg.jpg` — blessing section atmosphere

## Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.
