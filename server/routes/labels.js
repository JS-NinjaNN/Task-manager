// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      if (req.isAuthenticated()) {
        const labels = await app.objection.models.label.query();
        reply.render('labels/index', { labels });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, async (req, reply) => {
      if (req.isAuthenticated()) {
        const label = new app.objection.models.label();
        reply.render('labels/new', { label });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/labels/:id/edit', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const label = await app.objection.models.label.query().findById(id);
        reply.render('labels/edit', { label });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .post('/labels', async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: errors.data ?? {} });
      }
      return reply;
    })
    .patch('/labels/:id', async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id);

      try {
        await label.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.labels.edit.success'));
        reply.redirect(app.reverse('labels'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.code(422);
        label.$set(req.body.data);
        reply.render('labels/edit', { label, errors: errors.data ?? {} });
      }
      return reply;
    })
    .delete('/labels/:id', async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id).withGraphFetched('tasks');

      if (label.tasks.length > 0) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      await app.objection.models.label.query().deleteById(id);

      req.flash('info', i18next.t('flash.labels.delete.success'));
      reply.redirect(app.reverse('root'));
      return reply;
    });
};
