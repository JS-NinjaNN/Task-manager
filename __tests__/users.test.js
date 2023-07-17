// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import {
  createRandomUser,
  getRandomUsersData,
  prepareData,
} from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  // const testData = getTestData();

  const users = getRandomUsersData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app, { users });
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции

    // Иван, с segmentation fault так и не разобрался, rollback использовать не удалось.

    await knex('users').truncate();
  });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = createRandomUser();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it('edit', async () => {
    const currentUser = await models.user.query().findOne({ email: users[0].email });
    const editedUser = {
      ...currentUser,
      firstName: 'editedName',
      lastName: 'editedLastName',
      password: 'editedPassword',
    };
    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${currentUser.id}`,
      payload: {
        data: editedUser,
      },
    });

    const expected = {
      ..._.omit(editedUser, 'password'),
      passwordDigest: encrypt(editedUser.password),
    };
    expect(response.statusCode).toBe(302);
    const user = await models.user.query().findOne({ email: currentUser.email });
    expect(user).toMatchObject(expected);
  });
});
