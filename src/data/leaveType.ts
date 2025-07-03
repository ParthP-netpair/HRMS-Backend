export interface LeaveType {
  name: string;
  description: string;
}

export const leaveTypeData: LeaveType[] = [
  {
    name: 'Casual Leave (CL)',
    description: 'For personal or urgent matters. Usually short-duration.',
  },
  {
    name: 'Sick Leave (SL)',
    description: 'For health-related issues or medical conditions.',
  },
  {
    name: 'Earned Leave (EL) / Privilege Leave (PL)',
    description: 'For vacation or long leaves. Accumulated monthly/yearly.',
  },
  {
    name: 'Loss of Pay (LOP)',
    description: 'Unpaid leave when no balance is left in other types.',
  },
  {
    name: 'Maternity Leave',
    description: 'For female employees during childbirth (e.g., 26 weeks as per Indian law).',
  },
  {
    name: 'Paternity Leave',
    description: 'For male employees during child birth (typically 7–15 days).',
  },
  {
    name: 'Marriage Leave',
    description: "Granted for employee's marriage. Often a one-time leave (e.g., 3–5 days).",
  },
  {
    name: 'Bereavement Leave',
    description: 'Leave due to death of immediate family member.',
  },
  {
    name: 'Compensatory Off (Comp Off)',
    description: 'Leave in exchange for working on weekends/public holidays.',
  },
  {
    name: 'Half-Day Leave',
    description: 'For partial-day absence. Usually part of CL/SL.',
  },
  {
    name: 'Sabbatical Leave',
    description: 'Long-term leave for higher studies, research, etc.',
  },
  {
    name: 'Study Leave',
    description: 'For employees pursuing education, usually granted conditionally.',
  },
  {
    name: 'Festival Leave',
    description: 'Optional leave for specific regional/religious festivals.',
  },
  {
    name: 'Adoption Leave',
    description: 'For adopting parents (similar to maternity/paternity leave).',
  },
];
