import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useStudent } from '../hooks/useStudent';
import { StudentType, updateStudentData } from '../api/StudentApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateStudentSchema,
  updateStudentValidation,
} from '../validation/UpdateStudentDataSchema';
import axios from 'axios';
import { addToLocalstorage } from '../lib/LocalStorage';

const useStudentInfo = () => {
  const { student, updateStudentData: updateStudentInfo } = useStudent();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleCancel = () => {
    setIsEditing(false);
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<updateStudentValidation>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      studentname: student?.name,
      email: student?.email,
      index: student?.studentIdx,
      department: student?.department,
      year: student?.year,
      semester: student?.semester,
    },
  });

  const validation = () => {
    console.log(errors);
    if (errors.studentname?.message) {
      toast.error(errors.studentname.message);
      return;
    }

    if (errors.index?.message) {
      toast.error(errors.index.message);
      return;
    }

    if (errors.currentPassword?.message) {
      toast.error(errors.currentPassword.message);
      return;
    }
    if (errors.newPassword?.message) {
      toast.error(errors.newPassword.message);
      return;
    }
    if (errors.confirmPassword?.message) {
      toast.error(errors.confirmPassword.message);
      return;
    }
    if (errors.year?.message) {
      toast.error(errors.year.message);
      return;
    }
    if (errors.department?.message) {
      toast.error(errors.department.message);
      return;
    }
    if (errors.semester?.message) {
      toast.error(errors.semester.message);
      return;
    }
  };

  const updateStudentInformation = async (data: FieldValues) => {
    validation();
    setIsLoading(true);
    const updatedStudentInfo: StudentType = {
      ...student!,
      email: data.email,
      studentName: data.studentName,
      year: data.year,
      semester: data.semester,
      department: data.department,
    };

    try {
      const response = await updateStudentData(updatedStudentInfo);
      updateStudentInfo(response.student);
      addToLocalstorage('studentInfo', response.student);
      toast.success(response.message);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return {
    student,
    register,
    isSubmitting,
    handleSubmit,
    validation,
    updateStudent: updateStudentInformation,
    isLoading,
    errors,
    isEditing,
    handleCancel,
    setIsEditing,
  };
};

export default useStudentInfo;
