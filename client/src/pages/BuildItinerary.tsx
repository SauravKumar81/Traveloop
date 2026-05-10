import { MapPin, CalendarDays, Clock3, ArrowRight, Plus } from 'lucide-react';

export default function BuildItinerary() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Itinerary Builder</p>
            <h1 className="text-4xl font-bold tracking-tight">Plan your next adventure</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">
              Build a complete day-by-day itinerary with activity suggestions, timings, and travel notes.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Plus className="h-4 w-4" />
            Create New Trip Plan
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4 rounded-3xl border border-zinc-800/60 bg-zinc-900/70 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 text-zinc-300">
              <MapPin className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-medium">Trip overview</span>
            </div>
            <div className="space-y-4 pt-4 border-t border-zinc-800/60">
              <div>
                <p className="text-zinc-400 text-sm">Destination</p>
                <p className="mt-1 font-semibold">Bali, Indonesia</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Dates</p>
                <p className="mt-1 font-semibold">May 20 - May 27</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Travel style</p>
                <p className="mt-1 font-semibold">Culture, Food, Relaxation</p>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800/70 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Travel prep checklist</h2>
                  <p className="mt-2 text-zinc-400">Add flights, hotels, tours, and local activities to your itinerary.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white border border-white/10 hover:bg-white/15 transition-colors">
                  <CalendarDays className="h-4 w-4" />
                  Add Day Breakdowns
                </button>
              </div>
            </div>

            <div className="grid gap-5">
              {[1, 2, 3].map((day) => (
                <article key={day} className="rounded-3xl border border-zinc-800/60 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-lg shadow-zinc-950/20">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-zinc-400">Day {day}</p>
                      <h3 className="text-xl font-semibold">City exploration</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                      <Clock3 className="h-3.5 w-3.5" />
                      4 stops
                    </span>
                  </div>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="rounded-2xl bg-zinc-950/70 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Morning beach yoga</p>
                        <p className="text-sm text-zinc-500">Sunrise session at Canggu beach.</p>
                      </div>
                      <span className="text-xs text-zinc-400">08:00</span>
                    </li>
                    <li className="rounded-2xl bg-zinc-950/70 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Local market walk</p>
                        <p className="text-sm text-zinc-500">Street food and souvenir shopping.</p>
                      </div>
                      <span className="text-xs text-zinc-400">11:30</span>
                    </li>
                    <li className="rounded-2xl bg-zinc-950/70 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Temple visit</p>
                        <p className="text-sm text-zinc-500">Sunset at Tanah Lot.</p>
                      </div>
                      <span className="text-xs text-zinc-400">17:00</span>
                    </li>
                  </ul>
                </article>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
              <ArrowRight className="h-4 w-4" />
              Export itinerary
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
