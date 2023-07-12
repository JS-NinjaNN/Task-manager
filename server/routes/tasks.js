// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query().withGraphFetched('[status, creator, executor]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      const task = new app.objection.models.task();
      const [statuses, users] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
      ]);
      reply.render('tasks/new', { task, statuses, users });
      return reply;
    })
    .get('/tasks/:id', async (req, reply) => {
      const task = {};
      return reply;
    })
    .get('/tasks/:id/edit', async (req, reply) => {
      const { id } = req.params;
      // const currentUserId = req?.user?.id;
      // if (!currentUserId) {
      //   req.flash('error', i18next.t('flash.authError'));
      //   reply.render('welcome/index');
      // } else if (Number(id) !== currentUserId) {
      //   req.flash('error', i18next.t('flash.wrongUserError'));
      //   reply.render('welcome/index');
      // } else {
      //   const user = await app.objection.models.user.query().findById(id);
      //   reply.render('users/edit', { user });
      // }
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      const task = new app.objection.models.task();
      task.$set(req.body.data);

      try {
        const taskData = req.body.data;
        const currentUserId = req?.user?.id;
        const validTask = await app.objection.models.task.fromJson({
          ...taskData,
          statusId: Number(taskData.statusId),
          creatorId: Number(currentUserId),
          executorId: Number(taskData.executorId),
        });
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        const [statuses, users] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, users, errors: data,
        });
      }
      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);

      // try {
      //   await user.$query().patch(req.body.data);
      //   req.flash('info', i18next.t('flash.users.edit.success'));
      //   reply.redirect(app.reverse('users'));
      // } catch (e) {
      //   const { data } = e;
      //   req.flash('error', i18next.t('flash.users.edit.error'));
      //   reply.code(422);
      //   user.$set(req.body.user);
      //   reply.render('users/edit', { user, errors: data });
      // }

      return reply;
    })
    .delete('/tasks/:id', async (req, reply) => {
      const { id } = req.params;
      // const currentUserId = req?.user?.id;
      // if (!currentUserId) {
      //   req.flash('error', i18next.t('flash.authError'));
      //   reply.render('welcome/index');
      // } else if (currentUserId !== Number(id)) {
      //   req.flash('error', i18next.t('flash.wrongUserError'));
      //   reply.render('welcome/index');
      // } else {
      //   await app.objection.models.user.query().deleteById(id);
      //   req.logOut();
      //   reply.redirect(app.reverse('root'));
      // }
      return reply;
    });
};
