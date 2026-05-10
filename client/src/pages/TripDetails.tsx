import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Plus, Calendar, MapPin, Clock, Sparkles, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import AddItineraryModal from '../components/AddItineraryModal';
import { io, Socket } from 'socket.io-client';

interface IItineraryItem {
  _id?: string;
  day: number;
  date: string;
  time?: string;
  activity: string;
  location?: string;
  notes?: string;
}

interface ITrip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: string;
  itinerary: IItineraryItem[];
  creator: {
    _id: string;
    displayName: string;
  };
}

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    fetchTrip();

    // Setup Socket.io connection
    const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
      withCredentials: true,
    });
    
    setSocket(newSocket);

    if (id) {
      newSocket.emit('join_trip', id);
    }

    newSocket.on('trip_updated', (updatedTrip: ITrip) => {
      // When a trip update is received, update state
      setTrip(updatedTrip);
    });

    return () => {
      if (id) {
        newSocket.emit('leave_trip', id);
      }
      newSocket.disconnect();
    };
  }, [id]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/trips/${id}`);
      setTrip(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch trip details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-center">
        <p className="text-red-500 mb-4">{error || 'Trip not found'}</p>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Group itinerary by day
  const itineraryByDay = trip.itinerary.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, IItineraryItem[]>);

  // Sort days
  const sortedDays = Object.keys(itineraryByDay).map(Number).sort((a, b) => a - b);

  const handleDeleteItem = async (index: number, day: number) => {
    if (!trip) return;
    try {
      // Find the actual item to delete
      const itemToDelete = itineraryByDay[day][index];
      
      // Filter out the item from the main itinerary
      const updatedItinerary = trip.itinerary.filter(
        (item) => item !== itemToDelete
      );

      await api.put(`/api/trips/${trip._id}`, { itinerary: updatedItinerary });
      fetchTrip();
    } catch (err) {
      console.error('Failed to delete item', err);
      // Could add a toast notification here
    }
  };

  const generateAIItinerary = async () => {
    if (!trip) return;
    try {
      setIsGenerating(true);
      await api.post(`/api/trips/${trip._id}/generate-itinerary`, { preferences: "Include a mix of culture, food, and sightseeing." });
      fetchTrip();
    } catch (err: any) {
      console.error('Failed to generate AI itinerary', err);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{trip.title}</h1>
            <p className="text-zinc-400 mt-1 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {trip.destination} &bull; 
              <Calendar className="h-4 w-4 ml-2" /> 
              {format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        {trip.description && (
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-300">{trip.description}</p>
          </div>
        )}

        {/* Itinerary Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Itinerary</h2>
            <div className="flex items-center gap-3">
              <Button 
                onClick={generateAIItinerary}
                disabled={isGenerating}
                variant="outline"
                className="bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 hover:text-indigo-300 border-indigo-500/30"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isGenerating ? 'Generating...' : 'Auto-Generate AI Itinerary'}
              </Button>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Activity
              </Button>
            </div>
          </div>

          {sortedDays.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
              <p className="text-zinc-400">No activities planned yet.</p>
              <Button 
                variant="link" 
                className="text-indigo-400 mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                Create your first itinerary item
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDays.map((day) => (
                <div key={day} className="space-y-4">
                  <h3 className="text-xl font-medium text-zinc-200 border-b border-zinc-800 pb-2">
                    Day {day}
                    <span className="text-sm text-zinc-500 ml-3 font-normal">
                      {format(new Date(itineraryByDay[day][0].date), 'EEEE, MMM d')}
                    </span>
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {itineraryByDay[day].map((item, index) => (
                      <Card key={item._id || index} className="bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/50 transition-colors relative group">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex justify-between items-start pr-6">
                            <span>{item.activity}</span>
                            {item.time && (
                              <span className="text-sm font-normal text-indigo-400 flex items-center bg-indigo-500/10 px-2 py-1 rounded-md">
                                <Clock className="h-3 w-3 mr-1" /> {item.time}
                              </span>
                            )}
                          </CardTitle>
                          {item.location && (
                            <CardDescription className="text-zinc-400 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" /> {item.location}
                            </CardDescription>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => handleDeleteItem(index, day)}
                          >
                            &times;
                          </Button>
                        </CardHeader>
                        {item.notes && (
                          <CardContent>
                            <p className="text-sm text-zinc-500">{item.notes}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <AddItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemAdded={fetchTrip}
        tripId={id || ''}
        trip={trip}
      />
    </div>
  );
}
