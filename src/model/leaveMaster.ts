import mongoose, { Schema } from 'mongoose';
import { LeaveStatus, TLeaveMastersAttributes } from '../types/leaveMaster';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import { z } from 'zod';

const LeaveMasterSchema = new Schema<TLeaveMastersAttributes>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    leaveManagementId: { type: Schema.Types.ObjectId, ref: 'leave_managements', required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.Pending,
    },
    appliedDate: { type: Date, default: Date.now },
    proofDocumentUrl: { type: String, default: null },
    takeLeave: { type: Number, default: 0 },
    ...commonDbFields,
  },
  schemaOptions,
);

const LeaveMasters = mongoose.model<TLeaveMastersAttributes>(
  'leave_masters',
  LeaveMasterSchema,
  COLLECTIONS.LeaveMaster,
);

export default LeaveMasters;

export const schemaValidation = z.object({
  leaveManagementId: z.string(),
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
  reason: z.string().optional(),
  status: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
  appliedDate: z.coerce.date().optional(),
  proofDocumentUrl: z
    .string()
    .transform(val => (val.trim() === '' ? undefined : val))
    .refine(val => !val || z.string().url().safeParse(val).success, {
      message: 'Invalid URL',
    })
    .optional(),
});
