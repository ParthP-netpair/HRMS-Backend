import mongoose, { Schema } from 'mongoose';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import { TLeaveTypeAttributes } from '../types/leaveType';

const LeaveTypeSchema = new Schema<TLeaveTypeAttributes>(
  {
    name: { type: String, required: true },
    description: { type: String },
    ...commonDbFields,
  },
  schemaOptions,
);

const LeaveType = mongoose.model<TLeaveTypeAttributes>(
  'leave_types',
  LeaveTypeSchema,
  COLLECTIONS.LeaveType,
);

export default LeaveType;
