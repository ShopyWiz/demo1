// src/components/budgeting/BudgetCategory.js

import { useState } from 'react';

const defaultCategories = [
  'Food',
  'Rent',
  'Utilities',
  'Entertainment',
];

const BudgetCategory = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState('');
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      setError('Category name cannot be empty.');
      setSuccess('');
      return;
    }
    if (categories.includes(trimmed)) {
      setError('Category already exists.');
      setSuccess('');
      return;
    }
    setCategories([...categories, trimmed]);
    setSuccess('Category added!');
    setError('');
    setNewCategory('');
  };

  return (
    <div className="max-w-md mx-auto bg-indigo-50 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Manage Budget Categories</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Category:</label>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {selected && (
          <div className="mt-2 text-green-700">Selected: <span className="font-bold">{selected}</span></div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Add New Category:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="e.g. Travel"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
        {success && <div className="mt-2 text-green-600 text-sm">{success}</div>}
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold text-indigo-600 mb-2">All Categories:</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {categories.map(cat => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetCategory;
  