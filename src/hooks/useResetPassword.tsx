import { FieldValues, useForm } from 'react-hook-form';
import { resetPassword } from '../api/StudentApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  const handleResetPass = async (data: FieldValues) => {
    try {
      const res = await resetPassword(
        data.email,
        data.newPassowrd,
        data.confirmPassword
      );
      toast.success(res.message, { position: 'top-right' });
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 800);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.errors[0]?.msg);
      }
    }
  };

  return {
    register,
    isSubmitting,
    handleSubmit,
    handleResetPass,
  };
};

export default useResetPassword;
