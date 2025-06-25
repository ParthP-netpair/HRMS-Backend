import { isValidObjectId } from 'mongoose';
import responseWrapper from './responseWrapper';
import { COMMON_MESSAGE } from '../utils/messages.enum';

/**
 *
 * @param id Array of string to check for ObjectId
 * @returns boolean
 * @description Returns true if every item of array is object id and false if one of them isn't.
 */
export default function isObjectId(id: string[]) {
  const c = id.every(x => isValidObjectId(x));
  if (!c) return responseWrapper(false, 'Mongoose_id_validation', 400);
}
