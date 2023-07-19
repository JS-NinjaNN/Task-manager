// @ts-check
import { Model } from 'objection';

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export default BaseModel;
