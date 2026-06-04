'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn, LogOut, Heart, History, ChevronDown, UserRound } from 'lucide-react';
import { useUserStore, useHasHydrated } from '@/store/useUserStore';
import { cn } from '@/lib/utils';

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.5 14.6 2.6 12 2.6 6.9 2.6 2.8 6.7 2.8 11.8S6.9 21 12 21c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1-.1-1.5H12z" />
    </svg>
  );
}

export function AuthMenu() {
  const hydrated = useHasHydrated();
  const profile = useUserStore((s) => s.profile);
  const loginGuest = useUserStore((s) => s.loginGuest);
  const loginGoogleMock = useUserStore((s) => s.loginGoogleMock);
  const logout = useUserStore((s) => s.logout);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Avoid hydration mismatch: render a stable placeholder until mounted.
  if (!hydrated) {
    return <div className="h-9 w-24 rounded-xl border border-white/10 bg-white/5" aria-hidden />;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10',
          profile && 'pr-2',
        )}
      >
        {profile ? (
          <>
            <span className={cn('flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold', profile.avatarGradient)}>
              {profile.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="max-w-[100px] truncate">{profile.name}</span>
            <ChevronDown className="h-4 w-4 text-text-muted" />
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" /> Sign in
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-glass backdrop-blur-xl"
          >
            {profile ? (
              <>
                <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <span className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-bold', profile.avatarGradient)}>
                    {profile.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
                    <p className="text-xs capitalize text-text-muted">{profile.provider} account</p>
                  </div>
                </div>
                <div className="my-1 h-px bg-white/10" />
                <MenuLink href="/profile" icon={<UserRound className="h-4 w-4" />} label="My Profile" onClick={() => setOpen(false)} />
                <MenuLink href="/profile?tab=favorites" icon={<Heart className="h-4 w-4" />} label="Favorites" onClick={() => setOpen(false)} />
                <MenuLink href="/profile?tab=history" icon={<History className="h-4 w-4" />} label="Recently Played" onClick={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <div className="space-y-2 p-1">
                <p className="px-2 pt-1 text-xs text-text-muted">Sign in to save progress, favorites & scores.</p>
                <button
                  type="button"
                  onClick={() => {
                    loginGoogleMock();
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-transform hover:scale-[1.02]"
                >
                  <GoogleGlyph /> Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loginGuest();
                    setOpen(false);
                  }}
                  className="btn-ghost w-full"
                >
                  <UserRound className="h-4 w-4" /> Play as Guest
                </button>
                <p className="px-2 text-[11px] leading-relaxed text-text-muted/80">
                  Demo auth (client-only). Wire up Firebase Auth for production — see docs.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
