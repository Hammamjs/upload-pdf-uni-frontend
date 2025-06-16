import { useForm } from 'react-hook-form';
import { SignIpSchemaType, SignupSchema } from '../validation/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useStudent } from '../hooks/useStudent';
import { useState } from 'react';
import { SingUp, StudentType } from '../api/StudentApi';
import axios from 'axios';

const useRegister = () => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignIpSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  const [year, setYear] = useState('Select Year');
  const [department, setDepartment] = useState('Select Department');
  const [semester, setSemester] = useState('Select Semester');

  const { updateStudentData } = useStudent();

  const validation = () => {
    if (errors.studentname?.message) {
      toast.error(errors.studentname.message);
    }

    if (errors.index?.message) {
      toast.error(errors.index.message);
    }

    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
    if (errors.confirmPassword?.message) {
      toast.error(errors.confirmPassword.message);
    }
  };

  const handleRegisteration = async (student: SignIpSchemaType) => {
    const studentData: StudentType = {
      name: student.studentname,
      email: student.email,
      studentIdx: student.index,
      password: student.password,
      confirmPassword: student.confirmPassword,
      year,
      department,
      semester,
    };

    try {
      const response = await SingUp(studentData);
      updateStudentData(response.student);
      toast.success(response.message);
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
    }
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    year,
    setYear,
    semester,
    setSemester,
    department,
    setDepartment,
    validation,
    handleRegisteration,
  };
};

export default useRegister;
