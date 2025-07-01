export interface DepartmentType {
  _id: string;
  key: string;
  name: string;
  description: string;
}

export const staticDepartments: DepartmentType[] = [
  {
    _id: '64e0d5a1c5a8e4b3c8d1b201',
    key: 'HR',
    name: 'Human Resources',
    description: 'Handles recruitment, onboarding, and employee relations.',
  },
  {
    _id: '64e0d5a1c5a8e4b3c8d1b202',
    key: 'ENG',
    name: 'IT Engineering',
    description: 'Responsible for product development and maintenance.',
  },
  {
    _id: '64e0d5a1c5a8e4b3c8d1b203',
    key: 'MKT',
    name: 'Marketing',
    description: 'Focuses on brand promotion and lead generation.',
  },
  {
    _id: '64e0d5a1c5a8e4b3c8d1b204',
    key: 'SALES',
    name: 'Sales',
    description: 'Handles customer acquisition and revenue growth.',
  },
  {
    _id: '64e0d5a1c5a8e4b3c8d1b205',
    key: 'FIN',
    name: 'Finance',
    description: 'Manages budgeting, forecasting, and accounting.',
  },
  {
    _id: '64e0d5a1c5a8e4b3c8d1b206',
    key: 'ADMIN',
    name: 'Administrative',
    description: 'Oversees office operations, facilities, and general support tasks.',
  },
];
