import { resetPassword } from '@/api/AuthApi';
import { getLocalstorage } from '@/lib/LocalStorage';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    email: JSON.parse(getLocalstorage('reset-password-email') as string) || '',
  });
  // const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;

    return {
      score: strength,
      checks,
      label: strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong',
      color: strength < 2 ? 'red' : strength < 4 ? 'yellow' : 'green',
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password =
        'Password is too weak. Please include uppercase, lowercase, numbers, and special characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await resetPassword(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setIsLoading(false);
      if (res.status === 200) {
        setIsSuccess(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
      }
    }

    // Connect to api
    // const res = await resetPassword()
  };
  return {
    handleInputChange,
    handleSubmit,
    formData,
    errors,
    getPasswordStrength,
    isLoading,
    isSuccess,
    passwordStrength,
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    setShowPassword,
    navigate,
  };
};

export default useResetPassword;
