import { create } from 'zustand';
import api from '../lib/axios';

interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  tier: 'free' | 'pro' | 'enterprise';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, avatarUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearError: () => set({ error: null }),
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get('/auth/me');
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/login', { email, password });
      set({ 
        user: {
          _id: response.data._id,
          email: response.data.email,
          name: response.data.displayName,
          avatar: response.data.avatarUrl,
          tier: response.data.tier ?? 'free'
        }, 
        isAuthenticated: true 
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (name, email, password, avatarUrl?: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/register', { displayName: name, email, password, avatarUrl });
      set({ 
        user: {
          _id: response.data._id,
          email: response.data.email,
          name: response.data.displayName,
          avatar: response.data.avatarUrl,
          tier: response.data.tier ?? 'free'
        }, 
        isAuthenticated: true 
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Registration failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed', error);
    }
  },
}));
