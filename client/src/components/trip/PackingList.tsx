import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import api from '../../lib/axios';

interface IPackingItem {
  _id?: string;
  item: string;
  packed: boolean;
}

interface PackingListProps {
  tripId: string;
  packingList: IPackingItem[];
  onUpdate: () => void;
}

export default function PackingList({ tripId, packingList = [], onUpdate }: PackingListProps) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      const updatedList = [...packingList, { item: newItem, packed: false }];
      await api.put(`/api/trips/${tripId}`, { packingList: updatedList });
      setNewItem('');
      onUpdate();
    } catch (error) {
      console.error('Failed to add packing item', error);
    }
  };

  const handleTogglePacked = async (index: number) => {
    try {
      const updatedList = [...packingList];
      updatedList[index].packed = !updatedList[index].packed;
      await api.put(`/api/trips/${tripId}`, { packingList: updatedList });
      onUpdate();
    } catch (error) {
      console.error('Failed to update packing item', error);
    }
  };

  const handleDeleteItem = async (index: number) => {
    try {
      const updatedList = packingList.filter((_, i) => i !== index);
      await api.put(`/api/trips/${tripId}`, { packingList: updatedList });
      onUpdate();
    } catch (error) {
      console.error('Failed to delete packing item', error);
    }
  };

  const packedCount = packingList.filter(item => item.packed).length;
  const totalCount = packingList.length;
  const progress = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>Packing Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm">Packed</span>
                <span className="text-white font-medium">{packedCount} / {totalCount}</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-zinc-500 text-sm mt-4">
                {progress === 100 ? "You're all packed!" : "Keep going!"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Items to Pack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <Input 
                  value={newItem} 
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="E.g., Passport, Sunscreen, Charger..."
                  className="bg-zinc-950 border-zinc-800"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                />
                <Button onClick={handleAddItem} className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {packingList.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
                  No items in your packing list yet.
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {packingList.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        item.packed ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-zinc-950 border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => handleTogglePacked(index)}>
                        {item.packed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-zinc-500" />
                        )}
                        <span className={`text-sm ${item.packed ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>
                          {item.item}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteItem(index)} 
                        className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
