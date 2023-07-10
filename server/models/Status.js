// @ts-check

import objectionUnique from 'objection-unique';

import BaseModel from './BaseModel.js';
import Models from './index.js';

const unique = objectionUnique({ fields: ['name'] });

class Status extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Models.Task,
        join: {
          from: 'status.id',
          to: 'tasks.statusId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }
}

export default Status;
