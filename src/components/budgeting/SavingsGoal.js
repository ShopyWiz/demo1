// src/components/budgeting/SavingsGoal.js

import { useState } from 'react';

const SavingsGoal = ({ onGoalSave, cardStyle = true }) => {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    const numGoal = Number(goal);
    if (!goal || isNaN(numGoal) || numGoal <= 0) {
      setError('Please enter a valid positive amount.');
      setSuccess('');
      return;
    }
    setSavedGoal(numGoal);
    setSuccess('Savings goal saved!');
    setError('');
    setEditing(false);
    if (onGoalSave) onGoalSave(numGoal);
  };

  const handleEdit = () => {
    setEditing(true);
    setGoal(savedGoal ? savedGoal : '');
    setSuccess('');
    setError('');
  };

  const content = (
    <div>
      <h3 className="text-lg font-bold text-indigo-700 mb-3">Set Savings Goal</h3>
      {editing || savedGoal === null ? (
        <>
          <div className="mb-3">
            <label className="block text-gray-700 mb-2" htmlFor="goal-input">Goal Amount:</label>
            <input
              id="goal-input"
              type="number"
              min="1"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="Enter savings goal"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Savings goal amount"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
            aria-label="Save savings goal"
          >
            Save Goal
          </button>
        </>
      ) : (
        <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-center flex flex-col items-center">
          <div>
            🎯 Your savings goal: <span className="font-bold">${savedGoal.toLocaleString()}</span>
          </div>
          <button
            onClick={handleEdit}
            className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
            aria-label="Edit savings goal"
          >
            Edit Goal
          </button>
        </div>
      )}
      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
      {success && <div className="mt-2 text-green-600 text-sm">{success}</div>}
    </div>
  );

  return cardStyle ? (
    <div className="max-w-md mx-auto bg-indigo-50 rounded-xl shadow-md p-6">
      {content}
    </div>
  ) : content;
};

export default SavingsGoal;
  