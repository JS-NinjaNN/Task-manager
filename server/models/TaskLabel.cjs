const BaseModel = require('./BaseModel.cjs');

module.exports = class TaskLabel extends BaseModel {
  static get tableName() {
    return 'tasksLabels';
  }

  static get relationMappings() {
    return {
      task: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Task.cjs',
        join: {
          from: 'tasksLabels.taskId',
          to: 'tasks.id',
        },
      },
      label: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Label.cjs',
        join: {
          from: 'tasksLabels.labelId',
          to: 'labels.id',
        },
      },
    };
  }
};
