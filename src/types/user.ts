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
