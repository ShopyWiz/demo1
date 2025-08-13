/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('savings_categories', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.string('icon').defaultTo('💰');
    table.string('color').defaultTo('#6366f1');
    table.decimal('target_amount', 12, 2).notNullable();
    table.decimal('current_amount', 12, 2).defaultTo(0);
    table.date('target_date').nullable();
    table.integer('priority').defaultTo(1); // 1=high, 2=medium, 3=low
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('savings_categories');
};
