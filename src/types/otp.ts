import mongoose from 'mongoose';

export interface TOtpAttributes {
  userId: mongoose.Types.ObjectId;
  email: string;
  contactNo: string;
  otp: string;
  expiresAt: Date;
}
