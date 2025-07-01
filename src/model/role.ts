import mongoose, { Schema, Document } from 'mongoose';
import { commonDbFields } from '../utils/constants';

export interface IRole extends Document {
  key: string;
  name: string;
  description: string;
}

const RoleSchema = new Schema<IRole>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    ...commonDbFields,
  },
  { timestamps: true },
);

const Role = mongoose.model<IRole>('Role', RoleSchema);

export default Role;
