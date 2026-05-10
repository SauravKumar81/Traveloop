import { 
  Compass, LayoutDashboard, Map, Route, BookOpen, Receipt, ListChecks, HelpCircle, 
  LogOut, Menu, Search, Bell, Settings, Plus, Building2, Pencil, Trash2, Share2, 
  MoreHorizontal, Utensils, Train, Ticket, Download, Lightbulb, CheckCircle2, Circle, 
  Home, Briefcase, User 
} from 'lucide-react';

export default function TripJournal() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      {/* Desktop Side Navigation */}
      <aside className="fixed left-0 top-0 h-full w-[280px] hidden lg:flex flex-col bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800/50 p-6 space-y-2 shadow-2xl z-50">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center">
            <Compass className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white leading-none tracking-tight">Traveloop</h1>
            <p className="text-zinc-400 text-xs mt-1">Premium Planner</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <Map className="h-5 w-5" />
            <span className="text-sm font-medium">My Trips</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <Route className="h-5 w-5" />
            <span className="text-sm font-medium">Itineraries</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-bold rounded-r-xl" href="#">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium">Journal</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <Receipt className="h-5 w-5" />
            <span className="text-sm font-medium">Expenses</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <ListChecks className="h-5 w-5" />
            <span className="text-sm font-medium">Checklists</span>
          </a>
        </nav>
        
        <button className="w-full py-3.5 bg-gradient-to-br from-indigo-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-transform mb-6">
          Plan New Trip
        </button>
        
        <div className="space-y-1 border-t border-zinc-800/50 pt-4">
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" href="#">
            <HelpCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Help Center</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-xl" href="#">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-[280px] min-h-screen flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>

        {/* Top App Bar */}
        <header className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/50 shadow-sm flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-zinc-400 hover:bg-zinc-800/50 rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Journal</h2>
              <p className="text-sm text-zinc-400 mt-0.5">Trip: Paris & Rome Adventure</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-zinc-900/80 rounded-full px-4 py-2 border border-zinc-800/50 focus-within:border-indigo-500/50 transition-colors">
              <Search className="h-4 w-4 text-zinc-400 mr-2" />
              <input 
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-white placeholder-zinc-500 w-48 lg:w-64" 
                placeholder="Search notes..." 
                type="text"
              />
              <span className="text-xs font-bold text-zinc-600 ml-2">⌘K</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 rounded-full border border-indigo-500/50 p-0.5 ml-2 cursor-pointer">
                <img alt="User profile avatar" className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="max-w-[1280px] w-full mx-auto p-6 lg:p-8 space-y-8 flex-1">
          {/* Filter Bar */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center p-1 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800/50">
              <button className="px-5 py-2 bg-zinc-800 text-white rounded-xl text-sm font-medium shadow-sm transition-transform active:scale-95">All</button>
              <button className="px-5 py-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors">By Day</button>
              <button className="px-5 py-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors">By Stop</button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-indigo-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all text-sm">
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </button>
          </section>

          {/* Journal Feed (Bento Style Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Journal Entry 1 */}
            <article className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 flex flex-col gap-4 group hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Hotel check-in details</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Rome stop • Day 3 • June 14, 2025</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white"><Pencil className="h-4 w-4" /></button>
                  <button className="p-1.5 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Check-in after 2pm, room 302, breakfast included (7-10am). The staff was incredibly welcoming and offered a welcome drink. The view of the piazza from the balcony is breathtaking.
              </p>
              <div className="mt-auto flex items-center gap-2 pt-4 border-t border-zinc-800/50">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">Logistics</span>
                <span className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-full text-xs font-medium border border-zinc-700/50">High Priority</span>
              </div>
            </article>

            {/* Journal Entry 2 (Image Focus) */}
            <article className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-all duration-300 md:row-span-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Colosseum in Rome" 
                  src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200&h=800" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                <div className="absolute bottom-5 left-6">
                  <h3 className="text-xl font-bold text-white tracking-tight">Sunset at the Colosseum</h3>
                  <p className="text-xs text-zinc-300 mt-1">Day 4 • June 15, 2025</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "The light hit the stones just right at 7:45 PM. Reminded me why we travel. Found a small gelato shop nearby called 'Il Dolce'—best pistachio in the city."
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex -space-x-2">
                    <img alt="Companion 1" className="w-8 h-8 rounded-full border-2 border-zinc-900" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" />
                    <img alt="Companion 2" className="w-8 h-8 rounded-full border-2 border-zinc-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"><Share2 className="h-4 w-4" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </article>

            {/* Journal Entry 3 */}
            <article className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 flex flex-col gap-4 group hover:border-purple-500/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Dinner Reservations</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Trastevere stop • June 14, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-800/30 rounded-2xl p-4 border border-zinc-700/30">
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-zinc-400 text-xs font-medium">Location:</span>
                  <span className="text-white text-sm font-semibold">Da Enzo al 29</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-medium">Time:</span>
                  <span className="text-white text-sm font-semibold">8:30 PM <span className="text-emerald-400 text-xs font-normal ml-1">(Confirmed)</span></span>
                </div>
              </div>
              
              <p className="text-sm text-zinc-300 leading-relaxed">
                Must try the Carbonara and the Burrata with sun-dried tomatoes. Cash only, so visit an ATM before heading there.
              </p>
            </article>

            {/* Journal Entry 4 */}
            <article className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 border-l-4 border-l-blue-500 rounded-3xl p-6 flex flex-col gap-4 group hover:border-blue-500/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Train className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Train Ticket to Florence</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Day 6 • June 17, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30">
                <Ticket className="text-blue-400 h-8 w-8" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-400 font-medium">PNR: RT984XLP</p>
                  <p className="text-sm font-bold text-white mt-0.5">Platform 4 • Seat 12C</p>
                </div>
                <button className="bg-zinc-800 p-2 rounded-xl text-white hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </article>

            {/* Journal Entry 5 */}
            <article className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 flex flex-col gap-4 group hover:border-amber-500/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Packing Reminder</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">General Note</p>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-3 mt-2">
                <li className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="text-emerald-400 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Universal power adapter (Type L)</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="text-emerald-400 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Comfortable walking shoes (15k steps/day)</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-500">
                  <Circle className="text-zinc-600 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Reusable water bottle</span>
                </li>
              </ul>
            </article>

          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full lg:hidden z-50 rounded-t-2xl bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 flex justify-around items-center h-20 px-4 pb-2">
        <a className="flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors" href="#">
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors" href="#">
          <Compass className="h-6 w-6" />
          <span className="text-[10px] font-medium">Explore</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1 text-indigo-400 bg-indigo-500/10 rounded-2xl px-5 py-2" href="#">
          <Briefcase className="h-6 w-6" />
          <span className="text-[10px] font-medium">Trips</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors" href="#">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </a>
      </nav>

      {/* Floating Action Button for Mobile */}
      <button className="fixed bottom-28 right-6 lg:hidden w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center z-50 active:scale-95 transition-transform">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
