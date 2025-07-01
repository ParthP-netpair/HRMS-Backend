import { Types } from 'mongoose';

export interface RoleType {
  _id: string;
  key: string;
  name: string;
  description: string;
}

export const staticRoles: RoleType[] = [
  {
    _id: '64e0b4e6c5a8e4b3c8d1a101',
    key: 'Super_Admin',
    name: 'Super Admin',
    description: 'Has full access to the system including user management and settings.',
  },
  {
    _id: '64e0b4e6c5a8e4b3c8d1a102',
    key: 'HR',
    name: 'Human Resources',
    description: 'Manages employee records, leaves, and onboarding processes.',
  },
  {
    _id: '64e0b4e6c5a8e4b3c8d1a103',
    key: 'Manager',
    name: 'Manager',
    description: 'Oversees team performance and project delivery.',
  },
  {
    _id: '64e0b4e6c5a8e4b3c8d1a104',
    key: 'TeamLead',
    name: 'Team Lead',
    description: 'Leads a sub-team and coordinates tasks with employees.',
  },
  {
    _id: '64e0b4e6c5a8e4b3c8d1a105',
    key: 'Employee',
    name: 'Employee',
    description: 'Regular user with access to assigned tasks and resources.',
  },
  {
    _id: '64e0b4e6c5a8e4b3c8d1a106', // New Admin role
    key: 'Admin',
    name: 'Admin',
    description: 'Has limited administrative privileges over teams and users.',
  },
];
