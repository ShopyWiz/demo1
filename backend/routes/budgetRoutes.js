// backend/routes/budgetRoutes.js

const express = require('express');
const router = express.Router();

const {
  createBudget,
  fetchBudgets,
  removeBudget,
  editBudget,
} = require('../controllers/budgetController');


// @route   POST /api/budgets
// @desc    Create a new budget item
router.post('/budgets', createBudget);

// @route   GET /api/budgets
// @desc    Get all budget items
router.get('/budgets', fetchBudgets);

// @route   DELETE /api/budgets/:id
// @desc    Delete a budget item
router.delete('/budgets/:id', removeBudget);

// @route   PUT /api/budgets/:id
// @desc    Edit a budget item
router.put('/budgets/:id', editBudget);

module.exports = router;
