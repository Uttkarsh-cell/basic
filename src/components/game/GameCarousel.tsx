'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GameCard } from '@/components/game/GameCard';
import type { Game } from '@/lib/types';

export function GameCarousel({ games }: { games: Game[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: 'smooth' });
  };

  return (
    <div className="group/carousel relative">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-surface/90 p-2 text-white opacity-0 shadow-glass backdrop-blur transition-opacity hover:bg-surface md:block md:group-hover/carousel:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={scroller}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
      >
        {games.map((game, i) => (
          <div
            key={game.id}
            className="w-[44vw] shrink-0 snap-start sm:w-[30vw] md:w-[220px] lg:w-[230px]"
          >
            <GameCard game={game} index={i} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-surface/90 p-2 text-white opacity-0 shadow-glass backdrop-blur transition-opacity hover:bg-surface md:block md:group-hover/carousel:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
