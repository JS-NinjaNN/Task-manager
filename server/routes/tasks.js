// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      if (req.isAuthenticated()) {
        const tasks = await app.objection.models.task.query().withGraphFetched('[status, creator, executor]');
        reply.render('tasks/index', { tasks });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (req.isAuthenticated()) {
        const task = new app.objection.models.task();
        const [statuses, users] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
        ]);
        reply.render('tasks/new', { task, statuses, users });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/tasks/:id', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const task = await app.objection.models.task.query().findById(id).withGraphFetched('[status, creator, executor]');
        reply.render('tasks/specificTask', { task });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/tasks/:id/edit', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const task = await app.objection.models.task.query().findById(id);
        const [statuses, users] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
        ]);
        reply.render('tasks/edit', { task, statuses, users });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (req.isAuthenticated()) {
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
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const task = await app.objection.models.task.query().findById(id);
        task.$set(req.body.data);

        try {
          const taskData = req.body.data;
          const validTask = await app.objection.models.task.fromJson({
            ...taskData,
            statusId: Number(taskData.statusId),
            creatorId: task.creatorId,
            executorId: Number(taskData.executorId),
          });

          await app.objection.models.task.query().findById(id).patch(validTask);
          req.flash('info', i18next.t('flash.tasks.edit.success'));
          reply.redirect(app.reverse('root'));
        } catch (errors) {
          const [statuses, users] = await Promise.all([
            app.objection.models.status.query(),
            app.objection.models.user.query(),
          ]);
          req.flash('error', i18next.t('flash.tasks.edit.error'));
          reply.render('tasks/edit', {
            task, statuses, users, errors: errors.data ?? {},
          });
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .delete('/tasks/:id', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const currentUserId = req?.user?.id;
        const currentTask = app.objection.models.task.query().findById(id);
        if (currentUserId === currentTask.creatorId) {
          await app.objection.models.task.query().deleteById(id);
          req.flash('success', i18next.t('flash.tasks.delete.success'));
          reply.redirect(app.reverse('root'));
        } else {
          req.flash('error', i18next.t('flash.tasks.delete.error'));
          reply.render('welcome/index');
        }
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    });
};
