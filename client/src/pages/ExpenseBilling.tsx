import { Wallet, Receipt, TrendingUp, CreditCard, Plus, ArrowRight } from 'lucide-react';

export default function ExpenseBilling() {
  const expenses = [
    { title: 'Hotel stay', amount: 420, category: 'Accommodation', date: 'May 21' },
    { title: 'Dinner at rooftop bar', amount: 98, category: 'Food', date: 'May 22' },
    { title: 'Taxi to airport', amount: 34, category: 'Transport', date: 'May 23' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Expenses</p>
            <h1 className="text-4xl font-bold tracking-tight">Expense & billing</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Track your trip spending and stay within budget with ease.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Plus className="h-4 w-4" />
            Add expense
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="space-y-6 rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Budget', value: '$1,200', icon: Wallet },
                { label: 'Spent', value: '$552', icon: Receipt },
                { label: 'Remaining', value: '$648', icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl bg-zinc-950/70 p-5 border border-zinc-800/60">
                    <div className="flex items-center gap-3 mb-3 text-zinc-400">
                      <Icon className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs uppercase tracking-[0.2em]">{item.label}</span>
                    </div>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-zinc-400">Billing Summary</p>
                  <h2 className="text-xl font-semibold">May travel costs</h2>
                </div>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-white">
                  View report
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div key={expense.title} className="flex items-center justify-between gap-4 rounded-3xl bg-zinc-900/80 p-4 border border-zinc-800/60">
                    <div>
                      <p className="font-semibold">{expense.title}</p>
                      <p className="text-sm text-zinc-500">{expense.category} • {expense.date}</p>
                    </div>
                    <p className="font-semibold text-white">${expense.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6 rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-3 text-zinc-300">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">Payment methods</span>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Visa ending 1234', subtitle: 'Expires 11/26' },
                { title: 'Mastercard ending 9876', subtitle: 'Expires 02/27' },
              ].map((card) => (
                <div key={card.title} className="rounded-3xl bg-zinc-950/70 p-4 border border-zinc-800/60">
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-sm text-zinc-500">{card.subtitle}</p>
                </div>
              ))}
            </div>
            <button className="w-full rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white hover:scale-[1.02] transition-transform">
              Add payment method
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
