/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = (knex) => (
    knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().defaultTo('');
        table.string('description').notNullable().defaultTo('');
        table.integer('statusId').notNullable().unsigned().references('id').inTable('statuses');
        table.integer('creatorId').notNullable().unsigned().references('id').inTable('users');
        table.integer('executorId').unsigned().references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
);

export const down = (knex) => knex.schema.dropTable('tasks');