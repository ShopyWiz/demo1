// controllers/savingsController.js
const { 
  getSavingsData, 
  setSavingsGoal, 
  addToSavings, 
  removeFromSavings, 
  resetSavings 
} = require('../models/SavingsModel');

// Handle GET /api/savings
const fetchSavings = async (req, res) => {
  try {
    const savings = await getSavingsData();
    res.status(200).json(savings);
  } catch (error) {
    console.error('Error fetching savings:', error);
    res.status(500).json({ error: 'Failed to fetch savings data' });
  }
};

// Handle POST /api/savings/goal
const updateSavingsGoal = async (req, res) => {
  try {
    const { goal } = req.body;
    
    if (!goal || isNaN(goal) || parseFloat(goal) < 0) {
      return res.status(400).json({ error: 'Valid goal amount is required' });
    }

    const [updatedSavings] = await setSavingsGoal(parseFloat(goal));
    res.status(200).json(updatedSavings);
  } catch (error) {
    console.error('Error updating savings goal:', error);
    res.status(500).json({ error: 'Failed to update savings goal' });
  }
};

// Handle POST /api/savings/add
const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Valid amount greater than 0 is required' });
    }

    const [updatedSavings] = await addToSavings(parseFloat(amount));
    res.status(200).json(updatedSavings);
  } catch (error) {
    console.error('Error adding money to savings:', error);
    res.status(500).json({ error: 'Failed to add money to savings' });
  }
};

// Handle POST /api/savings/remove
const removeMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Valid amount greater than 0 is required' });
    }

    const result = await removeFromSavings(parseFloat(amount));
    if (!result) {
      return res.status(400).json({ error: 'No savings data found' });
    }
    
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error removing money from savings:', error);
    res.status(500).json({ error: 'Failed to remove money from savings' });
  }
};

// Handle POST /api/savings/reset
const resetSavingsAmount = async (req, res) => {
  try {
    const [resetSavings] = await resetSavings();
    res.status(200).json(resetSavings);
  } catch (error) {
    console.error('Error resetting savings:', error);
    res.status(500).json({ error: 'Failed to reset savings' });
  }
};

module.exports = {
  fetchSavings,
  updateSavingsGoal,
  addMoney,
  removeMoney,
  resetSavingsAmount,
};
