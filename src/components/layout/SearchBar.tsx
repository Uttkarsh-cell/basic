'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Mic, X, Loader2, TrendingUp } from 'lucide-react';
import { searchGames } from '@/lib/queries';
import { GameThumb } from '@/components/game/GameThumb';
import { RatingStars } from '@/components/ui/RatingStars';
import type { Game } from '@/lib/types';
import { cn } from '@/lib/utils';

const TRENDING_TERMS = ['Racing', 'Drift', 'io', 'Puzzle', 'Snake', 'Shooting'];

export function SearchBar({ className, autoFocus = false }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Game[]>([]);
  const [total, setTotal] = useState(0);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // detect Web Speech API
  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    setVoiceSupported(Boolean(SR));
  }, []);

  // debounced instant search
  useEffect(() => {
    const id = setTimeout(() => {
      const { games, total } = searchGames(query, 6);
      setResults(games);
      setTotal(total);
    }, 120);
    return () => clearTimeout(id);
  }, [query]);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const startVoice = () => {
    const SR =
      (window as unknown as { SpeechRecognition?: new () => any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript as string;
      setQuery(transcript);
      setOpen(true);
      inputRef.current?.focus();
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="relative flex items-center"
      >
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-text-muted" />
        <input
          ref={inputRef}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search 100s of games..."
          aria-label="Search games"
          className="w-full rounded-xl border border-white/10 bg-surface/70 py-2.5 pl-10 pr-20 text-sm text-white placeholder:text-text-muted/70 outline-none backdrop-blur transition-colors focus:border-primary/60 focus:bg-surface"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="rounded-md p-1.5 text-text-muted transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {voiceSupported && (
            <button
              type="button"
              aria-label="Search by voice"
              onClick={startVoice}
              className={cn(
                'rounded-md p-1.5 transition-colors hover:text-white',
                listening ? 'text-accent animate-pulse-glow' : 'text-text-muted',
              )}
            >
              {listening ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
            </button>
          )}
        </div>
      </form>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-glass backdrop-blur-xl">
          {query.trim() === '' ? (
            <div className="p-4">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                <TrendingUp className="h-3.5 w-3.5" /> Trending searches
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TERMS.map((t) => (
                  <button key={t} type="button" className="chip" onClick={() => submit(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-text-muted">No games found for “{query}”.</p>
          ) : (
            <>
              <ul className="max-h-[60vh] overflow-y-auto py-2">
                {results.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`/games/${g.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-white/5"
                    >
                      <GameThumb game={g} iconSize={20} className="h-11 w-11 shrink-0 rounded-lg" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">{g.title}</span>
                        <span className="block truncate text-xs text-text-muted">{g.tagline}</span>
                      </span>
                      <RatingStars value={g.rating} size={11} />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => submit(query)}
                className="block w-full border-t border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-secondary transition-colors hover:bg-white/10"
              >
                See all {total} results for “{query}”
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
