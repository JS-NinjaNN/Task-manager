import BaseModel from './BaseModel.js';

class TaskLabel extends BaseModel {
  static get tableName() {
    return 'tasksLabels';
  }

  static get relationMappings() {
    return {
      task: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Task.js',
        join: {
          from: 'tasksLabels.taskId',
          to: 'tasks.id',
        },
      },
      label: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Label.js',
        join: {
          from: 'tasksLabels.labelId',
          to: 'labels.id',
        },
      },
    };
  }
}

export default TaskLabel;
