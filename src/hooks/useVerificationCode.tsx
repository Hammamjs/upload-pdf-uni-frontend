import { resetCodeVerification } from '../api/StudentApi';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useVerificationCode = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const handleCodeVerification = async (data: FieldValues) => {
    try {
      const res = await resetCodeVerification(data.resetCode);
      toast.success(res.message, { position: 'top-right' });
      reset();
      setTimeout(() => {
        navigate('/reset-password', { replace: true });
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  return {
    register,
    isSubmitting,
    handleSubmit,
    handleCodeVerification,
  };
};

export default useVerificationCode;
