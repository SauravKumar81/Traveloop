import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import api from '../lib/axios';

interface AddItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: () => void;
  tripId: string;
  trip: any; // The full trip object to append the new item to
}

export default function AddItineraryModal({ isOpen, onClose, onItemAdded, tripId, trip }: AddItineraryModalProps) {
  const [formData, setFormData] = useState({
    day: 1,
    date: trip?.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : '',
    time: '',
    activity: '',
    location: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newItem = {
        day: Number(formData.day),
        date: new Date(formData.date),
        time: formData.time,
        activity: formData.activity,
        location: formData.location,
        notes: formData.notes,
      };

      const updatedItinerary = [...(trip.itinerary || []), newItem];

      await api.put(`/api/trips/${tripId}`, { itinerary: updatedItinerary });
      onItemAdded();
      onClose();
      // Reset form
      setFormData({
        day: 1,
        date: trip?.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : '',
        time: '',
        activity: '',
        location: '',
        notes: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add activity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Activity</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day" className="text-zinc-400">Day Number</Label>
              <Input
                id="day"
                name="day"
                type="number"
                min="1"
                required
                value={formData.day}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-zinc-400">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-zinc-400">Time (Optional)</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity" className="text-zinc-400">Activity</Label>
              <Input
                id="activity"
                name="activity"
                required
                placeholder="e.g., Visit Eiffel Tower"
                value={formData.activity}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-zinc-400">Location (Optional)</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Champ de Mars, Paris"
              value={formData.location}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-zinc-400">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional details..."
              value={formData.notes}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isLoading ? 'Adding...' : 'Add Activity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
