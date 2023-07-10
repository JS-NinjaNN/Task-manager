import BaseModel from './BaseModel.js';
import Models from './index.js';

class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  static get relationMappings() {
    return {
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Models.Status,
        join: {
          from: 'statuses.id',
          to: 'tasks.statusId',
        },
      },
      creator: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Models.User,
        join: {
          from: 'users.id',
          to: 'tasks.creatorId',
        },
      },
      executor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Models.User,
        join: {
          from: 'users.id',
          to: 'tasks.executorId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }
}

export default Task;
