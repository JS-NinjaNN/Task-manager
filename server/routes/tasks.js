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
        const [statuses, users, labels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);
        reply.render('tasks/new', {
          task, statuses, users, labels,
        });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .get('/tasks/:id', async (req, reply) => {
      if (req.isAuthenticated()) {
        const { id } = req.params;
        const task = await app.objection.models.task.query().findById(id).withGraphFetched('[status, creator, executor, labels]');
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
        const [statuses, users, labels, selectedLabels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
          task.$relatedQuery('labels').select('labels.id'),
        ]);

        const selectedLabelsIds = selectedLabels.map((label) => label.id);
        reply.render('tasks/edit', {
          task, statuses, users, labels, selectedLabelsIds,
        });
      } else {
        req.flash('error', i18next.t('flash.authError'));
        reply.render('welcome/index');
      }
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (req.isAuthenticated()) {
        const task = new app.objection.models.task();
        const taskData = req.body.data;
        task.$set(taskData);

        try {
          const currentUserId = req.user.id;
          const validTask = await app.objection.models.task.fromJson({
            ...taskData,
            statusId: Number(taskData.statusId),
            creatorId: Number(currentUserId),
            executorId: Number(taskData.executorId),
          });

          await app.objection.models.task.transaction(async (trx) => {
            const insertedTask = await app.objection.models.task.query(trx).insert(validTask);
            const taskId = insertedTask.id;
            const labelsIds = taskData.labels;

            const insertPromises = labelsIds.map((labelId) => (
              app.objection.models.taskLabel.query(trx).insert({
                taskId,
                labelId,
              })));
            await Promise.all(insertPromises);
          });

          req.flash('info', i18next.t('flash.tasks.create.success'));
          reply.redirect(app.reverse('root'));
        } catch (errors) {
          console.log('DLSKLSALKDSKALDKLSADKLSAKLDASKL', errors);
          const [statuses, users, labels] = await Promise.all([
            app.objection.models.status.query(),
            app.objection.models.user.query(),
            app.objection.models.label.query(),
          ]);
          req.flash('error', i18next.t('flash.tasks.create.error'));
          reply.render('tasks/new', {
            task, statuses, users, labels, errors: errors.data ?? {},
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
        const taskData = req.body.data;
        task.$set(taskData);

        try {
          const labelIds = taskData.labels || [];

          const taskLabels = await task.$relatedQuery('labels');
          const currentLabelsIds = taskLabels.map((label) => label.id);

          const labelsToAdd = labelIds.filter((labelId) => !currentLabelsIds.includes(labelId));
          const labelsToRemove = currentLabelsIds.filter((labelId) => !labelIds.includes(labelId));

          await app.objection.models.task.transaction(async (trx) => {
            await app.objection.models.taskLabel.query(trx)
              .delete()
              .where('taskId', id)
              .whereIn('labelId', labelsToRemove);

            labelsToAdd.forEach(async (labelId) => {
              await app.objection.models.taskLabel.query(trx).insert({
                taskId: id,
                labelId,
              });
            });

            const validTask = await app.objection.models.task.fromJson({
              ...taskData,
              statusId: Number(taskData.statusId),
              creatorId: task.creatorId,
              executorId: Number(taskData.executorId),
            });

            await app.objection.models.task.query(trx).findById(id).patch(validTask);
          });

          req.flash('info', i18next.t('flash.tasks.edit.success'));
          reply.redirect(app.reverse('root'));
        } catch (errors) {
          console.log('LKSDLKADKLSALKDSKALDKLSALKDSAKLD', errors);
          const [statuses, users, labels, selectedLabels] = await Promise.all([
            app.objection.models.status.query(),
            app.objection.models.user.query(),
            app.objection.models.label.query(),
            task.$relatedQuery('labels').select('labels.id'),
          ]);

          const selectedLabelsIds = selectedLabels.map((label) => label.id);

          req.flash('error', i18next.t('flash.tasks.edit.error'));
          reply.render('tasks/edit', {
            task, statuses, users, labels, selectedLabelsIds, errors: errors.data ?? {},
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
        const currentUserId = req.user.id;
        const currentTask = app.objection.models.task.query().findById(id);
        if (currentUserId === currentTask.creatorId) {
          await app.objection.models.task.transaction(async (trx) => {
            await currentTask.$relatedQuery('labels', trx).unrelate();
            await app.objection.models.task.query(trx).deleteById(id);
          });

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
