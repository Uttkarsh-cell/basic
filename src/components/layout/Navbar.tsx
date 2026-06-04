'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/layout/SearchBar';
import { AuthMenu } from '@/components/layout/AuthMenu';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  // The admin area has its own chrome — hide the public navbar there.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass-strong border-b border-white/10' : 'bg-transparent',
      )}
    >
      <div className="container-page section-padding">
        <div className="flex h-16 items-center gap-4">
          {/* logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-neon">
              <Gamepad2 className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              Game<span className="text-gradient">Verse</span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-text-muted hover:text-white',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* search (desktop) */}
          <div className="ml-auto hidden max-w-sm flex-1 md:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="hidden sm:block">
              <AuthMenu />
            </div>
            {/* mobile toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* mobile search always visible under bar on small screens */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page section-padding space-y-1 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/category/casual" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-white">
                Categories
              </Link>
              <div className="pt-2 sm:hidden">
                <AuthMenu />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
