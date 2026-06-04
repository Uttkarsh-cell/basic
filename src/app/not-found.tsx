import Link from 'next/link';
import { Gamepad2, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page section-padding flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="relative">
        <span className="font-display text-[120px] font-extrabold leading-none text-gradient sm:text-[160px]">404</span>
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-float items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-neon">
          <Gamepad2 className="h-8 w-8 text-white" />
        </span>
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Game Over — page not found</h1>
      <p className="mt-2 max-w-md text-text-muted">
        The level you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back in the game.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-neon"><Home className="h-4 w-4" /> Home</Link>
        <Link href="/games" className="btn-ghost"><Compass className="h-4 w-4" /> Browse Games</Link>
      </div>
    </div>
  );
}
