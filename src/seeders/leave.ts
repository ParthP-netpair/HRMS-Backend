import mongoose from 'mongoose';
import getEnv from '../config/env.config';
import LeaveType from '../model/leaveType';
import { leaveTypeData } from '../data/leaveType';

const seedLeaveType = async () => {
  try {
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to DB');

    await LeaveType.deleteMany({});
    await LeaveType.insertMany(leaveTypeData);

    console.log('🎉 leave type seeding complete');
  } catch (e) {
    console.error('❌ leave type seeding failed', e);
  } finally {
    await mongoose.connection.close();
  }
};

seedLeaveType().catch(console.error);
