import { Request } from 'express';
import { TUserAttributes } from './user';
import mongoose, { Document } from 'mongoose';

export type TJwtDecoded = {
  user: Omit<TUserAttributes, 'password' | keyof Document> & { _id: mongoose.Types.ObjectId };
};

export type TCustomExpressRequest = {
  token: TJwtDecoded;
  mongoSession: mongoose.mongo.ClientSession;
} & Request;

export type TDefaultTableFields = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
};
