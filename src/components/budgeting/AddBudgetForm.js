import { useState } from 'react';

const AddBudgetForm = ({ onAddBudget }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBudget = {
      name,
      amount: parseFloat(amount),
      category,
    };

    onAddBudget(newBudget); // 🔁 Send to parent

    // Clear form
    setName('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-xl shadow-sm">
      {/* Budget Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Budget Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Rent"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="e.g. 1000"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Misc">Misc</option>
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Budget
        </button>
      </div>
    </form>
  );
};

export default AddBudgetForm;
