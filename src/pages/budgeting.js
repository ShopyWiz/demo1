import React, { useState } from 'react';
import AddBudgetForm from '../components/budgeting/AddBudgetForm.js';
import BudgetCategory from '../components/budgeting/BudgetCategory.js';
import BudgetTable from '../components/budgeting/BudgetTable.js';
import SavingsGoal from '../components/budgeting/SavingsGoal.js';

const BudgetingPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [savedGoal, setSavedGoal] = useState(null);
  const [savingsData, setSavingsData] = useState({ goal: 0, current_amount: 0 });


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

  // Fetch savings data
  const fetchSavingsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/savings');
      if (response.ok) {
        const data = await response.json();
        setSavingsData(data);
        setSavedGoal(data.goal);
      }
    } catch (error) {
      console.error('Failed to fetch savings data:', error);
    }
  };

  // Initial fetch
  React.useEffect(() => {
    fetchBudgets();
    fetchSavingsData();
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

  // Listen for savings goal from SavingsGoal component
  const handleGoalSave = (goal) => {
    setSavedGoal(goal);
    fetchSavingsData(); // Refresh savings data when goal is updated
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 py-10 px-2 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Feedback/Error Toast */}
        {(feedback || error) && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-center animate-fadeIn ${feedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback || error}
          </div>
        )}
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-200 to-indigo-100 text-indigo-900 text-center p-4 rounded-3xl shadow font-semibold flex items-center justify-center gap-3">
          <span className="text-3xl">👋</span>
          <span>Welcome to <span className="font-extrabold">ShopyWiz Budget Dashboard</span>!</span>
        </div>

        {/* Header & Tips */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 tracking-tight">ShopyWiz Budget Dashboard</h1>
          <p className="text-indigo-600 text-lg">Plan smarter. Spend better. Save more.</p>
          <div className="inline-block bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl shadow text-sm mt-2">
            💡 Tip: Use categories to organize your spending and set a savings goal to stay motivated!
          </div>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-lg font-semibold text-indigo-700">Total Budget Items</div>
            <div className="text-2xl font-extrabold text-blue-700">{budgets.length}</div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100">
            <div className="text-3xl mb-2">🐷</div>
            <div className="text-lg font-semibold text-indigo-700">Savings Progress</div>
            <div className="text-2xl font-extrabold text-indigo-700">
              ${savingsData.current_amount ? parseFloat(savingsData.current_amount).toLocaleString() : '0'}
            </div>
            {savingsData.goal > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                Goal: ${parseFloat(savingsData.goal).toLocaleString()}
              </div>
            )}
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center border border-indigo-100">
            <div className="text-3xl mb-2">📁</div>
            <div className="text-lg font-semibold text-indigo-700">Categories</div>
            <button
              onClick={() => setShowCategories(true)}
              className="mt-2 bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition font-semibold"
              title="Manage your categories"
            >
              Manage Categories
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-indigo-200" />

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Budget */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-stretch p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">➕</span>
              <h2 className="text-xl font-bold text-indigo-800 tracking-tight">Add Budget</h2>
            </div>
            <p className="text-sm text-indigo-500 mb-4">Add a new item to your budget list.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold shadow mt-2"
              title="Add a new budget item"
            >
              + Add Budget
            </button>
          </div>

          {/* Savings Goal */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-stretch p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🐷</span>
              <h2 className="text-xl font-bold text-indigo-800 tracking-tight">Savings Goal</h2>
            </div>
            <p className="text-sm text-indigo-500 mb-4">Set and track your savings goal.</p>
            <div className="mt-2">
              <SavingsGoal onGoalSave={handleGoalSave} cardStyle={false} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-indigo-200" />

        {/* Budget Table Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-indigo-100 min-h-[200px] flex flex-col">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4 tracking-tight">📋 Budget Overview</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-indigo-500 justify-center mt-8"><span className="animate-spin">⏳</span> Loading budgets...</div>
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
