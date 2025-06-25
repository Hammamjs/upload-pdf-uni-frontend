import { StudentType } from './StudentApi';
import { createInstancePoint, urlEndpoint } from './UrlEndpoint';

export const SingUp = async ({
  studentName,
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
      name: studentName,
      studentIdx,
      year,
      semester,
      department,
      email,
      password,
      confirmPassword,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await createInstancePoint.post(urlEndpoint + '/auth', {
    email,
    password,
  });

  return response.data;
};

export const logout = async (email: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/logout',
    { email }
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

  return response;
};

export const resetCodeVerification = async (resetCode: string) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/auth/verify-code',
    { resetCode }
  );

  return response;
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

  return response;
};

export const changeStudentPassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  email: string
) => {
  const response = await createInstancePoint.put(
    urlEndpoint + '/auth//update-password',
    {
      currentPassword,
      newPassword,
      confirmPassword,
      email,
    }
  );

  return response;
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
