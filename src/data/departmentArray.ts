export const DEPARTMENTS: string[] = [
  'Networks',
  'Computer Science',
  'Math',
  'Statisitc',
  'Information Techenology',
];

export const SEMESTER = ['1st', '2nd'];

export const FILE_BELONG_TO = ['1st', '2nd', '3rd', '4th', '5th'];

export const depShortcut: { [key: string]: string } = {
  'Information Techenology': 'IT',
  'Computer Science': 'CS',
  Networks: 'NW',
} as const;
