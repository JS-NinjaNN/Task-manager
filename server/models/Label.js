import BaseModel from './BaseModel.js';

import Task from './Task.js';

class Label extends BaseModel {
  static get tableName() {
    return 'labels';
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'tasksLabels.labelId',
            to: 'tasksLabels.taskId',
          },
          to: 'tasks.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }
}

export default Label;
