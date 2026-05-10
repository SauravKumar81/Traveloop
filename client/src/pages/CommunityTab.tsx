import { Users, Heart, Share2, Plus, Search } from 'lucide-react';

export default function CommunityTab() {
  const posts = [
    { user: 'Lina', content: 'Just discovered the best rooftop restaurant in Lisbon!', time: '2h ago' },
    { user: 'Marco', content: 'Does anyone have a recommendation for a day trip outside Bangkok?', time: '5h ago' },
    { user: 'Nina', content: 'Packing list saved me so much time. Highly recommend the travel cube set.', time: '1d ago' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] mb-2">Community</p>
            <h1 className="text-4xl font-bold tracking-tight">Travel community feed</h1>
            <p className="mt-3 text-zinc-400 max-w-2xl">Share tips, ask questions, and get inspiration from fellow travelers.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            <Plus className="h-4 w-4" />
            New post
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-3 flex items-center gap-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input className="bg-transparent flex-1 text-sm text-white placeholder:text-zinc-500 outline-none" placeholder="Search community posts" />
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-zinc-950/70 px-4 py-3 border border-zinc-800/70 text-sm text-zinc-300">
              <Users className="h-4 w-4 text-blue-400" />
              1.2k members active
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.content} className="rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold">{post.user}</p>
                    <p className="text-xs text-zinc-500">{post.time}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-zinc-400 text-xs">
                    <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-pink-400" /> 18</span>
                    <span className="inline-flex items-center gap-1"><Share2 className="h-3.5 w-3.5 text-cyan-400" /> 5</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{post.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
