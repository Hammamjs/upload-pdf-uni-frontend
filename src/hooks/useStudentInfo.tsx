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

  const [year, setYear] = useState(student!.year);
  const [department, setDepartment] = useState(student!.department);
  const [semester, setSemester] = useState(student!.semester);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<updateStudentValidation>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      studentIdx: student?.studentIdx,
      email: student?.email,
      studentname: student?.name,
    },
  });

  const validation = () => {
    if (errors.studentname?.message) {
      toast.error(errors.studentname.message);
    }

    if (errors.studentIdx?.message) {
      toast.error(errors.studentIdx.message);
    }

    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
  };

  const changeStudentData = async (data: FieldValues) => {
    const updatedStudentInfo: StudentType = {
      ...student,
      name: data.studentname,
      email: data.email,
      studentIdx: data.studentIdx,
      year,
      department,
      semester,
    };

    try {
      const response = await updateStudentData(updatedStudentInfo);
      updateStudentInfo(response.student);
      addToLocalstorage('studentInfo', response.student);
      toast.success(response.message);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  return {
    student,
    year,
    semester,
    department,
    setYear,
    setDepartment,
    setSemester,
    register,
    isSubmitting,
    handleSubmit,
    validation,
    changeStudentData,
  };
};

export default useStudentInfo;
