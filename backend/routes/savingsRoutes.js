// backend/routes/savingsRoutes.js

const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/savingsController');

// @route   GET /api/savings/categories
// @desc    Get all active savings categories
router.get('/savings/categories', fetchSavingsCategories);

// @route   GET /api/savings/categories/:id
// @desc    Get single savings category
router.get('/savings/categories/:id', fetchSavingsCategory);

// @route   POST /api/savings/categories
// @desc    Create new savings category
router.post('/savings/categories', createNewSavingsCategory);

// @route   PUT /api/savings/categories/:id
// @desc    Update savings category
router.put('/savings/categories/:id', updateExistingSavingsCategory);

// @route   DELETE /api/savings/categories/:id
// @desc    Delete/deactivate savings category
router.delete('/savings/categories/:id', removeSavingsCategory);

// @route   POST /api/savings/categories/:id/add
// @desc    Add money to specific savings category
router.post('/savings/categories/:id/add', addMoneyToCategory);

// @route   POST /api/savings/categories/:id/remove
// @desc    Remove money from specific savings category
router.post('/savings/categories/:id/remove', removeMoneyFromCategory);

// @route   GET /api/savings/categories/:id/transactions
// @desc    Get transaction history for a category
router.get('/savings/categories/:id/transactions', fetchCategoryTransactions);

// @route   GET /api/savings/summary
// @desc    Get overall savings summary and recent transactions
router.get('/savings/summary', fetchSavingsSummary);

// @route   POST /api/savings/transfer
// @desc    Transfer money between savings categories
router.post('/savings/transfer', transferMoney);

module.exports = router;
