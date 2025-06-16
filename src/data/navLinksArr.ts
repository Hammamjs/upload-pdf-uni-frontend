export const LINKS = [
  {
    path: 'Home',
    to: '/',
    role: ['SuperAdmin', 'Admin', 'Student'],
  },
  {
    path: 'Student Result',
    to: '/student-result',
    role: ['SuperAdmin', 'Admin', 'Student'],
  },
  {
    path: 'upload PDF',
    to: '/upload',
    role: ['SuperAdmin', 'Admin'],
  },
  {
    path: 'Student Details',
    to: '/student-info',
    role: ['SuperAdmin', 'Admin', 'Student'],
  },
  {
    path: 'File Options',
    to: '/file-options',
    role: ['SuperAdmin', 'Admin'],
  },
  {
    path: 'Change Roles',
    to: '/roles',
    role: ['SuperAdmin', 'Admin'],
  },
  {
    path: 'All Subjects',
    to: '/subjects',
    role: ['SuperAdmin', 'Admin', 'Student'],
  },
  {
    path: 'Add subject',
    to: '/add-subject',
    role: ['SuperAdmin'],
  },
  {
    path: 'subject Options',
    to: '/subject-options',
    role: ['SuperAdmin'],
  },
  {
    path: 'Logout',
    to: '/login',
    role: ['SuperAdmin', 'Admin', 'Student'],
  },
];
