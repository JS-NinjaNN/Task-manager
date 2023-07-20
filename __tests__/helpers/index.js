// @ts-check

import { URL } from 'url';
import fs from 'fs';
import path from 'path';

import {
  generateUsers, generateStatuses, generateTasks, generateLabels, generateTasksLabels,
} from './faker.js';

// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const getFixturePath = (filename) => path.join('..', '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8').trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

const getTestData = () => getFixtureData('testData.json');

const prepareData = async (app) => {
  const { knex } = app.objection;

  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(getFixtureData('users.json'));
};

const prepareDataFaker = async (app) => {
  const { knex } = app.objection;
  const userMocks = generateUsers();
  const statusesMocks = generateStatuses();
  const labelsMocks = generateLabels();
  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(userMocks.seeds);
  await knex('statuses').insert(statusesMocks.seeds);
  await knex('labels').insert(labelsMocks.seeds);

  const users = await knex('users');
  const statuses = await knex('statuses');
  const tasksMocks = generateTasks(users, statuses);

  await knex('tasks').insert(tasksMocks.seeds);

  const tasks = await knex('tasks');
  const labels = await knex('labels');
  const tasksLabelsMocks = generateTasksLabels(tasks, labels);

  await knex('tasks_labels').insert(tasksLabelsMocks.seeds);
  return {
    users: userMocks,
    statuses: statusesMocks,
    tasks: tasksMocks,
    labels: labelsMocks,
  };
};

const makeLogin = async (app, credentials) => {
  const response = await app.inject({
    method: 'POST',
    url: app.reverse('session'),
    payload: {
      data: credentials,
    },
  });

  const [sessionCookie] = response.cookies;
  const { name, value } = sessionCookie;
  const cookie = { [name]: value };

  return cookie;
};

export {
  getTestData, prepareData, prepareDataFaker, makeLogin,
};
