import { Document, Model } from 'mongoose';
import { TDefaultTableFields } from './common';

export interface TUserAttributes extends TDefaultTableFields {
  firstName: string;
  lastName: string; 
  contactNo: string;
  email: string;
  profilePhoto: string;
  password: string;
  role: EUserRole;
  lastLoginAt: Date;
  passwordExpireAt: Date;
  resetPasswordToken: string;
  resetPasswordExpireAt: Date;
}

export enum EUserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Employee = 'Employee',
}
