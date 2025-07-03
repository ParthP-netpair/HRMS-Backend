import mongoose, { Document } from 'mongoose';

export type TLeaveManagementAttributes = Document & {
  leaveTypeId: mongoose.Types.ObjectId;
  name: string;
  count: number;
  carryForward: boolean;
  encashable: boolean;
  requiresProof: boolean;
  remarks?: string;
  // Common DB Fields
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  deletedBy?: mongoose.Types.ObjectId;
  deletedAt?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
};
