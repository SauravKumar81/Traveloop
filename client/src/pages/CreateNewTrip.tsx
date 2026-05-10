import { useState } from 'react';
import { Plus, CalendarDays, MapPin, Gift, Send } from 'lucide-react';

export default function CreateNewTrip() {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">New Trip</p>
            <h1 className="text-4xl font-bold tracking-tight">Create a new trip</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Add the core details to start planning your journey in Traveloop.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Plus className="h-4 w-4" />
            New plan
          </button>
        </div>

        <form className="space-y-6 rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-400">Trip title</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekend in Lisbon" className="mt-2 w-full rounded-3xl border border-zinc-800/60 bg-zinc-950/70 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </label>
            <label className="block">
              <span className="text-sm text-zinc-400">Destination</span>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Bali, Indonesia" className="mt-2 w-full rounded-3xl border border-zinc-800/60 bg-zinc-950/70 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-zinc-400">Travel dates</span>
            <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="May 20 - May 27" className="mt-2 w-full rounded-3xl border border-zinc-800/60 bg-zinc-950/70 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          </label>
          <label className="block">
            <span className="text-sm text-zinc-400">Notes</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} placeholder="Add trip highlights and preferences" className="mt-2 w-full rounded-3xl border border-zinc-800/60 bg-zinc-950/70 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Schedule' },
              { icon: MapPin, label: 'Destinations' },
              { icon: Gift, label: 'Perks' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/60 text-zinc-300">
                  <div className="inline-flex items-center gap-2 mb-3 text-sm font-semibold text-white">
                    <Icon className="h-4 w-4 text-blue-300" />
                    {item.label}
                  </div>
                  <p className="text-sm text-zinc-500">Set the essentials for your new itinerary.</p>
                </div>
              );
            })}
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Send className="h-4 w-4" />
            Save trip details
          </button>
        </form>
      </div>
    </div>
  );
}
