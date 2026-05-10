import { useState } from 'react';
import { Search, MapPin, Sparkles, Compass } from 'lucide-react';

export default function ActivitySearch() {
  const [query, setQuery] = useState('');
  const results = [
    { title: 'Sunrise yoga class', location: 'Ubud', category: 'Wellness' },
    { title: 'Historic city walking tour', location: 'Rome', category: 'Culture' },
    { title: 'Street food tasting', location: 'Bangkok', category: 'Food' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Search</p>
            <h1 className="text-4xl font-bold tracking-tight">Activity & city search</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Find experiences, places, and local highlights for your itinerary.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Sparkles className="h-4 w-4" />
            Explore suggestions
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex-1 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 px-4 py-3 flex items-center gap-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for activities, cities, or experiences"
                className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
              />
            </div>
            <button className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
              Search
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((item) => (
              <div key={item.title} className="rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-zinc-500">{item.location}</p>
                  </div>
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">{item.category}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  Nearby highlights and top-rated experiences.
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-5 flex items-center gap-4 text-zinc-300">
            <Compass className="h-5 w-5 text-blue-300" />
            <p>Search feature lets you browse suggested experiences by city, category, and traveller mood.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
