import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Map, Users, ArrowRight, Plane, Globe, Compass } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Traveloop</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-zinc-300 hover:text-white" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Plan your dream trip in seconds, not hours.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Create personalized itineraries, collaborate with friends, and organize all your bookings in one magical workspace powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 w-full sm:w-auto rounded-full text-base font-medium shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]" onClick={() => navigate('/register')}>
              Start Planning Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 h-12 w-full sm:w-auto rounded-full text-base font-medium" onClick={() => navigate('/login')}>
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Bento Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          <div className="col-span-1 md:col-span-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">AI Itinerary Generation</h3>
            <p className="text-zinc-400 text-lg">
              Just tell us where you want to go and what you like. Our Gemini AI will instantly craft a day-by-day personalized itinerary balancing sightseeing, food, and culture.
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-purple-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Collaborate</h3>
            <p className="text-zinc-400">
              Invite your friends and family. Plan your trip together with real-time updates and shared itineraries.
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Map className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">All in One Place</h3>
            <p className="text-zinc-400">
              Keep track of locations, dates, and activities. Everything is organized in a beautiful, easy-to-read timeline.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/50 transition-colors flex items-center justify-between overflow-hidden relative group">
            <div className="relative z-10 max-w-md">
              <h3 className="text-3xl font-bold text-white mb-4">Ready for your next adventure?</h3>
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-full" onClick={() => navigate('/register')}>
                Create an account
              </Button>
            </div>
            <Globe className="absolute -right-10 -bottom-10 h-64 w-64 text-blue-500/10 group-hover:rotate-12 transition-transform duration-700" />
            <Compass className="absolute right-32 top-10 h-24 w-24 text-blue-400/20 group-hover:-rotate-12 transition-transform duration-700" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-500">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-5 w-5" />
            <span className="font-bold text-zinc-400">Traveloop</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Traveloop. Designed for modern travelers.</p>
        </div>
      </footer>
    </div>
  );
}
