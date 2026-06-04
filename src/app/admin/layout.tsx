import type { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

/**
 * Admin shell. The public Navbar/Footer hide themselves on /admin routes.
 *
 * PRODUCTION NOTE: protect this segment with real auth. Add a `middleware.ts`
 * that verifies a session cookie and checks `roles: ['admin']` (see
 * docs/ARCHITECTURE.md) before any /admin route renders.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            Demo admin panel — no authentication is enforced. Add auth + role checks before deploying.
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
