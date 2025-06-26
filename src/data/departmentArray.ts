export const DEPARTMENTS = [
  'Networks',
  'Computer Science',
  'Math',
  'Statistic',
  'Information Techenology',
] as const;

export const SEMESTER = ['1st', '2nd'] as const;

export const FILE_BELONG_TO = ['1st', '2nd', '3rd', '4th', '5th'] as const;

export const departments = [
  { id: 'cs', name: 'Computer Science', icon: '💻', color: 'bg-blue-500' },
  {
    id: 'mt',
    name: 'Math',
    icon: '⚡',
    color: 'bg-yellow-500',
  },
  {
    id: 'nw',
    name: 'Networks',
    icon: '🌐',
    color: 'bg-green-500',
  },
  { id: 'ce', name: 'Statistic', icon: '🔢', color: 'bg-orange-500' },
  {
    id: 'it',
    name: 'Information Technology',
    icon: 'ℹ️',
    color: 'bg-purple-500',
  },
];
