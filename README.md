<div align="center">

# 🎮 GameVerse

### Play free online games instantly — no downloads, no waiting.

A modern, ultra-fast browser gaming portal inspired by Poki, CrazyGames & Miniclip.
Built with **Next.js 14 · TypeScript · Tailwind CSS · Framer Motion**.

</div>

---

## ✨ Overview

GameVerse is a production-grade frontend for a browser gaming platform: a neon, dark-mode,
glassmorphism UI with a homepage full of dynamic sections, rich game detail pages, instant search,
category browsing, leaderboards, user profiles, and **two fully playable HTML5 games** included out
of the box.

The data layer is cleanly abstracted (`src/lib/queries.ts`) so the mock catalog can be swapped for a
real MongoDB/Express API with zero UI changes. A MongoDB schema blueprint, API route stubs, and a
full backend/auth/admin/monetization roadmap are included.

> **Note on this environment:** This repo was generated in a sandbox where the npm registry is
> blocked, so dependencies could not be installed or the app built/previewed here. The source is
> complete and standard — run `npm install && npm run dev` locally or deploy to Vercel to see it
> live.

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install        # or pnpm install / yarn

# 2. Configure environment (optional for the demo)
cp .env.example .env.local

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

**Requirements:** Node.js ≥ 18.17.

---

## 🎯 Features

### Implemented (this codebase)
- **Homepage** — animated hero with rotating spotlight, Featured, Trending (live popularity bars),
  Categories, New, Top Rated, Most Played, Leaderboard preview, Community, and News sections.
- **Game pages** — click-to-play iframe player with **fullscreen** & restart, like / favorite /
  share / report actions, description, instructions, controls guide, related & recommended games,
  and an interactive **reviews + ratings** section.
- **Two playable games** — `Neon Snake` and `Neon Breakout` (self-contained HTML5/Canvas in
  `public/games/`), with keyboard + touch controls and score reporting via `postMessage`.
- **Browse & search** — `/games` explorer with category filter + sort, instant search with a
  results dropdown and **voice search** (Web Speech API), and a dedicated `/search` page.
- **Categories** — 18 categories with dynamic per-category landing pages.
- **Leaderboard** — podium + ranked table with animated counters.
- **User system (demo)** — Google / Guest sign-in (client-only mock), favorites, likes and
  recently-played history persisted in `localStorage` via Zustand. `/profile` dashboard.
- **SEO** — dynamic metadata, Open Graph & Twitter cards, JSON-LD (Website, Organization, VideoGame,
  Breadcrumb), `sitemap.xml`, `robots.txt`.
- **PWA** — web app manifest, theme color, installable ("Add to Home Screen").
- **Monetization-ready** — reusable `AdSlot` component for AdSense placements (header, in-content,
  sidebar, footer).
- **Responsive & accessible** — mobile-first layouts, skip link, keyboard-friendly controls,
  reduced external dependencies (thumbnails are generated gradients, so no broken images).

### Roadmap (documented, see `docs/`)
- Real auth with **Firebase**, backend **Express/MongoDB** API, live multiplayer, tournaments,
  daily rewards / lucky spin, push notifications and offline service worker.

### Admin panel (`/admin`)
A cohesive, in-app admin area (public navbar/footer auto-hide on `/admin`):
- **Dashboard** — KPI cards (plays, revenue, users, active now) with animated counters, a 14-day
  plays bar chart, revenue-by-month chart, traffic-source donut, open-reports queue and a top-games
  table. Charts are pure SVG/CSS (no chart library).
- **Games** — searchable table with **add / edit / delete** (modal form), featured & trending
  toggles (fully interactive, client-side state).
- **Categories · Users · Advertisements · Reports** — management views with badges, statuses and
  performance metrics.
> The demo enforces no auth — guard `/admin` with a `middleware.ts` role check before deploying.

---

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + custom neon theme |
| Animation | Framer Motion 11 |
| Icons | lucide-react |
| State | Zustand (persisted) |
| Backend (blueprint) | Node.js + Express, MongoDB + Mongoose |
| Auth (roadmap) | Firebase Auth |
| Hosting | Vercel + Cloudflare CDN |

---

## 🎨 Theme

| Token | Value |
|---|---|
| Primary | `#6C5CE7` |
| Secondary | `#00D2FF` |
| Accent | `#00FFB3` |
| Background | `#0D1117` |
| Surface (cards) | `#161B22` |
| Text | `#FFFFFF` |

Defined in `tailwind.config.ts` and surfaced as utilities (`text-gradient`, `btn-neon`, `glass`,
`shadow-neon`, …) in `src/app/globals.css`.

---

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx            # root layout, fonts, SEO metadata, navbar/footer
│   ├── page.tsx              # homepage (all sections)
│   ├── globals.css           # theme tokens + component utilities
│   ├── manifest.ts robots.ts sitemap.ts
│   ├── games/                # /games (explorer) + /games/[slug] (detail) + loading
│   ├── category/[slug]/      # category landing pages
│   ├── admin/                # admin panel: dashboard, games, categories, users, ads, reports
│   ├── search/ leaderboard/ profile/ about/ contact/ privacy/ terms/ news/
│   └── api/                  # route stubs: /api/games, /api/games/[slug], /api/search
├── components/
│   ├── home/                 # Hero, GameSection, TrendingGames, Categories, Community, News…
│   ├── game/                 # GameCard, GamePlayer, GameActions, Reviews, GamesExplorer…
│   ├── admin/                # AdminSidebar, StatCard, Charts, GamesManager
│   ├── layout/               # Navbar, SearchBar, AuthMenu, Footer
│   ├── ui/                   # Icon, SectionHeader, RatingStars, Badge, Skeleton, AnimatedCounter
│   ├── ads/                  # AdSlot (AdSense-ready)
│   └── seo/                  # JsonLd structured data
├── lib/
│   ├── types.ts site.ts utils.ts queries.ts
│   └── data/                 # games, categories, players, news, reviews (mock catalog)
└── store/useUserStore.ts     # zustand: profile, favorites, likes, history

public/games/                 # playable HTML5 games (neon-snake, neon-breakout)
server/models/                # MongoDB/Mongoose schema blueprint (excluded from app build)
docs/                         # ARCHITECTURE.md, DEPLOYMENT.md
```

---

## 🔌 Swapping mock data for a real backend

All UI reads through `src/lib/queries.ts`. To go live:
1. Stand up the Express/MongoDB API (or use the Next route handlers in `src/app/api`).
2. Seed the DB using `server/models` and the data in `src/lib/data`.
3. Replace the function bodies in `queries.ts` with `fetch`/DB calls — the return shapes already
   match `src/lib/types.ts`.

---

## 💰 Monetization (Google AdSense)

`<AdSlot />` placeholders are already positioned (home top/mid, game sidebar/mid). To enable:
1. Set `NEXT_PUBLIC_ADSENSE_CLIENT` in `.env.local`.
2. Load the AdSense script in `layout.tsx`.
3. Replace the placeholder markup in `components/ads/AdSlot.tsx` with an `<ins class="adsbygoogle">`
   unit and push to `window.adsbygoogle`.

See `docs/DEPLOYMENT.md` for the full monetization, auth, and admin setup guides.

---

## 📜 License

Provided as a starter/demo. Replace sample legal pages and add your own license before launch.
