import { Document } from 'mongoose';

export type TLeaveTypeAttributes = Document & {
  name: string;
  description?: string;
  carryForward: boolean | null;
  encashable: boolean | null;
  requiresProof: boolean;
};
