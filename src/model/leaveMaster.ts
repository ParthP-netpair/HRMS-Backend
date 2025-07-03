import mongoose, { Schema } from 'mongoose';
import { LeaveStatus, TLeaveMastersAttributes } from '../types/leaveMaster';
import { COLLECTIONS } from '../utils/constants';
import { z } from 'zod';

const LeaveMasterSchema = new Schema<TLeaveMastersAttributes>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    leaveMangementId: { type: Schema.Types.ObjectId, ref: 'leave_managments', required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.Pending,
    },
    appliedDate: { type: Date, default: null },
    proofDocumentUrl: { type: String },
  },
  { timestamps: true },
);

const LeaveMasters = mongoose.model<TLeaveMastersAttributes>(
  'leave_masters',
  LeaveMasterSchema,
  COLLECTIONS.LeaveMaster,
);

export default LeaveMasters;

export const schemaValidation = z.object({
  userId: z.string(),
  leaveManagementId: z.string(),
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
  reason: z.string().optional(),
  status: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
  appliedDate: z.coerce.date().optional(),
  proofDocumentUrl: z.string().url().optional(),
});
