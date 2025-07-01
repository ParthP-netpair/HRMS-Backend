import mongoose, { Document } from "mongoose";

export interface IDesignation extends Document {
 
  name: string;
  roleId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  description?: string;
 
}