import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { getNews } from '@/lib/queries';
import { cn, formatDate } from '@/lib/utils';

const categoryVariant = {
  Update: 'primary',
  Release: 'secondary',
  Esports: 'accent',
  Guide: 'hot',
} as const;

export function NewsSection() {
  const articles = getNews(4);

  return (
    <section className="container-page section-padding py-12">
      <SectionHeader
        eyebrow="What's new"
        title="Gaming News & Updates"
        subtitle="Fresh releases, events and pro tips from the GameVerse team."
        href="/news"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/news/${a.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card"
          >
            <div className={cn('relative flex aspect-[16/9] items-end bg-gradient-to-br p-4', a.gradient)}>
              <div className="absolute inset-0 bg-black/20" />
              <Badge variant={categoryVariant[a.category]} className="relative">{a.category}</Badge>
              <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-sm font-semibold leading-snug text-white group-hover:text-secondary">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-text-muted">{a.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-text-muted">
                <span>{formatDate(a.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {a.readMinutes} min read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
