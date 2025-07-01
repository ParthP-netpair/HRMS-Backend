import mongoose, { SchemaOptions } from 'mongoose';

export enum COLLECTIONS {
  User = 'user',
  Otp = 'otp',
  Device = 'device',
  Designation = 'designation',
}

export const commonDbFields = {
  createdBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  deletedBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  deletedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
};

export const schemaOptions: SchemaOptions = { timestamps: true, toJSON: { versionKey: false } };
