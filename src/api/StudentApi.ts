import axios from 'axios';

export type StudentType = {
  name: string;
  studentIdx: string;
  email: string;
  year: string;
  department: string;
  semester: string;
  password?: string;
  confirmPassword?: string;
};

export const urlEndpoint = 'http://localhost:3500/api/v1';

export const createInstancePoint = axios.create({
  baseURL: urlEndpoint,
});

export const SingUp = async ({
  name,
  studentIdx,
  year,
  semester,
  department,
  email,
  password,
  confirmPassword,
}: StudentType) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/register',
    {
      name,
      studentIdx,
      year,
      semester,
      department,
      email,
      password,
      confirmPassword,
    },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );

  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth',
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const logout = async (email: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/logout',
    { email },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const studentForgotPass = async (email: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/forgot-password',
    {
      email,
    }
  );

  return response.data;
};

export const resetCodeVerification = async (resetCode: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/verify-code',
    { resetCode }
  );

  return response.data;
};

export const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await createInstancePoint.patch(
    urlEndpoint + '/auth/reset-password',
    { email, newPassword, confirmPassword }
  );

  return response.data;
};

export const studentRes = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/result', {
    withCredentials: true,
  });

  return response.data;
};

export const updateStudentData = async ({
  name,
  studentIdx,
  email,
  year,
  department,
  semester,
}: StudentType) => {
  const response = await createInstancePoint.put(
    urlEndpoint + '/students',
    {
      name,
      studentIdx,
      email,
      year,
      department,
      semester,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getStudents = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/students', {
    withCredentials: true,
  });

  return response.data;
};

export const changeStudentRole = async (
  email: string,
  role: 'Student' | 'Admin'
) => {
  const response = await createInstancePoint.put(
    urlEndpoint + '/students',
    { email, role },
    { withCredentials: true }
  );

  return response.data;
};

export const studentNotifications = async () => {
  const response = await createInstancePoint.get(
    urlEndpoint + '/notifications',
    { withCredentials: true }
  );

  return response.data;
};

export const markNotificationAsRead = async () => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/notifications/read',
    {},
    { withCredentials: true }
  );

  return response.data;
};
