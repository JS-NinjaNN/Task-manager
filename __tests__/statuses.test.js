// @ts-check

import _ from 'lodash';
import fastify from 'fastify';
import init from '../server/plugin.js';
import {
  createRandomUser,
  createRandomStatusData,
  getRandomStatuses,
  prepareData,
} from './helpers/index.js';

import encrypt from '../server/lib/secure.cjs';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  const statuses = getRandomStatuses();
  const users = [];
  const preparedUsers = [];

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    for (let i = 0; i < 10; i += 1) {
      const user = createRandomUser();
      const preparedUser = {
        ..._.omit(user, 'password'),
        passwordDigest: encrypt(user.password),
      };
      users.push(user);
      preparedUsers.push(preparedUser);
    }

    await knex.migrate.latest();
    await prepareData(app, { statuses, users: preparedUsers });
  });

  // beforeEach(async () => {
  //   await knex.migrate.latest();
  //   await prepareData(app, { statuses });
  // });

  // afterEach(async () => {
  //   await knex('statuses').truncate();
  // });

  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const signInData = {
      email: users[0].email,
      password: users[0].password,
    };

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: signInData,
      },
    });

    expect(responseSignIn.statusCode).toBe(302);

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const newStatus = createRandomStatusData();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: newStatus,
      },
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ name: newStatus.name });
    expect(status).toMatchObject(newStatus);
  });

  it('edit', async () => {
    const signInData = {
      email: users[0].email,
      password: users[0].password,
    };

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: signInData,
      },
    });

    expect(responseSignIn.statusCode).toBe(302);

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const currentStatus = await models.status.query().findOne({ name: statuses[0].name });
    const editedStatus = {
      ...currentStatus,
      name: 'editedName',
    };
    const response = await app.inject({
      method: 'PATCH',
      url: `/statuses/${currentStatus.id}`,
      payload: {
        data: editedStatus,
      },
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ id: currentStatus.id });
    expect(status).toMatchObject(editedStatus);
  });

  it('delete', async () => {
    const signInData = {
      email: users[0].email,
      password: users[0].password,
    };

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: signInData,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const currentStatus = await models.status.query().findOne({ name: statuses[1].name });

    const response = await app.inject({
      method: 'DELETE',
      url: `/statuses/${currentStatus.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ name: currentStatus.name });
    expect(status).toBeUndefined();
  });
});
