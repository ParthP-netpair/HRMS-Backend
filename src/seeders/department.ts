import mongoose from 'mongoose';
import getEnv from '../config/env.config';
import Department from '../model/department';
import { staticDepartments } from '../data/department';

const seedDepartments = async () => {
  try {
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to DB');

    for (const dept of staticDepartments) {
      const exists = await Department.findOne({ key: dept.key });
      if (exists) {
        console.log(`⚠️ Department already exists: ${dept.name} (${dept.key})`);
        continue;
      }

      await Department.create({
        _id: dept._id,
        key: dept.key,
        name: dept.name,
        description: dept.description,
      });

      console.log(`✅ Department added: ${dept.name}`);
    }

    console.log('🎉 Department seeding complete');
  } catch (e) {
    console.error('❌ Department seeding failed', e);
  } finally {
    await mongoose.connection.close();
  }
};

seedDepartments().catch(console.error);
