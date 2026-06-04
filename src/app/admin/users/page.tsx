import { adminUsers } from '@/lib/data/analytics';
import { cn, formatDate } from '@/lib/utils';

const roleStyle: Record<string, string> = {
  admin: 'bg-primary/20 text-primary-200',
  moderator: 'bg-secondary/15 text-secondary-400',
  user: 'bg-white/5 text-text-muted',
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Users</h1>
        <p className="text-sm text-text-muted">{adminUsers.length} sample accounts. Wire to your auth/database for live management.</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Joined</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {adminUsers.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={cn('flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white', u.gradient)}>
                        {u.name.slice(0, 1)}
                      </span>
                      <div>
                        <p className="font-medium text-white">{u.name}</p>
                        <p className="text-xs text-text-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', roleStyle[u.role])}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', u.status === 'active' ? 'text-accent' : 'text-rose-300')}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', u.status === 'active' ? 'bg-accent' : 'bg-rose-400')} />
                      {u.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-text-muted md:table-cell">{formatDate(u.joinedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-white">
                      {u.status === 'active' ? 'Ban' : 'Unban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
