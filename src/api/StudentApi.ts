import {
  DepartmentsType,
  SemesterType,
  YearType,
} from '@/context/StudentContext';
import { createInstancePoint, urlEndpoint } from './UrlEndpoint';

export type StudentType = {
  studentName: string;
  studentIdx: string;
  email: string;
  year: YearType;
  department: DepartmentsType;
  semester: SemesterType;
  password?: string;
  confirmPassword?: string;
};

export const studentRes = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/result');

  return response.data;
};

export const updateStudentData = async ({
  studentName,
  studentIdx,
  email,
  year,
  department,
  semester,
}: StudentType) => {
  const response = await createInstancePoint.put(urlEndpoint + '/students', {
    name: studentName,
    studentIdx,
    email,
    year,
    department,
    semester,
  });

  return response.data;
};

export const getStudents = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/students');

  return response.data;
};

export const changeStudentRole = async (
  email: string,
  role: 'Student' | 'Admin'
) => {
  const response = await createInstancePoint.put(urlEndpoint + '/students', {
    email,
    role,
  });

  return response.data;
};

export const studentNotifications = async () => {
  const response = await createInstancePoint.get(
    urlEndpoint + '/notifications'
  );

  console.log('Response ', response.data);

  return response.data;
};

export const markNotificationAsRead = async () => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/notifications/read'
  );

  return response.data;
};
