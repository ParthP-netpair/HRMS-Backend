import mongoose, { Schema } from 'mongoose';
import { TLeaveManagementAttributes } from '../types/leaveManagement';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import { z } from 'zod';

const LeaveManagementSchema = new Schema<TLeaveManagementAttributes>(
  {
    leaveTypeId: { type: Schema.Types.ObjectId, ref: 'leave_types', required: true },
    name: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    carryForward: { type: Boolean, default: false },
    encashable: { type: Boolean, default: false },
    requiresProof: { type: Boolean, default: false },
    remarks: { type: String },
    ...commonDbFields,
  },
  schemaOptions,
);

const LeaveManagement = mongoose.model<TLeaveManagementAttributes>(
  'leave_managements',
  LeaveManagementSchema,
  COLLECTIONS.LeaveManagement,
);

export default LeaveManagement;

export const schemaValidation = z.object(
  {
  
  name: z.string(),
  leaveTypeId: z.string(),
  count: z.number(),
  carryForward: z.boolean().optional(),
  encashable: z.boolean().optional(),
  requiresProof: z.boolean().optional(),
  remarks: z.string().optional(),
});
