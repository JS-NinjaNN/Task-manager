import fastify from 'fastify';
import init from '../server/plugin.js';
import { prepareDataFaker, makeLogin } from './helpers/index.js';

describe('Test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  let mockData;
  let cookie;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
    await knex.migrate.latest();
    mockData = await prepareDataFaker(app);
    cookie = await makeLogin(app, mockData.users.existing.executor);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('newStatus', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('createStatus', async () => {
    const params = mockData.statuses.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: params,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ name: params.name });
    expect(status).toMatchObject(params);
  });

  it('updateStatus', async () => {
    const modifiedStatus = 'Avada-kedavra';
    const params = mockData.statuses.existing.update;

    const status = await models.status.query().findOne({ name: params.name });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateStatus', { id: status.id }),
      payload: {
        data: {
          name: modifiedStatus,
        },
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);

    const refetchedStatus = await status.$query();
    expect(refetchedStatus.name).toEqual(modifiedStatus);
  });

  it('deleteStatus', async () => {
    const params = mockData.statuses.existing.delete;
    const status = await models.status.query().findOne({ name: params.name });
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteStatus', { id: status.id }),
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    const deletedStatus = await models.status.query().findById(status.id);
    expect(deletedStatus).toBeUndefined();
  });

  afterAll(async () => {
    // await knex('users').truncate();
    // await knex('statuses').truncate();
    await app.close();
  });
});
