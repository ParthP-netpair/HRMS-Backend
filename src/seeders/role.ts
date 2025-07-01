import mongoose from 'mongoose';
import getEnv from '../config/env.config';

import Role from '../model/role';
import { staticRoles } from '../data/role';

const seedRoles = async () => {
  try {
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');

    for (const role of staticRoles) {
      const exists = await Role.findOne({ key: role.key });
      if (exists) {
        console.log(`⚠️ Role already exists: ${role.name} (${role.key})`);
        continue;
      }

      await Role.create({
        _id: role._id, // if you're using static _id
        key: role.key,
        name: role.name,
        description: role.description,
      });

      console.log(`✅ Role added: ${role.name} (${role.key})`);
    }

    console.log('🎉 Role seeding completed');
  } catch (err) {
    console.error('❌ Role seeding failed:', err);
  } finally {
    await mongoose.connection.close();
  }
};

seedRoles().catch(console.error);
