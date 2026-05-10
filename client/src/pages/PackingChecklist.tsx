import { ClipboardList, Backpack, ShoppingBag, CheckCircle2, PlusCircle } from 'lucide-react';

export default function PackingChecklist() {
  const items = [
    { label: 'Passport + travel documents', done: true },
    { label: 'Light jacket for evenings', done: false },
    { label: 'Swimwear and beach towel', done: true },
    { label: 'Camera and batteries', done: false },
    { label: 'Medication kit', done: true },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Packing</p>
            <h1 className="text-4xl font-bold tracking-tight">Packing checklist</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Stay organized before departure with grouped checklists and smart packing reminders.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white border border-white/10 hover:bg-white/15 transition-all">
            <PlusCircle className="h-4 w-4" />
            Add item
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 text-zinc-300">
                <ClipboardList className="h-5 w-5 text-indigo-400" />
                <span className="font-semibold">Essentials</span>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">5 items</span>
            </div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${item.done ? 'bg-emerald-500/10 text-emerald-300' : 'bg-zinc-800/70 text-zinc-400'}`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className={item.done ? 'text-white' : 'text-zinc-400'}>{item.label}</span>
                  </div>
                  <span className={`text-xs font-semibold ${item.done ? 'text-emerald-300' : 'text-zinc-500'}`}>{item.done ? 'Packed' : 'Pending'}</span>
                </li>
              ))}
            </ul>
          </section>

          <article className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-3 mb-5 text-zinc-300">
              <Backpack className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">Recommended gear</span>
            </div>
            <div className="space-y-4 text-zinc-300">
              <div className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/70">
                <p className="text-sm">Waterproof pouch</p>
                <p className="text-xs text-zinc-500">Protect your documents and electronics on beach days.</p>
              </div>
              <div className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/70">
                <p className="text-sm">Portable charger</p>
                <p className="text-xs text-zinc-500">Keep devices topped up while exploring.</p>
              </div>
              <div className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/70">
                <p className="text-sm">Travel adapter</p>
                <p className="text-xs text-zinc-500">One adapter for all major outlets in Southeast Asia.</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white hover:scale-[1.02] transition-transform">
              Mark all packed
            </button>
          </article>
        </div>
      </div>
    </div>
  );
}
