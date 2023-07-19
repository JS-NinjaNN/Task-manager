// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses', preValidation: app.authenticate }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
      return reply;
    })
    .get('/statuses/:id/edit', { name: 'editStatus', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);
      reply.render('statuses/edit', { status });
      return reply;
    })
    .post('/statuses', { preValidation: app.authenticate }, async (req, reply) => {
      const status = new app.objection.models.status();
      const { data } = req.body;
      status.$set(data);

      try {
        const validStatus = await app.objection.models.status.fromJson(data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: errors.data ?? [] });
      }

      return reply;
    })
    .patch('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await status.$query().patch(validStatus);
        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        status.$set(req.body.status);
        reply.render('statuses/edit', { status, errors: errors.data ?? [] });
      }

      return reply;
    })
    .delete('/statuses/:id', { name: 'deleteStatus', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);
      const statusTasks = await status.$relatedQuery('tasks');

      if (statusTasks.length) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        return reply.redirect(app.reverse('statuses'));
      }
      try {
        await app.objection.models.status.query().deleteById(id);
        req.flash('info', i18next.t('flash.statuses.delete.success'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
      }

      reply.redirect(app.reverse('statuses'));
      return reply;
    });
};
