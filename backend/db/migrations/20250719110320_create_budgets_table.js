exports.up = function (knex) {
  return knex.schema.createTable('budgets', function (table) {
    table.increments('id').primary();             // Auto-incrementing ID
    table.string('name').notNullable();           // Budget name (e.g., "Rent")
    table.decimal('amount', 10, 2).notNullable(); // Budget amount (e.g., 500.00)
    table.string('category').notNullable();       // Category (e.g., "Utilities")
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Auto timestamp
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('budgets');
};
