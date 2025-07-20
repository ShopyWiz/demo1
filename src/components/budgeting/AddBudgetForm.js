import { useState } from 'react';

const categories = [
  { value: 'Food', label: '🍔 Food' },
  { value: 'Rent', label: '🏠 Rent' },
  { value: 'Utilities', label: '💡 Utilities' },
  { value: 'Misc', label: '🛒 Misc' },
];

const AddBudgetForm = ({ onAddBudget }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].value);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a budget name.');
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    setError('');

    const newBudget = {
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    };

    try {
      const response = await fetch('http://localhost:5000/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });

      if (!response.ok) throw new Error('Failed to save budget');

      const saved = await response.json();
      onAddBudget(saved); // update UI
      alert('✅ Budget added successfully!');

      // Reset form
      setName('');
      setAmount('');
      setCategory(categories[0].value);
    } catch (err) {
      console.error('❌ Error submitting:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-indigo-50 p-5 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">➕</span>
        <h3 className="text-lg font-bold text-indigo-700">Add a Budget Item</h3>
      </div>

      {/* Budget Name */}
      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">Budget Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Rent"
          className="block w-full px-3 py-2 border border-indigo-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">Amount ($)</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="e.g. 1000"
          className="block w-full px-3 py-2 border border-indigo-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full px-3 py-2 border border-indigo-200 rounded-md shadow-sm"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Add Budget
        </button>
      </div>
    </form>
  );
};

export default AddBudgetForm;
