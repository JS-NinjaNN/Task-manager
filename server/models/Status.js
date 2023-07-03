// @ts-check

import objectionUnique from 'objection-unique';

import BaseModel from './BaseModel.js';

const unique = objectionUnique({ fields: ['name'] });

class Status extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
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
