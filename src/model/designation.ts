import mongoose, { Schema } from 'mongoose';
import { IDesignation } from '../types/designation';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import { z } from 'zod';

const DesignationSchema = new Schema<IDesignation>(
  {
    name: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'departments', required: true },
    description: { type: String },
    ...commonDbFields,
  },

  schemaOptions,
);
const Designation = mongoose.model<IDesignation>(
  'designations',
  DesignationSchema,
  COLLECTIONS.Designation,
);
export default Designation;

export const schemaValidation = z.object({
  name: z.string(),
  roleId: z.string(),
  departmentId: z.string(),
  description: z.string(),
});
