import type { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Zap, ShieldCheck, Globe } from 'lucide-react';
import { getPlatformStats } from '@/lib/queries';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export const metadata: Metadata = {
  title: 'About GameVerse',
  description: 'Learn about GameVerse — the modern browser gaming portal bringing instant, free games to players everywhere.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: Zap, title: 'Instant play', desc: 'No downloads, no installs. Click and play in under two seconds on any device.' },
  { icon: Globe, title: 'For everyone', desc: 'Mobile-first, accessible and free. Games for every player, everywhere.' },
  { icon: ShieldCheck, title: 'Safe & secure', desc: 'Family-friendly catalog, rate limiting, and privacy-first design.' },
  { icon: Rocket, title: 'Built to scale', desc: 'Engineered to serve millions of monthly players with sub-second loads.' },
];

export default function AboutPage() {
  const stats = getPlatformStats();
  return (
    <div className="container-page section-padding py-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Our mission</span>
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
          Games for the <span className="text-gradient">whole world</span>, instantly
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-text-muted">
          GameVerse is a modern web gaming platform built to make great games accessible to everyone.
          Hundreds of lightweight titles across every genre, playable instantly in your browser — no
          friction, just fun.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="glass rounded-2xl p-5">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <v.icon className="h-5 w-5" />
            </span>
            <h2 className="font-display text-base font-semibold text-white">{v.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center">
        <Stat value={stats.games} suffix="+" label="Games" compact={false} />
        <Stat value={stats.players} suffix="+" label="Players" />
        <Stat value={stats.totalPlays} suffix="+" label="Games played" />
      </div>

      <div className="mt-12 text-center">
        <Link href="/games" className="btn-neon">Start playing</Link>
      </div>
    </div>
  );
}

function Stat({ value, suffix, label, compact = true }: { value: number; suffix?: string; label: string; compact?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
        <AnimatedCounter value={value} compact={compact} suffix={suffix} />
      </p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}
