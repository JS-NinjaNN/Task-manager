// @ts-check
import { Model } from 'objection';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export default BaseModel;
