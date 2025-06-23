import { useForm } from 'react-hook-form';
import { SignIpSchemaType, SignupSchema } from '../validation/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { StudentType } from '../api/StudentApi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SingUp } from '@/api/AuthApi';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignIpSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  // const { updateStudentData } = useStudent();

  useEffect(() => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      console.log(errors);
      toast.error(firstError.message as string);
    }
  }, [errors]);

  const handleRegisteration = async (student: SignIpSchemaType) => {
    console.log('Hammam');
    // validation();
    setIsLoading(true);
    const studentData: StudentType = {
      studentName: student.studentname,
      email: student.email,
      studentIdx: student.index,
      password: student.newPassword,
      confirmPassword: student.confirmPassword,
      year: student.year,
      department: student.department,
      semester: student.semester,
    };

    console.log(studentData);

    try {
      const response = await SingUp(studentData);
      toast.success(response.message);
      setIsSuccess(true);
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    handleRegisteration,
    errors,
    isLoading,
    isSuccess,
  };
};

export default useRegister;
