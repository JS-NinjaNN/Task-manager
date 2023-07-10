// @ts-check

import objectionUnique from 'objection-unique';

import BaseModel from './BaseModel.js';
import encrypt from '../lib/secure.cjs';
import Models from './index.js';

const unique = objectionUnique({ fields: ['email'] });

class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      createdTasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Models.Task,
        join: {
          from: 'users.id',
          to: 'tasks.creatorId',
        },
      },
      executedTasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Models.Task,
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
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        email: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }
}

export default User;
