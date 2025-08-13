import React, { useState } from 'react';
import AddBudgetForm from '../components/budgeting/AddBudgetForm.js';
import BudgetCategory from '../components/budgeting/BudgetCategory.js';
import BudgetTable from '../components/budgeting/BudgetTable.js';
import SavingsHub from '../components/budgeting/SavingsHub.js';

const BudgetingPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [enterpriseSavingsData, setEnterpriseSavingsData] = useState({});

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/budgets');
      if (!response.ok) throw new Error('Failed to fetch budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      setError('Could not load budgets.');
      setBudgets([]);
    }
    setLoading(false);
  };

  // Initial fetch
  React.useEffect(() => {
    fetchBudgets();
  }, []);

  // Add budget handler
  const handleAddBudget = async (newBudget) => {
    setFeedback('');
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });
      if (!response.ok) throw new Error('Failed to add budget');
      await fetchBudgets();
      setFeedback('Budget added!');
    } catch (error) {
      setError('Failed to add budget.');
    }
  };

  // Delete budget handler
  const handleDeleteBudget = async (id) => {
    setFeedback('');
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/budgets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete budget');
      await fetchBudgets();
      setFeedback('Budget deleted.');
    } catch (error) {
      setError('Failed to delete budget.');
    }
  };

  // Edit budget handler
  const handleEditBudget = async (id, updatedData) => {
    setFeedback('');
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/budgets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update budget');
      await fetchBudgets();
      setFeedback('Budget updated!');
    } catch (error) {
      setError('Failed to update budget.');
    }
  };

  // Handle enterprise savings data updates
  const handleEnterpriseSavingsUpdate = (data) => {
    setEnterpriseSavingsData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 py-10 px-2 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* Feedback/Error Toast */}
        {(feedback || error) && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-center animate-fadeIn ${feedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback || error}
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-200 to-indigo-100 text-indigo-900 text-center p-6 rounded-3xl shadow-lg font-semibold flex items-center justify-center gap-3">
          <span className="text-4xl">👋</span>
          <span className="text-lg">Welcome to <span className="font-extrabold">ShopyWiz Budget Dashboard</span>!</span>
        </div>

        {/* Header & Tips */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 tracking-tight">ShopyWiz Budget Dashboard</h1>
          <p className="text-indigo-600 text-xl">Plan smarter. Spend better. Save more.</p>
          <div className="inline-block bg-indigo-50 text-indigo-700 px-6 py-3 rounded-xl shadow text-sm">
            💡 Tip: Create multiple savings goals and manage your budget categories for complete financial control!
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">💰</div>
            <div className="text-lg font-semibold text-indigo-700">Budget Items</div>
            <div className="text-3xl font-extrabold text-blue-700">{budgets.length}</div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-lg font-semibold text-indigo-700">Savings Goals</div>
            <div className="text-3xl font-extrabold text-indigo-700">
              {enterpriseSavingsData.total_categories || 0}
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">🏦</div>
            <div className="text-lg font-semibold text-indigo-700">Total Saved</div>
            <div className="text-3xl font-extrabold text-green-600">
              ${enterpriseSavingsData.total_saved ? parseFloat(enterpriseSavingsData.total_saved).toLocaleString() : '0'}
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">📈</div>
            <div className="text-lg font-semibold text-indigo-700">Avg Progress</div>
            <div className="text-3xl font-extrabold text-purple-600">
              {enterpriseSavingsData.avg_progress ? `${parseFloat(enterpriseSavingsData.avg_progress).toFixed(1)}%` : '0%'}
            </div>
          </div>
        </div>

        {/* Savings Hub Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">🏢</span>
            <div>
              <h2 className="text-3xl font-bold text-indigo-800 tracking-tight">Savings Hub</h2>
              <p className="text-indigo-600 text-lg">Professional multi-goal savings management for business success</p>
            </div>
          </div>
          <SavingsHub onDataUpdate={handleEnterpriseSavingsUpdate} />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-6">
          {/* Add Budget Card */}
          <div className="bg-white rounded-3xl shadow-lg flex flex-col items-stretch p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">➕</span>
              <h2 className="text-2xl font-bold text-indigo-800 tracking-tight">Add Budget Item</h2>
            </div>
            <p className="text-indigo-500 mb-6 text-lg">Track your expenses by adding new budget items.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg text-lg"
              title="Add a new budget item"
            >
              + Add Budget Item
            </button>
          </div>
        </div>

        {/* Budget Table Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-indigo-800 tracking-tight">Budget Overview</h2>
          </div>
          {loading ? (
            <div className="flex items-center gap-3 text-indigo-500 justify-center py-12">
              <span className="animate-spin text-2xl">⏳</span> 
              <span className="text-lg">Loading budgets...</span>
            </div>
          ) : (
            <BudgetTable
              budgets={budgets}
              onDelete={handleDeleteBudget}
              onEdit={handleEditBudget}
            />
          )}
        </div>
      </div>

      {/* Add Budget Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-0 relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl focus:outline-none"
              aria-label="Close Add Budget Modal"
            >
              ✕
            </button>
            <AddBudgetForm
              onAddBudget={async (budget) => {
                await handleAddBudget(budget);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategories && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowCategories(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl focus:outline-none"
              aria-label="Close Category Modal"
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
