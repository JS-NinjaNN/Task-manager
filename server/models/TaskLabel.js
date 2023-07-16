import BaseModel from './BaseModel.js';
import Task from './Task.js';
import Label from './Label.js';

class TaskLabel extends BaseModel {
  static get tableName() {
    return 'tasksLabels';
  }

  static get relationMappings() {
    return {
      task: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: 'tasksLabels.taskId',
          to: 'tasks.id',
        },
      },
      label: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Label,
        join: {
          from: 'tasksLabels.labelId',
          to: 'labels.id',
        },
      },
    };
  }
}

export default TaskLabel;
