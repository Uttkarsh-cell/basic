import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { news } from '@/lib/data/news';
import { cn, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Gaming News & Updates',
  description: 'The latest GameVerse releases, events, esports coverage and game guides.',
  alternates: { canonical: '/news' },
};

const variant = { Update: 'primary', Release: 'secondary', Esports: 'accent', Guide: 'hot' } as const;

export default function NewsListPage() {
  return (
    <div className="container-page section-padding py-12">
      <header className="mb-8">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">The blog</span>
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Gaming News & Updates</h1>
        <p className="mt-2 text-text-muted">Releases, events and pro tips from the GameVerse team.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((a) => (
          <Link
            key={a.id}
            href={`/news/${a.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card"
          >
            <div className={cn('relative flex aspect-[16/9] items-end bg-gradient-to-br p-4', a.gradient)}>
              <div className="absolute inset-0 bg-black/20" />
              <Badge variant={variant[a.category]} className="relative">{a.category}</Badge>
              <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-display text-base font-semibold leading-snug text-white group-hover:text-secondary">{a.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{a.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-text-muted">
                <span>{formatDate(a.publishedAt)}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readMinutes} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
