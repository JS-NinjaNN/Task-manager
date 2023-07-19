import objectionUnique from 'objection-unique';
import BaseModel from './BaseModel.js';

const unique = objectionUnique({ fields: ['name'] });

class Label extends unique(BaseModel) {
  static get tableName() {
    return 'labels';
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Task.js',
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
