/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = (knex) => (
  knex.schema.createTable('tasks_labels', (table) => {
    table.increments('id').primary()
    table.integer('task_id').unsigned().references('id').inTable('tasks');
    table.integer('label_id').unsigned().references('id').inTable('labels');
    table.unique(['task_id', 'label_id']);
  })
);

export const down = (knex) => knex.schema.dropTable('tasks_labels');