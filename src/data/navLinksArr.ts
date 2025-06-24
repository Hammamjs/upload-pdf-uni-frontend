export const navItems = [
  {
    path: 'Home',
    to: '/',
    role: ['SuperAdmin', 'Admin', 'Student'],
    icon: 'Home',
  },
  {
    path: 'Student Result',
    to: '/student-result',
    role: ['SuperAdmin', 'Admin', 'Student'],
    icon: 'GraduationCap',
  },
  {
    path: 'Upload PDF',
    to: '/upload',
    role: ['SuperAdmin', 'Admin'],
    icon: 'Upload',
  },
  {
    path: 'Student Details',
    to: '/student-info',
    role: ['SuperAdmin', 'Admin', 'Student'],
    icon: 'Users',
  },
  {
    path: 'Change Roles',
    to: '/roles',
    role: ['SuperAdmin', 'Admin'],
    icon: 'UserCog',
  },
  {
    path: 'All Subjects',
    to: '/subjects',
    role: ['SuperAdmin', 'Admin', 'Student'],
    icon: 'BookOpen',
  },
  {
    path: 'Add Subject',
    to: '/add-subject',
    role: ['SuperAdmin'],
    icon: 'Plus',
  },
  {
    path: 'Logout',
    to: '/login',
    role: ['SuperAdmin', 'Admin', 'Student'],
    icon: 'LogOut',
  },
];

export interface NavigationLink {
  path: string;
  to: string;
  role: string[];
  icon: string;
}
