// controllers/budgetController.js
const { addBudget, getAllBudgets } = require('../models/BudgetModel');

// Handle POST /api/budgets
const createBudget = async (req, res) => {
  try {
    const { name, amount, category } = req.body;

    if (!name || !amount || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [newBudget] = await addBudget({ name, amount, category });
    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ error: 'Failed to create budget' });
  }
};

// Handle GET /api/budgets
const fetchBudgets = async (req, res) => {
  try {
    const budgets = await getAllBudgets();
    res.status(200).json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

module.exports = {
  createBudget,
  fetchBudgets,
};
