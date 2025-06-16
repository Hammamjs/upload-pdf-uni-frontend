import { useContext } from 'react';
import { StudentContext, StudentType } from '../context/StudentContext';

export const useStudent = (): StudentType => {
  const { student, updateStudent, updateStudentData } =
    useContext(StudentContext);
  return {
    student,
    updateStudent,
    updateStudentData,
  };
};
