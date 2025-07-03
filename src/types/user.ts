import mongoose from 'mongoose';
import { TDefaultTableFields } from './common';

export interface TPersonalInfo {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  gender: string;
  dob: Date;
  profilePhoto: string;
  legalId: string;
  roleId: mongoose.Types.ObjectId;
  designationId: mongoose.Types.ObjectId;
  reportingId: mongoose.Types.ObjectId;
}

export interface TFinancialInfo {
  panNumber: string;
  bankAccountNumber: string;
  ifscCode: string;
  uanNumber: string;
  ctc: number;
  netSalary: number;
}

export interface TDocumentInfo {
  aadharNumber: string;
  resumeUrl: string;
  offerLetterUrl: string;
  certificateUrl: string;
  photoUrl: string;
}

export interface TSecurityInfo {
  password: string;
  lastLoginAt: Date;
  passwordExpireAt: Date;
  resetPasswordToken: string;
  resetPasswordExpireAt: Date;
}

export interface TUserAttributes
  extends TDefaultTableFields,
    TPersonalInfo,
    TFinancialInfo,
    TDocumentInfo,
    TSecurityInfo {
  role: EUserRole;
}

export enum EUserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Employee = 'Employee',
}

export type TUserDecodeAttributes = {
  _id: string;
  email: string;
  aadharNumber: string | null;
  bankAccountNumber: string | null;
  certificateUrl: string | null;
  contactNo: string | null;
  createdAt: string;
  ctc: number;
  deletedAt: string | null;
  designationId: string;
  firstName: string;
  gender: string | null;
  ifscCode: string | null;
  isActive: boolean;
  isDeleted: boolean;
  lastLoginAt: string;
  lastName: string;
  legalId: string | null;
  netSalary: number;
  offerLetterUrl: string | null;
  panNumber: string | null;
  passwordExpireAt: string | null;
  photoUrl: string | null;
  profilePhoto: string | null;
  resetPasswordExpireAt: string | null;
  resetPasswordToken: string | null;
  resumeUrl: string | null;
  role: string;
  roleId: string;
  uanNumber: string | null;
  updatedAt: string;
};

export type TDecodedToken = {
  user: TUserDecodeAttributes;
  iat: number;
  exp: number;
};
