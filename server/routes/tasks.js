// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query().withGraphFetched('[status, creator, executor]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, (req, reply) => {
      const task = new app.objection.models.task();
      console.log('dasdasdsadasdasdasd', task);
      reply.render('tasks/new', { task });
      return reply;
    });
    // .get('/users/:id/edit', async (req, reply) => {
    //   const { id } = req.params;
    //   const currentUserId = req?.user?.id;
    //   if (!currentUserId) {
    //     req.flash('error', i18next.t('flash.authError'));
    //     reply.render('welcome/index');
    //   } else if (Number(id) !== currentUserId) {
    //     req.flash('error', i18next.t('flash.wrongUserError'));
    //     reply.render('welcome/index');
    //   } else {
    //     const user = await app.objection.models.user.query().findById(id);
    //     reply.render('users/edit', { user });
    //   }
    //   return reply;
    // })
    // .post('/users', async (req, reply) => {
    //   const user = new app.objection.models.user();
    //   user.$set(req.body.data);

    //   try {
    //     const validUser = await app.objection.models.user.fromJson(req.body.data);
    //     await app.objection.models.user.query().insert(validUser);
    //     req.flash('info', i18next.t('flash.users.create.success'));
    //     reply.redirect(app.reverse('root'));
    //   } catch ({ data }) {
    //     req.flash('error', i18next.t('flash.users.create.error'));
    //     reply.render('users/new', { user, errors: data });
    //   }
    //   return reply;
    // })
    // .patch('/users/:id', async (req, reply) => {
    //   const { id } = req.params;
    //   const user = await app.objection.models.user.query().findById(id);

    //   try {
    //     await user.$query().patch(req.body.data);
    //     req.flash('info', i18next.t('flash.users.edit.success'));
    //     reply.redirect(app.reverse('users'));
    //   } catch (e) {
    //     const { data } = e;
    //     req.flash('error', i18next.t('flash.users.edit.error'));
    //     reply.code(422);
    //     user.$set(req.body.user);
    //     reply.render('users/edit', { user, errors: data });
    //   }

    //   return reply;
    // })
    // .delete('/users/:id', async (req, reply) => {
    //   const { id } = req.params;
    //   const currentUserId = req?.user?.id;
    //   if (!currentUserId) {
    //     req.flash('error', i18next.t('flash.authError'));
    //     reply.render('welcome/index');
    //   } else if (currentUserId !== Number(id)) {
    //     req.flash('error', i18next.t('flash.wrongUserError'));
    //     reply.render('welcome/index');
    //   } else {
    //     await app.objection.models.user.query().deleteById(id);
    //     req.logOut();
    //     reply.redirect(app.reverse('root'));
    //   }
    //   return reply;
    // });
};
