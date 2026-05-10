import { CalendarDays, MapPin, Clock3, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ItineraryView() {
  const itinerary = [
    { time: '08:00', title: 'Breakfast at coastal cafe', location: 'Seminyak Beach' },
    { time: '10:30', title: 'Temple visit', location: 'Uluwatu Temple' },
    { time: '14:00', title: 'Lunch at a local warung', location: 'Canggu' },
    { time: '18:00', title: 'Beach sunset walk', location: 'Jimbaran Bay' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Itinerary</p>
            <h1 className="text-4xl font-bold tracking-tight">Daily itinerary view</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">See your daily agenda, travel details and arrival times in one clean timeline.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <CalendarDays className="h-4 w-4" />
            View other days
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
          <div className="grid gap-6">
            {itinerary.map((item) => (
              <div key={item.time} className="flex flex-col gap-3 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-zinc-500">{item.location}</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">{item.time}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-2">
                    <MapPin className="h-4 w-4" />
                    Location details
                  </span>
                  <button className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
                    See details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950/60 px-4 py-3 text-sm text-zinc-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            All itinerary items are up to date.
          </div>
        </div>
      </div>
    </div>
  );
}
