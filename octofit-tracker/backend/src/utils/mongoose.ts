import { isValidObjectId } from 'mongoose';

function isObjectId(value: unknown): value is string {
  return typeof value === 'string' && isValidObjectId(value);
}

export { isObjectId };
