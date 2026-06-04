# GameVerse — Deployment & Integration Guide

## 1. Deploy to Vercel (recommended)

1. Push this repo to GitHub.
2. In Vercel, **New Project → import the repo**. Framework preset auto-detects Next.js.
3. Add Environment Variables (from `.env.example`) under Project Settings → Environment Variables.
4. Deploy. Vercel runs `next build` and serves with edge caching + ISR automatically.

Custom domain: add it in Vercel, then point DNS through **Cloudflare** (proxied) for CDN caching,
WAF and DDoS protection.

## 2. Environment variables

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (SEO, sitemap, OG) |
| `NEXT_PUBLIC_SITE_NAME` | Display name |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Auth client config |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-…`) |
| `JWT_SECRET` | Session signing secret (backend) |
| `ADMIN_EMAILS` | Comma-separated admin allowlist |

## 3. Add real games

- Host each HTML5 game build (or use a provider feed). Set the game's `embedUrl` to the hosted URL.
- The bundled `public/games/neon-snake` and `public/games/neon-breakout` are reference builds.
- Optional: listen for the `postMessage({ type: 'gameverse:score', ... })` event the bundled games
  emit, to record scores to the leaderboard.

## 4. Enable Google AdSense

1. Get approved & set `NEXT_PUBLIC_ADSENSE_CLIENT`.
2. Add the loader script in `src/app/layout.tsx`:
   ```tsx
   import Script from 'next/script';
   // inside <body>:
   <Script async strategy="afterInteractive"
     src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
     crossOrigin="anonymous" />
   ```
3. In `components/ads/AdSlot.tsx`, replace the placeholder with:
   ```tsx
   <ins className="adsbygoogle" style={{ display: 'block' }}
     data-ad-client={client} data-ad-slot={slot}
     data-ad-format="auto" data-full-width-responsive="true" />
   ```
   and push `(window.adsbygoogle = window.adsbygoogle || []).push({})` in a `useEffect`.

## 5. Wire up the backend

1. `npm install mongoose` (and `firebase-admin` for auth verification).
2. Move `server/models` into your API service or import them from Next route handlers.
3. Implement the handlers in `src/app/api/*` using `connectDb()` and the models.
4. Replace the mock function bodies in `src/lib/queries.ts` with `fetch('/api/...')` calls (or direct
   DB reads in server components).

## 6. SEO checklist

- `NEXT_PUBLIC_SITE_URL` set → correct canonical, OG and sitemap URLs.
- Add real `public/og-image.png` (1200×630) and PWA icons (`icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png`).
- Submit `https://<domain>/sitemap.xml` in Google Search Console.
- Validate structured data with Google's Rich Results Test.

## 7. Quality gates

```bash
npm run lint        # eslint (next/core-web-vitals)
npm run type-check  # tsc --noEmit
npm run build       # production build
```

Run a Lighthouse audit on the deployed URL and tune images/CSP as needed to hold a 95+ score.
