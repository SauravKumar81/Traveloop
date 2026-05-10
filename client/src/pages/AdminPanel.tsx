import { ShieldCheck, Users, Briefcase, Sparkles, DollarSign } from 'lucide-react';

export default function AdminPanel() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Admin</p>
            <h1 className="text-4xl font-bold tracking-tight">Admin control panel</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Manage users, trips, and platform metrics from a single dashboard.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <ShieldCheck className="h-4 w-4" />
            Security overview
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-3 mb-8">
          {[
            { label: 'Active users', value: '1,842', icon: Users },
            { label: 'Trips live', value: '673', icon: Briefcase },
            { label: 'Revenue', value: '$24.8K', icon: DollarSign },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-3 text-zinc-300 mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold">{card.label}</span>
                </div>
                <p className="text-3xl font-semibold">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-zinc-400 text-sm">Recent activity</p>
                <h2 className="text-2xl font-semibold">Platform insights</h2>
              </div>
              <span className="rounded-full bg-zinc-950/70 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400">Live</span>
            </div>
            <div className="space-y-4">
              {[
                'Reviewed 12 new trip reports',
                'Approved 4 partner listings',
                'Resolved 3 user support tickets',
              ].map((note) => (
                <div key={note} className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/60">
                  <p className="text-sm text-zinc-300">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-3 mb-5 text-zinc-300">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">Quick actions</span>
            </div>
            <div className="space-y-4">
              {[
                'Add new featured destination',
                'Send community announcement',
                'Update billing tiers',
              ].map((action) => (
                <button key={action} className="w-full rounded-3xl bg-zinc-950/70 px-4 py-4 text-left text-sm text-zinc-300 border border-zinc-800/60 hover:border-indigo-500/40 hover:text-white transition-all">
                  {action}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
