'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  FolderTree,
  Users,
  Megaphone,
  Flag,
  LineChart,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/games', label: 'Games', icon: Gamepad2 },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/ads', label: 'Advertisements', icon: Megaphone },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* mobile topbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <LineChart className="h-4 w-4 text-white" />
          </span>
          <span className="font-display font-bold">Admin</span>
        </Link>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle admin menu" className="rounded-lg border border-white/10 bg-white/5 p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-surface/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full flex-col">
          <Link href="/admin" className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-neon">
              <Gamepad2 className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Game<span className="text-gradient">Verse</span>
            </span>
          </Link>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">Manage</p>
            {NAV.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-gradient-to-r from-primary/30 to-secondary/20 text-white shadow-[inset_0_0_0_1px_rgba(108,92,231,0.4)]'
                      : 'text-text-muted hover:bg-white/5 hover:text-white',
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> View live site
            </Link>
          </div>
        </div>
      </aside>

      {/* backdrop for mobile */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}
    </>
  );
}
