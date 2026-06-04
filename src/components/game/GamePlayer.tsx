'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Maximize2, Minimize2, RotateCcw, Smartphone } from 'lucide-react';
import { GameThumb } from '@/components/game/GameThumb';
import { useUserStore } from '@/store/useUserStore';
import type { Game } from '@/lib/types';

export function GamePlayer({ game }: { game: Game }) {
  const [started, setStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const recordPlay = useUserStore((s) => s.recordPlay);

  const isPlayable = game.embedUrl !== 'about:blank';

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const handlePlay = () => {
    setStarted(true);
    recordPlay(game.slug);
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* fullscreen not available */
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-neon"
    >
      {!started ? (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 flex flex-col items-center justify-center"
          aria-label={`Play ${game.title}`}
        >
          <GameThumb game={game} iconSize={88} className="absolute inset-0 h-full w-full" />
          <span className="relative z-10 flex flex-col items-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-neon transition-transform duration-300 group-hover:scale-110">
              <Play className="h-9 w-9 fill-white text-white" />
            </span>
            <span className="font-display text-lg font-bold text-white drop-shadow">Click to Play</span>
            <span className="text-xs text-white/70">{game.orientation === 'portrait' ? 'Best in portrait' : 'Loads instantly'}</span>
          </span>
        </button>
      ) : isPlayable ? (
        <iframe
          key={reloadKey}
          src={game.embedUrl}
          title={game.title}
          className="h-full w-full border-0"
          allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope"
          allowFullScreen
          loading="eager"
        />
      ) : (
        <PlaceholderEmbed game={game} />
      )}

      {/* control bar */}
      {started && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="pointer-events-auto flex items-center gap-2 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-accent" /> {game.title}
          </span>
          <div className="pointer-events-auto flex items-center gap-1.5">
            {isPlayable && (
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                aria-label="Restart game"
                className="rounded-lg bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="rounded-lg bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PlaceholderEmbed({ game }: { game: Game }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
      <Smartphone className="h-10 w-10 text-secondary" />
      <h3 className="font-display text-lg font-bold text-white">Game embed ready</h3>
      <p className="max-w-md text-sm text-text-muted">
        This is a catalog entry. Point <code className="rounded bg-white/10 px-1.5 py-0.5 text-secondary">{game.slug}</code>&apos;s{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-secondary">embedUrl</code> at your hosted HTML5 build to make it
        playable. Try <strong className="text-white">Neon Snake</strong> or <strong className="text-white">Neon Breakout</strong> for
        fully playable demos.
      </p>
    </div>
  );
}
