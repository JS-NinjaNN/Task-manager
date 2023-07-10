// @ts-check
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Model } from 'objection';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export default BaseModel;
