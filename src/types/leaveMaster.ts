import mongoose, { Document } from 'mongoose';

export enum LeaveStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface TLeaveMastersAttributes extends Document {
  userId: mongoose.Types.ObjectId;
  leaveManagementId: mongoose.Types.ObjectId;
  fromDate: Date;
  toDate: Date;
  takeLeave: Number;
  reason?: string;
  status: LeaveStatus;
  appliedDate: Date;
  proofDocumentUrl?: string;
}
