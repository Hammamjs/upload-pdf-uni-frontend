import { studentForgotPass } from '../api/AuthApi';
import { addToLocalstorage } from '@/lib/LocalStorage';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    try {
      const res = await studentForgotPass(email);
      setIsLoading(false);
      if (res.status === 200) {
        setIsSuccess(true);
        addToLocalstorage('reset-password-email', email);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return {
    email,
    isLoading,
    isSuccess,
    error,
    handleSubmit,
    handleInputChange,
    setIsSuccess,
  };
};

export default useForgotPassword;
