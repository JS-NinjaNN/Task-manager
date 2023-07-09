/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = (knex) => (
    knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('password_digest');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
);

export const down = (knex) => knex.schema.dropTable('users');