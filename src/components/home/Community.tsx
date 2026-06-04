import Link from 'next/link';
import { Users, Award, Swords, MessageSquare, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const features = [
  { icon: Users, title: 'User Profiles', desc: 'Customize your avatar, show off your level and track your stats.', gradient: 'from-primary to-secondary' },
  { icon: Award, title: 'Achievements', desc: 'Unlock badges and trophies as you conquer every genre.', gradient: 'from-accent to-emerald-600' },
  { icon: Swords, title: 'Rankings', desc: 'Climb global and per-game leaderboards against real players.', gradient: 'from-orange-500 to-rose-600' },
  { icon: MessageSquare, title: 'Community', desc: 'Rate games, drop reviews and join the conversation.', gradient: 'from-fuchsia-500 to-purple-600' },
];

const stats = [
  { label: 'Active gamers', value: 1_240_000, suffix: '+' },
  { label: 'Achievements earned', value: 8_900_000, suffix: '+' },
  { label: 'Reviews posted', value: 420_000, suffix: '+' },
  { label: 'Countries', value: 190, suffix: '+', compact: false },
];

export function Community() {
  return (
    <section className="container-page section-padding py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-background p-6 sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-[100px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Join the squad</span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              A worldwide community of gamers
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
              Create your profile, earn achievements, climb the rankings and connect with millions
              of players. GameVerse is more than games — it&apos;s where players belong.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-extrabold text-gradient">
                    <AnimatedCounter value={s.value} compact={s.compact ?? true} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/leaderboard" className="btn-neon mt-7">
              Explore the community <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-lg`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
