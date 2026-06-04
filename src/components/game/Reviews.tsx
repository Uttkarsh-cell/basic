'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { RatingStars } from '@/components/ui/RatingStars';
import { useUserStore, useHasHydrated } from '@/store/useUserStore';
import { cn, timeAgo } from '@/lib/utils';
import type { Review } from '@/lib/types';

export function Reviews({ gameSlug, initialReviews }: { gameSlug: string; initialReviews: Review[] }) {
  const hydrated = useHasHydrated();
  const profile = useUserStore((s) => s.profile);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState('');

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !body.trim()) return;
    const review: Review = {
      id: `local-${Date.now()}`,
      gameSlug,
      author: profile?.name ?? 'You',
      avatarGradient: profile?.avatarGradient ?? 'from-primary to-secondary',
      rating,
      body: body.trim(),
      createdAt: new Date().toISOString(),
      helpful: 0,
    };
    setReviews((prev) => [review, ...prev]);
    setRating(0);
    setBody('');
  };

  const markHelpful = (id: string) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)));

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-secondary" />
        <h2 className="font-display text-xl font-bold text-white">Reviews & Comments</h2>
        <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm">
          <RatingStars value={avg} size={14} showValue />
          <span className="text-text-muted">({reviews.length})</span>
        </span>
      </div>

      {/* write a review */}
      <form onSubmit={submit} className="mb-6 rounded-2xl border border-white/10 bg-surface p-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-sm font-medium text-text-muted">Your rating:</span>
          <div className="flex" onMouseLeave={() => setHover(0)}>
            {Array.from({ length: 5 }).map((_, i) => {
              const v = i + 1;
              return (
                <button
                  key={v}
                  type="button"
                  aria-label={`${v} star${v > 1 ? 's' : ''}`}
                  onMouseEnter={() => setHover(v)}
                  onClick={() => setRating(v)}
                  className="p-0.5"
                >
                  <Star
                    className={cn(
                      'h-6 w-6 transition-colors',
                      (hover || rating) >= v ? 'fill-amber-400 text-amber-400' : 'text-white/20',
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder={hydrated && profile ? 'Share what you think about this game...' : 'Sign in or play as guest to leave a review...'}
          className="w-full resize-none rounded-xl border border-white/10 bg-background/60 p-3 text-sm text-white placeholder:text-text-muted/60 outline-none focus:border-primary/60"
        />
        <div className="mt-3 flex justify-end">
          <button type="submit" disabled={!rating || !body.trim()} className="btn-neon px-4 py-2 text-sm">
            <Send className="h-4 w-4" /> Post Review
          </button>
        </div>
      </form>

      {/* list */}
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-2xl border border-white/10 bg-surface p-4">
            <div className="flex items-start gap-3">
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white', r.avatarGradient)}>
                {r.author.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white">{r.author}</span>
                  <RatingStars value={r.rating} size={12} />
                  <span className="text-xs text-text-muted">{timeAgo(r.createdAt)}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{r.body}</p>
                <button
                  type="button"
                  onClick={() => markHelpful(r.id)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-accent"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.helpful})
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
