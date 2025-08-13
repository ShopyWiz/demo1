/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('savings_transactions', table => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().references('id').inTable('savings_categories').onDelete('CASCADE');
    table.decimal('amount', 12, 2).notNullable();
    table.enum('type', ['deposit', 'withdrawal']).notNullable();
    table.string('description').nullable();
    table.string('source').nullable(); // e.g., 'manual', 'transfer', 'auto_save'
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('savings_transactions');
};
