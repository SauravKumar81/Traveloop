import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Wallet, PieChart, Receipt } from 'lucide-react';
import api from '../../lib/axios';

interface IExpense {
  _id?: string;
  description: string;
  amount: number;
  category: 'accommodation' | 'food' | 'transport' | 'activities' | 'other';
  date?: string;
}

interface BudgetExpensesProps {
  tripId: string;
  budget?: number;
  expenses: IExpense[];
  onUpdate: () => void;
}

export default function BudgetExpenses({ tripId, budget = 0, expenses = [], onUpdate }: BudgetExpensesProps) {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());

  const [newExpense, setNewExpense] = useState<Partial<IExpense>>({
    description: '',
    amount: 0,
    category: 'other',
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const budgetPercentage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  const handleUpdateBudget = async () => {
    try {
      await api.put(`/api/trips/${tripId}`, { budget: Number(newBudget) });
      setIsEditingBudget(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update budget', error);
    }
  };

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;
    try {
      const updatedExpenses = [...expenses, { ...newExpense, amount: Number(newExpense.amount) }];
      await api.put(`/api/trips/${tripId}`, { expenses: updatedExpenses });
      setNewExpense({ description: '', amount: 0, category: 'other' });
      onUpdate();
    } catch (error) {
      console.error('Failed to add expense', error);
    }
  };

  const handleDeleteExpense = async (index: number) => {
    try {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      await api.put(`/api/trips/${tripId}`, { expenses: updatedExpenses });
      onUpdate();
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  // Group by category (for future analytics)
  // const expensesByCategory = expenses.reduce((acc, exp) => {
  //   acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
  //   return acc;
  // }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Budget Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-zinc-200">
              <Wallet className="mr-2 h-5 w-5 text-indigo-400" />
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingBudget ? (
              <div className="flex items-center gap-2 mt-2">
                <Input 
                  type="number" 
                  value={newBudget} 
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="bg-zinc-950 border-zinc-800"
                />
                <Button size="sm" onClick={handleUpdateBudget} className="bg-indigo-600 hover:bg-indigo-700">Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditingBudget(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="mt-2">
                <span className="text-3xl font-bold text-white">${budget.toLocaleString()}</span>
                <Button variant="link" className="text-indigo-400 p-0 ml-4 h-auto" onClick={() => setIsEditingBudget(true)}>
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total Spent Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-zinc-200">
              <Receipt className="mr-2 h-5 w-5 text-rose-400" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <span className="text-3xl font-bold text-white">${totalExpenses.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Remaining Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-zinc-200">
              <PieChart className="mr-2 h-5 w-5 text-emerald-400" />
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <span className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                ${remainingBudget.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      {budget > 0 && (
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span className="text-zinc-400">Budget Usage</span>
            <span className={budgetPercentage > 90 ? 'text-red-400' : 'text-zinc-300'}>
              {budgetPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${budgetPercentage > 90 ? 'bg-red-500' : budgetPercentage > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`} 
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Add Expense Form & List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Description</label>
              <Input 
                value={newExpense.description} 
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="bg-zinc-950 border-zinc-800"
                placeholder="Flight to Paris"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Amount ($)</label>
                <Input 
                  type="number" 
                  value={newExpense.amount || ''} 
                  onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                  className="bg-zinc-950 border-zinc-800"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Category</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as any })}
                >
                  <option value="accommodation">Accommodation</option>
                  <option value="transport">Transport</option>
                  <option value="food">Food & Dining</option>
                  <option value="activities">Activities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <Button onClick={handleAddExpense} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle>Expense History</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No expenses recorded yet.</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div>
                      <p className="font-medium text-zinc-200">{expense.description}</p>
                      <p className="text-xs text-zinc-500 capitalize">{expense.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">${expense.amount.toLocaleString()}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(index)} className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
