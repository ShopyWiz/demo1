// controllers/budgetController.js
const { addBudget, getAllBudgets, deleteBudget, updateBudget } = require('../models/BudgetModel');

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


// Handle DELETE /api/budgets/:id
const removeBudget = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Budget id required' });
    const deleted = await deleteBudget(id);
    if (deleted === 0) return res.status(404).json({ error: 'Budget not found' });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};

// Handle PUT /api/budgets/:id
const editBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, category } = req.body;
    if (!id || !name || !amount || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const [updatedBudget] = await updateBudget(id, { name, amount, category });
    if (!updatedBudget) return res.status(404).json({ error: 'Budget not found' });
    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

module.exports = {
  createBudget,
  fetchBudgets,
  removeBudget,
  editBudget,
};
