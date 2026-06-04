# GameVerse — Architecture

This document describes how GameVerse is structured and how to evolve the included frontend into a
full, scalable platform capable of serving 1M+ monthly users.

## 1. High-level design

```
                 ┌─────────────────────────────────────────────┐
   Cloudflare    │                   Vercel Edge                │
   CDN / WAF ───▶│  Next.js 14 (App Router, RSC, ISR, Edge)     │
   (cache, DDoS) │  - SSR/SSG pages, route handlers (/api/*)    │
                 └───────────────┬─────────────────────────────┘
                                 │
              ┌──────────────────┼─────────────────────┐
              ▼                  ▼                     ▼
        MongoDB Atlas      Firebase Auth         Object storage
        (games, users,     (Google / OAuth)      (game builds,
         scores, reviews)                          thumbnails) + CDN
```

- **Rendering strategy**
  - Home, category and game pages: **statically generated** (`generateStaticParams`) and revalidated
    (ISR) for speed + SEO. Game/category params are pre-rendered.
  - Search & profile: dynamic / client-driven.
  - `/api/*` route handlers return JSON with `Cache-Control: s-maxage` for edge caching.
- **State**: server components fetch data; client interactivity (favorites, likes, history, player
  controls, reviews) lives in small client components backed by a persisted Zustand store.

## 2. Data layer

The single source of truth for the UI is `src/lib/queries.ts`. Today it reads the in-memory catalog
in `src/lib/data/*`. Production swaps these for MongoDB queries while keeping the same return types
(`src/lib/types.ts`). Collections (see `server/models`):

`Users · Games · Categories · Scores · Achievements · Comments/Reviews · Favorites ·
Advertisements · Notifications`

Key indexes: text index on `Game.{title,tags,tagline}`; `Score{game:1,value:-1}` for leaderboards;
`Game.{plays,featured,trending}` for ranking queries; unique `Favorite{user,game}`.

## 3. Authentication

The demo ships a client-only mock (`useUserStore`). For production:
1. Add Firebase Auth (Google + anonymous/guest). Store the client config in `NEXT_PUBLIC_FIREBASE_*`.
2. On sign-in, exchange the Firebase ID token for a session cookie via a route handler; verify with
   the Firebase Admin SDK server-side.
3. Upsert the user into MongoDB and gate `/profile`, favorites sync and score submission behind the
   session. Admin routes check `roles: ['admin']`.

## 4. Admin panel (roadmap)

A protected `/admin` area (middleware-guarded by role) providing:
- Game CRUD + bulk import, category management, publish/draft/archive workflow.
- User management (roles, bans), reports/moderation queue.
- Analytics dashboard (plays, DAU/MAU, retention), revenue tracking, advertisement management.

Recommended: Next.js route group `app/(admin)/admin/*` + server actions, charts via a lightweight
chart lib, and `middleware.ts` enforcing auth before the segment renders.

## 5. Performance & Core Web Vitals

- Generated gradient thumbnails (no network images) → zero CLS, no broken assets. When real art is
  added, use `next/image` with explicit sizes + AVIF/WebP.
- `next/font` self-hosts Inter/Sora (no layout shift, no external font requests at runtime).
- Code-split client islands (player, search, carousels); the rest is RSC/static.
- Defer game iframes until "Click to Play" to protect LCP and bandwidth.
- Edge caching via Cloudflare + Vercel; ISR for content freshness.

## 6. Security

- Security headers set in `next.config.mjs` (X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, X-Frame-Options). Add a tuned **CSP** once ad/auth origins are known.
- Game embeds run inside sandboxed iframes.
- Rate limiting on `/api/*` (e.g. Upstash Redis or Vercel firewall), input validation (zod),
  and CSRF protection via same-site session cookies for mutations.

## 7. PWA / offline

`manifest.ts` makes the app installable. To add offline support, register a service worker
(e.g. via `next-pwa` or a custom SW) that caches the app shell + recently played game assets.
