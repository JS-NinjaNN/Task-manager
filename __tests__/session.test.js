// @ts-check

import _ from 'lodash';
import fastify from 'fastify';
import init from '../server/plugin.js';
import { prepareData, createRandomUser } from './helpers/index.js';

import encrypt from '../server/lib/secure.cjs';

describe('test session', () => {
  let app;
  let knex;
  const users = [];
  const preparedUsers = [];

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;

    for (let i = 0; i < 10; i += 1) {
      const user = createRandomUser();
      const preparedUser = {
        ..._.omit(user, 'password'),
        passwordDigest: encrypt(user.password),
      };
      users.push(user);
      preparedUsers.push(preparedUser);
    }
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app, { users: preparedUsers });
  });

  afterEach(async () => {
    await knex('users').truncate();
  });

  afterAll(async () => {
    // await knex.migrate.rollback();
    await app.close();
  });

  it('test sign in / sign out', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newSession'),
    });

    expect(response.statusCode).toBe(200);

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
    // после успешной аутентификации получаем куки из ответа,
    // они понадобятся для выполнения запросов на маршруты требующие
    // предварительную аутентификацию
    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const responseSignOut = await app.inject({
      method: 'DELETE',
      url: app.reverse('session'),
      // используем полученные ранее куки
      cookies: cookie,
    });

    expect(responseSignOut.statusCode).toBe(302);
  });
});
