import { Schema, model } from 'mongoose';
import z from 'zod';
import { EUserRole, TUserAttributes } from '../types/user';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';

const UserSchema = new Schema<TUserAttributes>(
  {
    // Personal Info
    firstName: { type: String },
    lastName: { type: String },
    contactNo: { type: String, default: null },
    email: { type: String, required: true, set: (v: string) => v.toLowerCase() },
    gender: { type: String, default: null },
    dob: { type: Date },
    profilePhoto: { type: String, default: null },
    legalId: { type: String, default: null },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    designationId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },

    // Financial Info
    panNumber: { type: String, default: null },
    bankAccountNumber: { type: String, default: null },
    ifscCode: { type: String, default: null },
    uanNumber: { type: String, default: null },
    ctc: { type: Number, default: 0 },
    netSalary: { type: Number, default: 0 },

    // Document Info
    aadharNumber: { type: String, default: null },
    resumeUrl: { type: String, default: null },
    offerLetterUrl: { type: String, default: null },
    certificateUrl: { type: String, default: null },
    photoUrl: { type: String, default: null },

    // Security Info
    password: { type: String, required: true },
    lastLoginAt: { type: Date, default: null },
    passwordExpireAt: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpireAt: { type: Date, default: null },

    // Role
    role: {
      type: String,
    },

    // Common Fields
    ...commonDbFields,
  },
  schemaOptions,
);

const User = model<TUserAttributes>('User', UserSchema, COLLECTIONS.User);
export default User;

export const schemaValidation = z.object({
  // Personal Info
  firstName: z.string(),
  lastName: z.string(),
  contactNo: z.string(),
  email: z.string().email(),
  gender: z.string().optional(),
  dob: z.coerce.date(),
  profilePhoto: z.string().optional(),
  legalId: z.string().optional(),
  roleId: z.string(),
  designationId: z.string(),

  // Financial Info
  panNumber: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  uanNumber: z.string().optional(),
  ctc: z.number().optional(),
  netSalary: z.number().optional(),

  // Document Info
  aadharNumber: z.string().optional(),
  resumeUrl: z.string().url().optional(),
  offerLetterUrl: z.string().url().optional(),
  certificateUrl: z.string().url().optional(),
  photoUrl: z.string().url().optional(),

  // Security
  password: z.string(),
  role: z.string().optional(),
});
