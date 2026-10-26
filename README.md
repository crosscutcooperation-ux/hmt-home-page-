# Hindustan Machine Tools homepage

A Next.js and React implementation of the HMT homepage. It includes the eight homepage sections, the original wording and controls, and the current HMT images and interactions.

## Run

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build

```sh
npm run build
```

Next.js exports the single homepage to `out/`. The page layout and content live in `content/homepage.html`; React renders that content through `app/page.jsx`. Styling is in `public/hmt-original.css` and `public/styles.css`. The existing homepage interactions and animation code are loaded from `public/app.js` and `public/motion.js` after React hydration. Only the images and files used by this homepage are included under `public/`.

Off-page controls are intentionally inactive in this preview, while on-page navigation, galleries, process controls, and the site survey popup work. Forms validate locally and do not send information to HMT.

The opening film uses the supplied `1011.mp4`, exported at its native 1280×720 resolution with frequent keyframes for scroll seeking. `app/scroll-hero.jsx` maps native page scrolling to the video timeline, then releases the pinned frame into the homepage. Scrolling upward reverses the film. The intro is muted, includes a skip link and poster fallback, and switches to an ordinary video player when reduced motion is enabled. The automatic survey popup waits until the intro finishes.
