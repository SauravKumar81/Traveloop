import { User, Settings, ShieldCheck, CreditCard, MapPin, Bell, LogOut } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Profile</p>
            <h1 className="text-4xl font-bold tracking-tight">Your traveller profile</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Update your account, preferences, and trip settings in one place.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <ShieldCheck className="h-4 w-4" />
            Account security
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-white text-4xl">
                <User className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Avery Quinn</h2>
                <p className="text-zinc-400">Premium Traveller</p>
              </div>
            </div>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-zinc-950/70 p-5 border border-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Email</p>
                <p className="mt-2 font-semibold">avery@example.com</p>
              </div>
              <div className="rounded-3xl bg-zinc-950/70 p-5 border border-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Home base</p>
                <p className="mt-2 font-semibold">San Francisco, CA</p>
              </div>
              <div className="rounded-3xl bg-zinc-950/70 p-5 border border-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Preferred travel style</p>
                <p className="mt-2 font-semibold">Cultural escapes & luxury retreats</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="grid gap-4">
              {[
                { icon: Settings, label: 'Settings' },
                { icon: MapPin, label: 'Saved destinations' },
                { icon: CreditCard, label: 'Payment methods' },
                { icon: Bell, label: 'Notifications' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-zinc-500">Manage your preferences and security settings.</p>
                    </div>
                  </div>
                );
              })}
              <button className="mt-4 inline-flex items-center gap-2 rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white border border-white/10 hover:bg-white/15 transition-all">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
