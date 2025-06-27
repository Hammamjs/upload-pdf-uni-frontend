import { DepartmentsType, SemesterType, YearType } from '@/types';
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

export const getStudents = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/students');

  return response.data;
};

export const changeStudentRole = async (
  id: string,
  role: 'Student' | 'Admin'
) => {
  const response = await createInstancePoint.put(urlEndpoint + '/students', {
    id,
    role,
  });

  return response.data;
};

export const changeAccountStatus = async (id: string, active: boolean) => {
  const response = active
    ? await createInstancePoint.patch(urlEndpoint + '/students/activate', {
        id,
      })
    : await createInstancePoint.put(urlEndpoint + '/students/activate', {
        id,
      });

  return response;
};

export const changeRole = async (id: string) => {
  const response = await createInstancePoint.put(urlEndpoint + '/students', {
    id,
  });

  return response;
};

export const studentNotifications = async () => {
  const response = await createInstancePoint.get(
    urlEndpoint + '/notifications'
  );

  return response.data;
};

export const markNotificationsAsRead = async () => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/notifications/read'
  );

  return response.data;
};
export const markNotificationAsRead = async (notificationId: string) => {
  const response = await createInstancePoint.patch(
    urlEndpoint + '/notifications/update-notification',
    {
      id: notificationId,
    }
  );

  return response.data;
};
