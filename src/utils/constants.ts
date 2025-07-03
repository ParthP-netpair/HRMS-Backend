import mongoose, { SchemaOptions } from 'mongoose';

export enum COLLECTIONS {
  User = 'users',
  Otp = 'otps',
  Device = 'devices',
  Designation = 'designations',
  LeaveType = 'leave_types',
  LeaveManagement = 'leave_managements',
  Departments = 'departments',
  Role = 'roles',
  LeaveMaster = 'leave_masters',
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
