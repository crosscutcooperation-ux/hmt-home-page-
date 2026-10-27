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

The opening film uses the supplied `1011(2).mp4`, exported at its native 1280×720 resolution and 60 fps with frequent keyframes for scroll seeking. `app/scroll-hero.jsx` maps native page scrolling to the video timeline across a deliberately long scroll distance, then releases the pinned frame into the homepage. Scrolling upward reverses the film. The Greenfield and Brownfield buttons switch the white hero heading and client-supplied tagline. The intro is muted, includes a skip link and poster fallback, and switches to an ordinary video player when reduced motion is enabled. The automatic survey popup waits until the whole hero is off screen, so it never darkens the film's ending.

The footer uses `footer-panorama-clean.webp`, edited to remove the fixed smoke, and a transparent photographic `footer-smoke-billow.webp` texture. `app/footer-smoke.jsx` animates overlapping billows from three registered emission points, with softened water reflections. Rendering pauses outside the footer and in background tabs; reduced motion uses a still rendered plume. Both raster assets were created with the built-in image generation tool from the supplied artwork.
