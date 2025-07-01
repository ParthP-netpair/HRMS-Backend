import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import getEnv from '../config/env.config';
import Role from '../model/role';
import User from '../model/user';
import Designation from '../model/designation';

const seed = async () => {
  try {
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to DB');

    // 1️⃣ Get active Super_Admin role
    const superAdminRole = await Role.findOne({
      key: 'Super_Admin',
      isActive: true,
      isDeleted: false,
    });
    if (!superAdminRole) {
      console.error('❌ Active Super_Admin role not found');
      return;
    }
    const roleId = superAdminRole._id.toString();
    const role = superAdminRole?.key;

    // 2️⃣ Find designation based on roleId
    const designation = await Designation.findOne({
      roleId: roleId,
      isActive: true,
      isDeleted: false,
    });

    if (!designation) {
      console.error(`❌ No designation found for roleId: ${roleId}`);
      return;
    }
    const designationId = designation._id.toString();

    // 3️⃣ Admin users to seed
    const adminData = [
      {
        firstName: 'Developer',
        lastName: 'alineahealthcare',
        email: 'developer.alineahealthcare@yopmail.com',
        password: await bcrypt.hash('123456', 10),
        roleId,
        role: role,
        designationId,
        phoneCode: '+91',
        phoneNumber: '1234567890',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        forgotPasswordToken: '',
      },
      {
        firstName: 'Parth',
        lastName: 'Parmar',
        email: 'parth.parmar@alineahealthcare.in',
        password: await bcrypt.hash('123456', 10),
        roleId,
        role: role,
        designationId,
        phoneCode: '+91',
        phoneNumber: '1234567890',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        forgotPasswordToken: '',
      },
    ];

    // 4️⃣ Upsert users
    for (const data of adminData) {
      await User.findOneAndUpdate(
        { email: data.email },
        { $set: { ...data, updatedAt: new Date() } },
        { upsert: true, new: true },
      );
      console.log(`✅ Seeded admin: ${data.email}`);
    }

    console.log('🎉 Admin seeding complete');
  } catch (e) {
    console.error('❌ Seeding failed', e);
  } finally {
    await mongoose.connection.close();
  }
};

seed().catch(console.error);
