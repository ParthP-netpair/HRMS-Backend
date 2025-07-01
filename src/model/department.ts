import mongoose, { Schema, Document } from 'mongoose';
import { commonDbFields } from '../utils/constants';

export interface IDepartment extends Document {
  key: string;
  name: string;
  description: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    ...commonDbFields,
  },
  { timestamps: true },
);

const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;
