import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { studentForgotPass } from '../api/StudentApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useForgotPassword = () => {
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const handleForgotPass = async (data: FieldValues) => {
    try {
      const res = await studentForgotPass(data.email);
      toast.success(res.message, { position: 'top-right' });
      reset();
      setTimeout(() => navigate('/reset-code'), 800);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };
  return {
    handleForgotPass,
    register,
    isSubmitting,
    handleSubmit,
  };
};

export default useForgotPassword;
