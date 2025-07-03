import mongoose, { Schema, model } from 'mongoose';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import { TOtpAttributes } from '../types/otp';

const OtpSchema = new Schema<TOtpAttributes>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    email: { type: String },
    contactNo: { type: String },
    otp: { type: String },
    expiresAt: { type: Date, required: true },
    ...commonDbFields,
  },
  schemaOptions,
);

const Otp = mongoose.model<TOtpAttributes>('Otps', OtpSchema, COLLECTIONS.Otp);

export default Otp;
