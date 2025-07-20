// backend/routes/budgetRoutes.js

const express = require('express');
const router = express.Router();

const {
  createBudget,
  fetchBudgets,
} = require('../controllers/budgetController');

// @route   POST /api/budgets
// @desc    Create a new budget item
router.post('/budgets', createBudget);

// @route   GET /api/budgets
// @desc    Get all budget items
router.get('/budgets', fetchBudgets);

module.exports = router;
