import { useState } from 'react';
import AddBudgetForm from '../components/budgeting/AddBudgetForm.js';
import BudgetCategory from '../components/budgeting/BudgetCategory.js';
import BudgetTable from '../components/budgeting/BudgetTable.js';
import SavingsGoal from '../components/budgeting/SavingsGoal.js';

const BudgetingPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleAddBudget = (newBudget) => {
    setBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-14 px-4 flex justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Tailwind Confirmation Banner */}
        <div className="bg-green-100 text-green-800 text-center p-3 rounded shadow font-medium">
          ✅ Tailwind is working beautifully!
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-2">ShopyWiz Budget Dashboard</h1>
          <p className="text-gray-600 text-lg">Plan smarter. Spend better. Save more.</p>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Budget */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">➕ Add Budget</h2>
              <p className="text-sm text-gray-500">Add a new item to your budget list.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="self-end bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add Budget
            </button>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">📁 Categories</h2>
              <p className="text-sm text-gray-500">Manage your budget categories.</p>
            </div>
            <button
              onClick={() => setShowCategories(true)}
              className="self-end bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              View Categories
            </button>
          </div>
        </div>

        {/* Budget Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Budget Overview</h2>
          <BudgetTable budgets={budgets} />
        </div>

        {/* Savings Goals */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🐷 Savings Goals</h2>
          <SavingsGoal />
        </div>
      </div>

      {/* Add Budget Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-700">Add New Budget</h3>
            <AddBudgetForm
              onAddBudget={(budget) => {
                handleAddBudget(budget);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategories && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowCategories(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-indigo-700">Budget Categories</h3>
            <BudgetCategory />
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetingPage;
