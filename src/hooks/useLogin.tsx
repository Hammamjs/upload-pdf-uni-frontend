import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '../validation/LoginSchema';
import toast from 'react-hot-toast';
import { login } from '../api/AuthApi';
import axios from 'axios';
import { useStudent } from '../hooks/useStudent';
import { useEffect } from 'react';
import {
  addToLocalstorage,
  getLocalstorage,
  isExistInLocalStorage,
} from '../lib/LocalStorage';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  useEffect(() => {
    if (!navigator.onLine) toast.error('Check your internet 📶');
    if (!isExistInLocalStorage('studentInfo')) toast('Please signin');
  }, []);

  const { updateStudentData } = useStudent();
  const navigate = useNavigate();

  // if student info stored in localstorage no need to re-login
  useEffect(() => {
    if (isExistInLocalStorage('studentInfo')) {
      updateStudentData(JSON.parse(getLocalstorage('studentInfo')!));
      navigate('/', { replace: true });
      return;
    }
  }, []);

  const {
    register,
    reset,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: FieldValues) => {
    try {
      const response = await login(data.email, data.password);
      toast.success(response.message);
      // store user data if after logged in
      addToLocalstorage('studentInfo', response.student);
      updateStudentData(response.student);

      reset();
      navigate('/', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  return {
    register,
    isSubmitting,
    handleSubmit,
    handleLogin,
    errors,
  };
};

export default useLogin;
