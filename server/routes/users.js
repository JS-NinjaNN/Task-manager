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
    .get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const currentUserId = req.user.id;

      if (Number(id) !== currentUserId) {
        req.flash('error', i18next.t('flash.users.edit.wrongUser'));
        return reply.redirect(app.reverse('users'));
      }

      const user = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user });

      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      const { data } = req.body;
      user.$set(data);

      try {
        const validUser = await app.objection.models.user.fromJson(data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: errors.data ?? {} });
      }
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { data } = req.body;
      const user = await app.objection.models.user.query().findById(id);
      const currentUserId = req.user.id;

      if (Number(id) !== currentUserId) {
        req.flash('error', i18next.t('flash.users.edit.wrongUser'));
        return reply.redirect(app.reverse('users'));
      }

      try {
        const validUser = await app.objection.models.user.fromJson(data);
        await user.$query().patch(validUser);
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
      } catch (errors) {
        console.log('LASKDKLASDKLASKDKASL', errors)
        req.flash('error', i18next.t('flash.users.edit.error'));
        user.$set(data);
        reply.render('users/edit', { user, errors: errors.data ?? {} });
      }

      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const currentUserId = req.user.id;
      const relatedTasks = await app.objection.models.task.query().where('executorId', id).orWhere('creatorId', id);

      if (currentUserId !== Number(id)) {
        req.flash('error', i18next.t('flash.users.delete.wrongUser'));
        return reply.redirect(app.reverse('users'));
      }

      if (relatedTasks.length) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        return reply.redirect(app.reverse('users'));
      }

      try {
        await app.objection.models.user.query().deleteById(id);
        req.logOut();
        req.flash('info', i18next.t('flash.users.delete.success'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.users.delete.error'));
      }
      return reply.redirect(app.reverse('users'));
    });
};
