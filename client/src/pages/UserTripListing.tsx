import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MapPin, 
  Calendar, 
  History, 
  Home, 
  Compass, 
  Luggage, 
  User,
  Loader2
} from 'lucide-react';
import { useTripStore } from '../store/useTripStore';
import CreateTripModal from '../components/CreateTripModal';

const UserTripListing: React.FC = () => {
  const navigate = useNavigate();
  const { trips, isLoading, fetchTrips } = useTripStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const safeTrips = trips || [];
  const ongoingTrips = safeTrips.filter(t => t.status === 'ongoing');
  const upcomingTrips = safeTrips.filter(t => t.status === 'planning');
  const completedTrips = safeTrips.filter(t => t.status === 'completed');

  // Helper to format dates
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 dark:border-white/10 shadow-sm docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-gutter py-sm w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-base">
            <span className="font-headline-lg text-headline-lg font-bold tracking-tight text-primary-container dark:text-primary-fixed-dim">Traveloop</span>
          </div>
          <nav className="hidden md:flex items-center gap-lg">
            <a className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1" href="#">Trips</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">Discover</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">Community</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">Journal</a>
          </nav>
          <div className="flex items-center gap-md">
            <div className="hidden sm:flex items-center bg-surface-container px-sm py-xs rounded-full border border-outline-variant/30">
              <Search className="w-5 h-5 text-on-surface-variant scale-90" />
              <input className="bg-transparent border-none focus:ring-0 text-body-md placeholder:text-on-surface-variant/50 w-32 lg:w-48 outline-none ml-2" placeholder="Search trips..." type="text"/>
              <span className="text-label-sm text-on-surface-variant/40 px-xs border border-outline-variant/30 rounded ml-xs">⌘K</span>
            </div>
            <div className="flex items-center gap-sm">
              <button className="hover:bg-primary/10 p-2 rounded-lg transition-all duration-200"><Bell className="w-6 h-6 text-on-surface-variant" /></button>
              <button className="hover:bg-primary/10 p-2 rounded-lg transition-all duration-200"><Settings className="w-6 h-6 text-on-surface-variant" /></button>
              <img alt="User profile avatar" className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiugQC281XmFF7-1IALbmM3SZev16kCsS48MLhf8Dz02ryfAcv8ry_jqh2FRNuDz5N0_poFm-jB1a5HePILBE5qfyp25xLc1-jmTy21N5KOWj9EJkttVJNlWeAB_p1-wJFlWIfCikCAtjn-q9BJR2CwIcjfc6-0G3D_l8Mca_-mDpaHX5KtPHWPpZ7AYJZUlaBamGyS9apTZQaLmT7_6lpCIiNQJaIHjDjsrY_tMDPmnqZpFVI9Y1tPCSx8lA8Q9U_43qA4vLiiBCa"/>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-gutter py-xl flex flex-col gap-lg pb-32">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface mb-xs">My Trips</h1>
            <p className="font-body-lg text-lg text-on-surface-variant">Manage your upcoming and past adventures.</p>
          </div>
          <div className="flex items-center gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-xl border border-outline-variant/30 text-label-md font-label-md hover:bg-surface-container-high transition-all">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-xl border border-outline-variant/30 text-label-md font-label-md hover:bg-surface-container-high transition-all">
              <ArrowUpDown className="w-5 h-5" />
              Sort by
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-xs px-lg py-sm bg-primary-container text-on-primary font-label-md rounded-xl shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
              Plan New Trip
            </button>
          </div>
        </div>

        {/* Status Handling */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-on-surface-variant font-body-md">Loading your adventures...</p>
          </div>
        ) : safeTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border border-white/5 p-8 mt-8">
            <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">No trips planned yet</h3>
            <p className="font-body-md text-on-surface-variant max-w-md mb-6">Your next great adventure awaits. Start planning a new itinerary, manage expenses, and keep a journal all in one place.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-xs px-lg py-sm bg-primary text-on-primary font-label-md rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <>
            {/* Ongoing Section */}
            {ongoingTrips.length > 0 && (
              <section className="space-y-gutter mt-8">
                <div className="flex items-center gap-sm mb-4">
                  <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                  <h2 className="font-headline-lg text-2xl font-semibold">Ongoing</h2>
                </div>
                <div className="grid grid-cols-1 gap-gutter">
                  {ongoingTrips.map((trip) => (
                    <div 
                      key={trip._id} 
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="group relative h-[420px] rounded-3xl overflow-hidden glass-card cursor-pointer hover:translate-y-[-4px] transition-all duration-300 border border-white/5 shadow-xl"
                    >
                      <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={trip.title} src={trip.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-lg w-full flex justify-between items-end">
                        <div className="space-y-xs">
                          <span className="px-sm py-1 bg-secondary/20 backdrop-blur-md text-secondary rounded-full font-label-sm text-sm border border-secondary/30">Current Trip</span>
                          <h3 className="font-display-lg text-4xl font-bold text-white mt-2 mb-2">{trip.title}</h3>
                          <div className="flex items-center gap-md text-white/80">
                            <span className="flex items-center gap-xs font-label-md text-sm"><MapPin className="w-4 h-4 scale-75" /> {trip.destination}</span>
                            <span className="flex items-center gap-xs font-label-md text-sm"><Calendar className="w-4 h-4 scale-75" /> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                          </div>
                        </div>
                        <div className="hidden lg:flex flex-col items-end gap-sm">
                          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-md py-sm rounded-xl font-label-md transition-all">View Full Itinerary</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Up-coming Section */}
            {upcomingTrips.length > 0 && (
              <section className="space-y-gutter mt-12">
                <div className="flex items-center gap-sm mb-4">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <h2 className="font-headline-lg text-2xl font-semibold">Up-coming</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter gap-6">
                  {upcomingTrips.map((trip) => (
                    <div 
                      key={trip._id} 
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="group relative h-[320px] rounded-3xl overflow-hidden glass-card cursor-pointer hover:shadow-xl transition-all border border-white/5"
                    >
                      <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={trip.title} src={trip.coverImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
                      <div className="absolute inset-0 p-md p-6 flex flex-col justify-end">
                        <span className="w-fit px-sm py-1 bg-primary-container/30 backdrop-blur-md text-primary-fixed-dim rounded-full font-label-sm text-xs border border-primary/20 mb-xs">Planning</span>
                        <h3 className="font-headline-xl text-3xl font-bold text-white mt-2">{trip.title}</h3>
                        <p className="font-body-md text-white/70 mt-1">{trip.destination} • {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Section */}
            {completedTrips.length > 0 && (
              <section className="space-y-gutter mb-xl mt-12">
                <div className="flex items-center gap-sm mb-4">
                  <span className="w-3 h-3 rounded-full bg-outline"></span>
                  <h2 className="font-headline-lg text-2xl font-semibold">Completed</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter gap-6">
                  {completedTrips.slice(0, 2).map((trip) => (
                    <div 
                      key={trip._id} 
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="glass-card bg-surface/40 backdrop-blur-md p-4 rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group border border-white/5"
                    >
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={trip.title} src={trip.coverImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"}/>
                      </div>
                      <h3 className="font-label-md font-bold text-on-surface mb-1">{trip.title}</h3>
                      <p className="font-label-sm text-xs text-on-surface-variant">{trip.destination} • {formatDate(trip.endDate)}</p>
                    </div>
                  ))}

                  {completedTrips.length > 2 && (
                    <div className="glass-card bg-surface/40 backdrop-blur-md p-4 rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group border-dashed border-2 border-outline-variant/30 flex flex-col items-center justify-center text-center h-full min-h-[220px]">
                      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
                        <History className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-label-md font-bold text-on-surface mb-1">View Archive</h3>
                      <p className="font-label-sm text-xs text-on-surface-variant">{completedTrips.length - 2} more past trips</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full lg:hidden z-50 rounded-t-xl bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16 px-4 pb-safe">
          <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <Home className="w-6 h-6 mb-1" />
            <span className="font-label-sm text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <Compass className="w-6 h-6 mb-1" />
            <span className="font-label-sm text-[10px]">Explore</span>
          </button>
          <button onClick={() => navigate('/trips')} className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim bg-primary-container/10 rounded-xl px-4 py-1">
            <Luggage className="w-6 h-6 mb-1" />
            <span className="font-label-sm text-[10px]">Trips</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant opacity-60">
            <User className="w-6 h-6 mb-1" />
            <span className="font-label-sm text-[10px]">Profile</span>
          </button>
        </div>
      </nav>

      {/* Floating Action Button (Mobile Contextual) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-6 lg:hidden w-14 h-14 bg-primary-container text-on-primary rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-transform"
      >
        <Plus className="w-8 h-8" />
      </button>

      <CreateTripModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTripCreated={fetchTrips} 
      />
    </div>
  );
};

export default UserTripListing;
