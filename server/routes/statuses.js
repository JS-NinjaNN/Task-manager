// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      if (req.isAuthenticated()) {
        const statuses = await app.objection.models.status.query();
        reply.render('statuses/index', { statuses });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, (req, reply) => {
      if (req.isAuthenticated()) {
        const status = new app.objection.models.status();
        reply.render('statuses/new', { status });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/statuses/:id/edit', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const status = await app.objection.models.status.query().findById(id);
        reply.render('statuses/edit', { status });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);
      if (req.isAuthenticated()) {
        try {
          const validStatus = await app.objection.models.status.fromJson(req.body.data);
          await app.objection.models.status.query().insert(validStatus);
          req.flash('info', i18next.t('flash.statuses.create.success'));
          reply.redirect(app.reverse('root'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.statuses.create.error'));
          reply.render('statuses/new', { status, errors: data });
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .patch('/statuses/:id', async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);

      if (req.isAuthenticated()) {
        try {
          await status.$query().patch(req.body.data);
          req.flash('info', i18next.t('flash.statuses.edit.success'));
          reply.redirect(app.reverse('statuses'));
        } catch (e) {
          const { data } = e;
          req.flash('error', i18next.t('flash.statuses.edit.error'));
          reply.code(422);
          status.$set(req.body.status);
          reply.render('statuses/edit', { status, errors: data });
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }

      return reply;
    })
    .delete('/statuses/:id', async (req, reply) => {
      const { id } = req.params;
      const relatedTasks = await app.objection.models.task.query().where('statusId', id);

      if (req.isAuthenticated()) {
        if (relatedTasks.length > 0) {
          req.flash('error', i18next.t('flash.statuses.delete.error'));
          reply.redirect(app.reverse('statuses'));
        } else {
          await app.objection.models.status.query().deleteById(id);
          req.flash('info', i18next.t('flash.statuses.delete.success'));
          reply.redirect(app.reverse('root'));
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    });
};
