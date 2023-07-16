// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
      return reply;
    })
    .get('/users/:id/edit', async (req, reply) => {
      const { id } = req.params;
      if (req.isAuthenticated()) {
        const currentUserId = req.user.id;
        if (Number(id) !== currentUserId) {
          req.flash('error', i18next.t('flash.wrongUserError'));
          reply.render('welcome/index');
        } else {
          const user = await app.objection.models.user.query().findById(id);
          reply.render('users/edit', { user });
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: errors.data ?? {} });
      }
      return reply;
    })
    .patch('/users/:id', async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);

      try {
        await user.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.code(422);
        user.$set(req.body.user);
        reply.render('users/edit', { user, errors: errors.data ?? {} });
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => {
      const { id } = req.params;
      if (req.isAuthenticated()) {
        const currentUserId = req.user.id;
        const relatedTasks = await app.objection.models.task.query().where('executorId', id).orWhere('creatorId', id);
        if (currentUserId !== Number(id)) {
          req.flash('error', i18next.t('flash.wrongUserError'));
          reply.render('welcome/index');
        } else if (relatedTasks.length > 0) {
          req.flash('error', i18next.t('flash.authError'));
          reply.render('welcome/index');
        } else {
          await app.objection.models.user.query().deleteById(id);
          req.logOut();
          reply.redirect(app.reverse('root'));
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }

      return reply;
    });
};
