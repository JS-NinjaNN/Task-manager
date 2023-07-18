// @ts-check

import fastify from 'fastify';
import init from '../server/plugin.js';
import {
  createRandomStatusData,
  getRandomStatuses,
  prepareData,
} from './helpers/index.js';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  const statuses = getRandomStatuses();

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
    await prepareData(app, { statuses });
  });

  afterEach(async () => {
    await knex('statuses').truncate();
  });

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
    const currentStatus = await models.status.query().findOne({ name: statuses[1].name });
    app.log.info(currentStatus);
    const response = await app.inject({
      method: 'DELETE',
      url: `/statuses/${currentStatus.id}`,
    });

    expect(response.statusCode).toBe(302);
    const status = await models.status.query().findOne({ name: currentStatus.name });
    expect(status).toBeUndefined();
  });
});
