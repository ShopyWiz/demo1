// models/SavingsModel.js
const db = require('../db/knex');

// Get current savings goal and progress
const getSavingsData = async () => {
  const result = await db('savings').select('*').first();
  return result || { goal: 0, current_amount: 0, created_at: new Date() };
};

// Set or update savings goal
const setSavingsGoal = async (goal) => {
  const existing = await db('savings').select('*').first();
  
  if (existing) {
    return await db('savings')
      .update({ goal, updated_at: new Date() })
      .returning('*');
  } else {
    return await db('savings')
      .insert({ goal, current_amount: 0, created_at: new Date() })
      .returning('*');
  }
};

// Add money to savings
const addToSavings = async (amount) => {
  const existing = await db('savings').select('*').first();
  
  if (existing) {
    const newAmount = parseFloat(existing.current_amount) + parseFloat(amount);
    return await db('savings')
      .update({ current_amount: newAmount, updated_at: new Date() })
      .returning('*');
  } else {
    return await db('savings')
      .insert({ goal: 0, current_amount: amount, created_at: new Date() })
      .returning('*');
  }
};

// Remove money from savings
const removeFromSavings = async (amount) => {
  const existing = await db('savings').select('*').first();
  
  if (existing) {
    const newAmount = Math.max(0, parseFloat(existing.current_amount) - parseFloat(amount));
    return await db('savings')
      .update({ current_amount: newAmount, updated_at: new Date() })
      .returning('*');
  }
  return null;
};

// Reset savings (emergency reset)
const resetSavings = async () => {
  return await db('savings')
    .update({ current_amount: 0, updated_at: new Date() })
    .returning('*');
};

module.exports = {
  getSavingsData,
  setSavingsGoal,
  addToSavings,
  removeFromSavings,
  resetSavings,
};
