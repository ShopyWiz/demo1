// models/SavingsModel.js
const db = require('../db/knex');

// Get all savings categories with their progress
const getAllSavingsCategories = async () => {
  return await db('savings_categories')
    .select('*')
    .where('is_active', true)
    .orderBy('priority', 'asc')
    .orderBy('created_at', 'desc');
};

// Get single savings category
const getSavingsCategory = async (id) => {
  return await db('savings_categories')
    .select('*')
    .where({ id, is_active: true })
    .first();
};

// Create new savings category
const createSavingsCategory = async (categoryData) => {
  return await db('savings_categories')
    .insert({
      ...categoryData,
      created_at: new Date(),
      updated_at: new Date()
    })
    .returning('*');
};

// Update savings category
const updateSavingsCategory = async (id, updateData) => {
  return await db('savings_categories')
    .where({ id })
    .update({
      ...updateData,
      updated_at: new Date()
    })
    .returning('*');
};

// Delete/deactivate savings category
const deleteSavingsCategory = async (id) => {
  return await db('savings_categories')
    .where({ id })
    .update({ is_active: false, updated_at: new Date() })
    .returning('*');
};

// Add money to specific category
const addToSavingsCategory = async (categoryId, amount, description = null, source = 'manual') => {
  const trx = await db.transaction();
  
  try {
    // Add transaction record
    await trx('savings_transactions').insert({
      category_id: categoryId,
      amount,
      type: 'deposit',
      description,
      source,
      created_at: new Date()
    });

    // Update category current amount
    const [updatedCategory] = await trx('savings_categories')
      .where({ id: categoryId })
      .increment('current_amount', amount)
      .update({ updated_at: new Date() })
      .returning('*');

    await trx.commit();
    return updatedCategory;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

// Remove money from specific category
const removeFromSavingsCategory = async (categoryId, amount, description = null) => {
  const trx = await db.transaction();
  
  try {
    // Check if category has enough balance
    const category = await trx('savings_categories')
      .select('current_amount')
      .where({ id: categoryId })
      .first();

    if (!category || parseFloat(category.current_amount) < parseFloat(amount)) {
      throw new Error('Insufficient funds in this savings category');
    }

    // Add transaction record
    await trx('savings_transactions').insert({
      category_id: categoryId,
      amount,
      type: 'withdrawal',
      description,
      source: 'manual',
      created_at: new Date()
    });

    // Update category current amount
    const [updatedCategory] = await trx('savings_categories')
      .where({ id: categoryId })
      .decrement('current_amount', amount)
      .update({ updated_at: new Date() })
      .returning('*');

    await trx.commit();
    return updatedCategory;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

// Get transaction history for a category
const getCategoryTransactions = async (categoryId, limit = 10) => {
  return await db('savings_transactions')
    .select('*')
    .where({ category_id: categoryId })
    .orderBy('created_at', 'desc')
    .limit(limit);
};

// Get overall savings summary
const getSavingsSummary = async () => {
  const summary = await db('savings_categories')
    .select(
      db.raw('COUNT(*) as total_categories'),
      db.raw('SUM(target_amount) as total_target'),
      db.raw('SUM(current_amount) as total_saved'),
      db.raw('AVG((current_amount / NULLIF(target_amount, 0)) * 100) as avg_progress')
    )
    .where('is_active', true)
    .first();

  const recentTransactions = await db('savings_transactions')
    .join('savings_categories', 'savings_transactions.category_id', 'savings_categories.id')
    .select(
      'savings_transactions.*',
      'savings_categories.name as category_name',
      'savings_categories.icon as category_icon'
    )
    .where('savings_categories.is_active', true)
    .orderBy('savings_transactions.created_at', 'desc')
    .limit(5);

  return {
    ...summary,
    recent_transactions: recentTransactions
  };
};

// Transfer money between categories
const transferBetweenCategories = async (fromCategoryId, toCategoryId, amount, description = null) => {
  const trx = await db.transaction();
  
  try {
    // Check if source category has enough balance
    const fromCategory = await trx('savings_categories')
      .select('current_amount', 'name')
      .where({ id: fromCategoryId })
      .first();

    if (!fromCategory || parseFloat(fromCategory.current_amount) < parseFloat(amount)) {
      throw new Error('Insufficient funds in source category');
    }

    // Remove from source category
    await trx('savings_transactions').insert({
      category_id: fromCategoryId,
      amount,
      type: 'withdrawal',
      description: description || `Transfer to category ${toCategoryId}`,
      source: 'transfer',
      created_at: new Date()
    });

    await trx('savings_categories')
      .where({ id: fromCategoryId })
      .decrement('current_amount', amount)
      .update({ updated_at: new Date() });

    // Add to destination category
    await trx('savings_transactions').insert({
      category_id: toCategoryId,
      amount,
      type: 'deposit',
      description: description || `Transfer from category ${fromCategoryId}`,
      source: 'transfer',
      created_at: new Date()
    });

    const [updatedToCategory] = await trx('savings_categories')
      .where({ id: toCategoryId })
      .increment('current_amount', amount)
      .update({ updated_at: new Date() })
      .returning('*');

    await trx.commit();
    return updatedToCategory;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

module.exports = {
  getAllSavingsCategories,
  getSavingsCategory,
  createSavingsCategory,
  updateSavingsCategory,
  deleteSavingsCategory,
  addToSavingsCategory,
  removeFromSavingsCategory,
  getCategoryTransactions,
  getSavingsSummary,
  transferBetweenCategories,
};
