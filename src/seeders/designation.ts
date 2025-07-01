import mongoose from 'mongoose';
import getEnv from '../config/env.config';
import Role from '../model/role';
import Department from '../model/department';
import Designation from '../model/designation';

const seedDesignation = async () => {
  try {
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to DB');

    const role = await Role.findOne({ key: 'Super_Admin', isActive: true, isDeleted: false });
    if (!role) {
      throw new Error('Role with key "Super_Admin" not found');
    }

    const department = await Department.findOne({ key: 'ENG', isActive: true, isDeleted: false });
    if (!department) {
      throw new Error('Department with key "ENG" not found');
    }

    const newDesignation = {
      name: 'Super Admin',
      roleId: role._id,
      departmentId: department._id,
    };

    await Designation.create(newDesignation);

    console.log('🎉 Designation seeding complete');
  } catch (e) {
    console.error('❌ Designation seeding failed', e);
  } finally {
    await mongoose.connection.close();
  }
};

seedDesignation().catch(console.error);
