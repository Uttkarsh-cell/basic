import { Flag, Clock, CheckCircle2 } from 'lucide-react';
import { adminReports } from '@/lib/data/analytics';
import { cn, formatDate } from '@/lib/utils';

const typeStyle: Record<string, string> = {
  Game: 'bg-secondary/15 text-secondary-400',
  Review: 'bg-primary/20 text-primary-200',
  User: 'bg-rose-500/15 text-rose-300',
};

export default function AdminReportsPage() {
  const open = adminReports.filter((r) => r.status === 'open');
  const resolved = adminReports.filter((r) => r.status === 'resolved');

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Reports</h1>
        <p className="text-sm text-text-muted">{open.length} open · {resolved.length} resolved. Moderation queue.</p>
      </header>

      <div className="space-y-3">
        {adminReports.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-surface p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase', typeStyle[r.type])}>{r.type}</span>
              <div>
                <p className="font-semibold text-white">{r.target}</p>
                <p className="text-xs text-text-muted">{r.reason} · reported by {r.reporter}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock className="h-3.5 w-3.5" /> {formatDate(r.createdAt)}
              </span>
              {r.status === 'open' ? (
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/25">Resolve</button>
                  <button type="button" className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-white">Dismiss</button>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-accent">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {adminReports.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/15 bg-surface/50 p-12 text-center">
          <Flag className="h-8 w-8 text-text-muted" />
          <p className="text-sm text-text-muted">No reports in the queue.</p>
        </div>
      )}
    </div>
  );
}
