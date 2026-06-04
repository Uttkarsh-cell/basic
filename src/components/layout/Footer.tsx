'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Twitter, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { getCategories } from '@/lib/queries';

const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'All Games', href: '/games' },
      { label: 'New Games', href: '/games?sort=new' },
      { label: 'Trending', href: '/games?sort=trending' },
      { label: 'Top Rated', href: '/games?sort=top' },
      { label: 'Leaderboard', href: '/leaderboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog & News', href: '/news' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Submit a Game', href: '/contact' },
    ],
  },
];

const socials = [
  { label: 'Twitter', href: siteConfig.social.twitter, icon: Twitter },
  { label: 'Discord', href: siteConfig.social.discord, icon: MessageCircle },
  { label: 'YouTube', href: siteConfig.social.youtube, icon: Youtube },
  { label: 'Instagram', href: siteConfig.social.instagram, icon: Instagram },
];

export function Footer() {
  const pathname = usePathname();
  const categories = getCategories().slice(0, 12);

  // The admin area has its own chrome — hide the public footer there.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="mt-20 border-t border-white/10 bg-surface/40">
      <div className="container-page section-padding py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-neon">
                <Gamepad2 className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                Game<span className="text-gradient">Verse</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              The ultimate destination for free online games. Play instantly on any device — no
              downloads, no waiting. Just pure fun.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-primary/50 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-muted transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* categories cloud */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="mb-3 text-sm font-semibold text-white">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="chip">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} GameVerse. All rights reserved.</p>
          <p>
            Made for gamers, by gamers. Built with{' '}
            <span className="text-gradient font-semibold">Next.js</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
