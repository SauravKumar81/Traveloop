import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, BookOpen } from 'lucide-react';
import api from '../../lib/axios';

interface TripJournalProps {
  tripId: string;
  notes?: string;
  onUpdate: () => void;
}

export default function TripJournal({ tripId, notes = '', onUpdate }: TripJournalProps) {
  const [content, setContent] = useState(notes);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setContent(notes);
    setIsDirty(false);
  }, [notes]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.put(`/api/trips/${tripId}`, { journalNotes: content });
      setIsDirty(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to save journal notes', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            Travel Journal & Notes
          </CardTitle>
          <Button 
            onClick={handleSave} 
            disabled={!isDirty || isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Notes'}
          </Button>
        </CardHeader>
        <CardContent>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Write down your thoughts, important contacts, flight confirmation numbers, or memories from the trip..."
            className="w-full h-[500px] bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 custom-scrollbar resize-y"
          />
        </CardContent>
      </Card>
    </div>
  );
}
