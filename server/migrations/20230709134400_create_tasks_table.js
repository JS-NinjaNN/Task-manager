/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = (knex) => (
    knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().defaultTo('');
        table.string('description').notNullable().defaultTo('');
        table.integer('status_id').notNullable().unsigned().references('id').inTable('statuses');
        table.integer('creator_id').notNullable().unsigned().references('id').inTable('users');
        table.integer('executor_id').unsigned().references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
);

export const down = (knex) => knex.schema.dropTable('tasks');