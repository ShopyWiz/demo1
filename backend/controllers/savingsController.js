// controllers/savingsController.js
const { 
  getAllSavingsCategories,
  getSavingsCategory,
  createSavingsCategory,
  updateSavingsCategory,
  deleteSavingsCategory,
  addToSavingsCategory,
  removeFromSavingsCategory,
  getCategoryTransactions,
  getSavingsSummary,
  transferBetweenCategories
} = require('../models/SavingsModel');

// Handle GET /api/savings/categories
const fetchSavingsCategories = async (req, res) => {
  try {
    const categories = await getAllSavingsCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching savings categories:', error);
    res.status(500).json({ error: 'Failed to fetch savings categories' });
  }
};

// Handle GET /api/savings/categories/:id
const fetchSavingsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getSavingsCategory(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Savings category not found' });
    }
    
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching savings category:', error);
    res.status(500).json({ error: 'Failed to fetch savings category' });
  }
};

// Handle POST /api/savings/categories
const createNewSavingsCategory = async (req, res) => {
  try {
    const { name, description, icon, color, target_amount, target_date, priority } = req.body;
    
    if (!name || !target_amount || isNaN(target_amount) || parseFloat(target_amount) <= 0) {
      return res.status(400).json({ error: 'Name and valid target amount are required' });
    }

    const [newCategory] = await createSavingsCategory({
      name: name.trim(),
      description: description?.trim() || null,
      icon: icon || '💰',
      color: color || '#6366f1',
      target_amount: parseFloat(target_amount),
      target_date: target_date || null,
      priority: priority || 2
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating savings category:', error);
    res.status(500).json({ error: 'Failed to create savings category' });
  }
};

// Handle PUT /api/savings/categories/:id
const updateExistingSavingsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, target_amount, target_date, priority } = req.body;
    
    if (target_amount && (isNaN(target_amount) || parseFloat(target_amount) <= 0)) {
      return res.status(400).json({ error: 'Valid target amount is required' });
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (icon) updateData.icon = icon;
    if (color) updateData.color = color;
    if (target_amount) updateData.target_amount = parseFloat(target_amount);
    if (target_date !== undefined) updateData.target_date = target_date || null;
    if (priority) updateData.priority = priority;

    const [updatedCategory] = await updateSavingsCategory(id, updateData);
    
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Savings category not found' });
    }
    
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating savings category:', error);
    res.status(500).json({ error: 'Failed to update savings category' });
  }
};

// Handle DELETE /api/savings/categories/:id
const removeSavingsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedCategory] = await deleteSavingsCategory(id);
    
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Savings category not found' });
    }
    
    res.status(200).json({ success: true, message: 'Category deactivated successfully' });
  } catch (error) {
    console.error('Error deleting savings category:', error);
    res.status(500).json({ error: 'Failed to delete savings category' });
  }
};

// Handle POST /api/savings/categories/:id/add
const addMoneyToCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Valid amount greater than 0 is required' });
    }

    const updatedCategory = await addToSavingsCategory(id, parseFloat(amount), description);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error adding money to category:', error);
    res.status(500).json({ error: 'Failed to add money to category' });
  }
};

// Handle POST /api/savings/categories/:id/remove
const removeMoneyFromCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Valid amount greater than 0 is required' });
    }

    const updatedCategory = await removeFromSavingsCategory(id, parseFloat(amount), description);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error removing money from category:', error);
    if (error.message === 'Insufficient funds in this savings category') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to remove money from category' });
    }
  }
};

// Handle GET /api/savings/categories/:id/transactions
const fetchCategoryTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    
    const transactions = await getCategoryTransactions(id, limit ? parseInt(limit) : 10);
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching category transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};

// Handle GET /api/savings/summary
const fetchSavingsSummary = async (req, res) => {
  try {
    const summary = await getSavingsSummary();
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching savings summary:', error);
    res.status(500).json({ error: 'Failed to fetch savings summary' });
  }
};

// Handle POST /api/savings/transfer
const transferMoney = async (req, res) => {
  try {
    const { from_category_id, to_category_id, amount, description } = req.body;
    
    if (!from_category_id || !to_category_id || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Valid from_category_id, to_category_id, and amount are required' });
    }

    if (from_category_id === to_category_id) {
      return res.status(400).json({ error: 'Cannot transfer to the same category' });
    }

    const result = await transferBetweenCategories(
      from_category_id, 
      to_category_id, 
      parseFloat(amount), 
      description
    );
    
    res.status(200).json({ success: true, updated_category: result });
  } catch (error) {
    console.error('Error transferring money:', error);
    if (error.message === 'Insufficient funds in source category') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to transfer money' });
    }
  }
};

module.exports = {
  fetchSavingsCategories,
  fetchSavingsCategory,
  createNewSavingsCategory,
  updateExistingSavingsCategory,
  removeSavingsCategory,
  addMoneyToCategory,
  removeMoneyFromCategory,
  fetchCategoryTransactions,
  fetchSavingsSummary,
  transferMoney,
};
