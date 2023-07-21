// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { prepareDataFaker, makeLogin } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let mockData;
  let cookie;

  beforeAll(async () => {
    // @ts-ignore
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    mockData = await prepareDataFaker(app);
    cookie = await makeLogin(app, mockData.users.existing.executor);
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
    const params = mockData.users.new;
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

  it('editUserPage', async () => {
    const { email } = mockData.users.existing.executor;
    const { id } = await models.user.query().findOne({ email });
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('updateWrongUser', async () => {
    const { email, password } = mockData.users.existing.creator;
    const user = await models.user.query().findOne({ email });

    const modifiedData = {
      firstName: 'Fedor',
      email: 'mma@gmailcom',
      lastName: 'Emelianinko',
      password,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateUser', { id: user.id }),
      payload: {
        data: modifiedData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(403);
  });

  it('updateUser', async () => {
    const { email, password } = mockData.users.existing.executor;
    const user = await models.user.query().findOne({ email });

    const modifiedData = {
      firstName: 'Fedor',
      email: 'mma@gmailcom',
      lastName: 'Emelianinko',
      password,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateUser', { id: user.id }),
      payload: {
        data: modifiedData,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const refetchedUser = await user.$query();

    expect(refetchedUser.firstName).toEqual(modifiedData.firstName);
    expect(refetchedUser.lastName).toEqual(modifiedData.lastName);
    expect(refetchedUser.email).toEqual(modifiedData.email);
  });

  it('deleteWrongUser', async () => {
    const { email } = mockData.users.existing.forDelete;
    const user = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id: user.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(403);
  });

  it('deleteUser', async () => {
    const { email } = mockData.users.existing.forDelete;
    const user = await models.user.query().findOne({ email });
    const deleteUserCookie = await makeLogin(app, mockData.users.existing.forDelete);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id: user.id }),
      cookies: deleteUserCookie,
    });

    expect(response.statusCode).toBe(302);
    const refetchedUser = await user.$query();
    expect(refetchedUser).toBeUndefined();
  });

  afterEach(async () => {
    await knex('users').truncate();
    await knex('statuses').truncate();
    await knex('tasks').truncate();
    await knex('labels').truncate();
    await knex('tasks_labels').truncate();
  });

  afterAll(async () => {
    await app.close();
  });
});
