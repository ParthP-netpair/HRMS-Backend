import mongoose, { Schema } from 'mongoose';
import { COLLECTIONS, commonDbFields, schemaOptions } from '../utils/constants';

import { DeviceAttributes, DeviceType } from '../types/device';

const deviceMasterSchema = new Schema<DeviceAttributes>(
  {
    userId: { type: Schema.Types.ObjectId, refPath: 'users', required: true },
    role: { type: String, required: true },
    deviceType: { type: String, enum: DeviceType, default: DeviceType.WEB },
    status: { type: Boolean, default: true },
    token: { type: String, default: null },
    notificationToken: { type: String, default: null },
    ...commonDbFields,
  },
  schemaOptions,
);

const Device = mongoose.model<DeviceAttributes>('devices', deviceMasterSchema, COLLECTIONS.Device);
export default Device;
