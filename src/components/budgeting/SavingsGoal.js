// src/components/budgeting/SavingsGoal.js

import { useState, useEffect } from 'react';

const SavingsGoal = ({ onGoalSave, cardStyle = true }) => {
  const [goal, setGoal] = useState('');
  const [currentAmount, setCurrentAmount] = useState(0);
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch savings data on component mount
  useEffect(() => {
    fetchSavingsData();
  }, []);

  const fetchSavingsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/savings');
      if (response.ok) {
        const data = await response.json();
        setGoal(data.goal || '');
        setCurrentAmount(data.current_amount || 0);
        onGoalSave?.(data.goal || 0);
      }
    } catch (error) {
      console.error('Failed to fetch savings data:', error);
    }
  };

  const handleSetGoal = async (e) => {
    e.preventDefault();
    if (!goal || isNaN(goal) || parseFloat(goal) <= 0) {
      setError('Please enter a valid goal amount.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/savings/goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: parseFloat(goal) }),
      });

      if (response.ok) {
        const data = await response.json();
        setGoal(data.goal);
        setMessage('Savings goal updated!');
        onGoalSave?.(data.goal);
        setIsEditing(false);
      } else {
        setError('Failed to update goal.');
      }
    } catch (error) {
      setError('Failed to update goal.');
    }
    setLoading(false);
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!addAmount || isNaN(addAmount) || parseFloat(addAmount) <= 0) {
      setError('Please enter a valid amount to add.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/savings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(addAmount) }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentAmount(data.current_amount);
        setAddAmount('');
        setMessage(`Added $${addAmount} to savings!`);
      } else {
        setError('Failed to add money.');
      }
    } catch (error) {
      setError('Failed to add money.');
    }
    setLoading(false);
  };

  const handleRemoveMoney = async (e) => {
    e.preventDefault();
    if (!removeAmount || isNaN(removeAmount) || parseFloat(removeAmount) <= 0) {
      setError('Please enter a valid amount to remove.');
      return;
    }

    if (parseFloat(removeAmount) > currentAmount) {
      setError('Cannot remove more than current savings.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/savings/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(removeAmount) }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentAmount(data.current_amount);
        setRemoveAmount('');
        setMessage(`Removed $${removeAmount} from savings.`);
      } else {
        setError('Failed to remove money.');
      }
    } catch (error) {
      setError('Failed to remove money.');
    }
    setLoading(false);
  };

  const calculateProgress = () => {
    if (!goal || goal <= 0) return 0;
    return Math.min((currentAmount / goal) * 100, 100);
  };

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  const containerClasses = cardStyle 
    ? "bg-white rounded-2xl shadow-lg p-6 border border-indigo-100" 
    : "";

  return (
    <div className={containerClasses}>
      {/* Messages */}
      {(message || error) && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message || error}
          <button onClick={clearMessages} className="ml-2 text-xs opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Piggy Bank Visual */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          {/* Piggy Bank */}
          <div className="text-6xl mb-2 transform hover:scale-105 transition-transform">
            🐷
          </div>
          {/* Progress Ring Around Piggy */}
          <div className="absolute -inset-4 -top-6">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Circle */}
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress Circle */}
              <path
                className="text-pink-500"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${calculateProgress()}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
        
        {/* Savings Display */}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-indigo-800">
            ${currentAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {goal > 0 ? `Goal: $${parseFloat(goal).toLocaleString()}` : 'No goal set'}
          </div>
          {goal > 0 && (
            <div className="text-xs text-pink-600 font-semibold">
              {calculateProgress().toFixed(1)}% Complete
            </div>
          )}
        </div>
      </div>

      {/* Goal Setting */}
      <div className="mb-4">
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {goal > 0 ? `Savings Goal: $${parseFloat(goal).toLocaleString()}` : 'No goal set'}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 text-sm hover:text-indigo-700 font-semibold"
            >
              {goal > 0 ? 'Edit Goal' : 'Set Goal'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSetGoal} className="space-y-2">
            <input
              type="number"
              min="0"
              step="0.01"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter savings goal"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
              >
                {loading ? 'Saving...' : 'Set Goal'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Money Actions */}
      <div className="grid grid-cols-1 gap-3">
        {/* Add Money */}
        <form onSubmit={handleAddMoney} className="flex gap-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            placeholder="Amount to add"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold text-sm"
          >
            💰 Add
          </button>
        </form>

        {/* Remove Money */}
        {currentAmount > 0 && (
          <form onSubmit={handleRemoveMoney} className="flex gap-2">
            <input
              type="number"
              min="0"
              max={currentAmount}
              step="0.01"
              value={removeAmount}
              onChange={(e) => setRemoveAmount(e.target.value)}
              placeholder="Amount to remove"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm"
            >
              💸 Remove
            </button>
          </form>
        )}
      </div>

      {/* Achievement Messages */}
      {goal > 0 && currentAmount >= goal && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-yellow-800 font-semibold text-sm">
            Congratulations! You've reached your savings goal!
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoal;
  