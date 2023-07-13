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
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id).withGraphFetched('[status, creator, executor]');
      reply.render('tasks/specificTask', { task });
      return reply;
    })
    .get('/tasks/:id/edit', async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const [statuses, users] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
      ]);
      reply.render('tasks/edit', { task, statuses, users });
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
      } catch (errors) {
        const [statuses, users] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, users, errors: errors.data ?? {},
        });
      }
      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      const { id } = req.params;
      const task = new app.objection.models.task();
      task.$set(req.body.data);

      try {
        const taskData = req.body.data;
        const validTask = await app.objection.models.task.fromJson({
          ...taskData,
          statusId: Number(taskData.statusId),
          executorId: Number(taskData.executorId),
        });

        await app.objection.models.task.query().findById(id).patch(validTask);
        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('root'));
      } catch (errors) {
        console.log('SLDLADLKSAKLDSAKLDKLSADKLSAKLDSAKLD', errors);
        const [statuses, users] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/new', {
          task, statuses, users, errors: errors.data ?? {},
        });
      }
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
