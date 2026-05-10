import { create } from 'zustand';
import api from '../lib/axios';

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  collaborators?: string[];
  status?: 'planning' | 'ongoing' | 'completed';
}

interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  fetchTrips: () => Promise<void>;
  createTrip: (tripData: Partial<Trip>) => Promise<Trip>;
  deleteTrip: (id: string) => Promise<void>;
}

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  isLoading: false,
  error: null,
  
  fetchTrips: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get('/trips');
      set({ trips: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch trips' });
    } finally {
      set({ isLoading: false });
    }
  },

  createTrip: async (tripData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/trips', tripData);
      set((state) => ({ trips: [...state.trips, response.data] }));
      return response.data;
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create trip' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTrip: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await api.delete(`/trips/${id}`);
      set((state) => ({ trips: state.trips.filter((trip) => trip._id !== id) }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete trip' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
