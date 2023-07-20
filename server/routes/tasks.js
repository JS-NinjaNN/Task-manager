// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.user;
      const { query } = req;
      const {
        executor, status, label, isCreatorUser,
      } = query;

      const tasksQuery = app.objection.models.task.query().withGraphFetched('[status, creator, executor, labels]');

      tasksQuery.skipUndefined().modify('filterExecutor', executor || undefined);
      tasksQuery.skipUndefined().modify('filterStatus', status || undefined);
      tasksQuery.skipUndefined().modify('filterLabel', label || undefined);

      if (isCreatorUser === 'on') {
        tasksQuery.skipUndefined().modify('filterCreator', id || undefined);
      }

      const [tasks, users, statuses, labels] = await Promise.all([
        tasksQuery,
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/index', {
        tasks, statuses, users, labels, query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const [statuses, users, labels] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/new', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'taskPage', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id).withGraphFetched('[status, creator, executor, labels]');
      reply.render('tasks/specificTask', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
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
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const task = new app.objection.models.task();

      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;

      const taskData = {
        name,
        description,
        statusId,
        executorId,
        creatorId,
      };

      const labelsIds = labelsList.map((id) => ({ id: parseInt(id, 10) }));

      task.$set({ ...taskData, labels: labelsIds });

      try {
        const validTask = await app.objection.models.task.fromJson(taskData);

        await app.objection.models.task.transaction(async (trx) => {
          const newTask = {
            ...validTask,
            labels: labelsIds,
          };

          await app.objection.models.task.query(trx).insertGraph(newTask, { relate: ['labels'] });
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (errors) {
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
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { id: creatorId } = req.user;

      const task = new app.objection.models.task();

      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;

      const taskData = {
        name,
        description,
        statusId,
        executorId,
        creatorId,
      };

      const labelsIds = labelsList.map((id) => ({ id: parseInt(id, 10) }));

      task.set({ ...taskData, labels: labelsIds });

      try {
        const validTask = await app.objection.models.task.fromJson(taskData);

        await app.objection.models.task.transaction(async (trx) => {
          const updatedTask = {
            id,
            ...validTask,
            labels: labelsIds,
          };

          await app.objection.models.task.
            query(trx)
            .upsertGraph(updatedTask, { relate: true, unrelate: true });
        });

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (errors) {
        const [statuses, users, labels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);

        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', {
          task, statuses, users, labels, errors: errors.data ?? {},
        });
      }
      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { id: currentUserId } = req.user;

      const currentTask = app.objection.models.task.query().findById(id);
      if (currentUserId !== currentTask.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.wrongUser'));
        return reply.redirect(app.reverse('tasks'));
      }

      try {
        await app.objection.models.tasks.transaction(async (trx) => {
          await currentTask.$query(trx).delete();
        });

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }

      return reply;
    });
};
