import mongoose from 'mongoose';

// Enum for device types
export enum DeviceType {
  MOBILE = 'Mobile',
  WEB = 'Web',
}

// Type for the user
export type DeviceAttributes = {
  userId: mongoose.Types.ObjectId;
  role: string;
  status: boolean;
  token: string;
  notificationToken: string;
  deviceType: DeviceType;
};
