import { Schema, model } from 'mongoose';
import { EUserRole, TUserAttributes } from '../types/user';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';
import z from 'zod';

const UserSchema = new Schema<TUserAttributes>(
  {
    firstName: String,
    lastName: String,
    contactNo: String,
    email: { type: String, set: (v: string) => v.toLowerCase() },
    profilePhoto: String,
    password: String,
    role: {
      type: String,
      enum: Object.values(EUserRole),
      default: EUserRole.Admin,
    },
    lastLoginAt: {
      type: Date,
    },
    passwordExpireAt: {
      type: Date,
    },
    resetPasswordExpireAt: {
      type: Date,
    },
    resetPasswordToken: String,
    ...commonDbFields,
  },
  schemaOptions,
);

const User = model<TUserAttributes>('User', UserSchema, COLLECTIONS.User);
export default User;

export const schemaValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  contactNo: z.string(),
  email: z.string(),
  profilePhoto: z.string().optional(),
  password: z.string(),
  role: z.nativeEnum(EUserRole),
});
