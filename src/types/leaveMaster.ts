import mongoose from 'mongoose';

export enum LeaveStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface TLeaveMastersAttributes extends Document {
  userId: mongoose.Types.ObjectId;
  leaveMangementId: mongoose.Types.ObjectId;
  fromDate: Date;
  toDate: Date;
  reason?: string;
  status: LeaveStatus;
  appliedDate: Date;
  proofDocumentUrl?: string;
}
