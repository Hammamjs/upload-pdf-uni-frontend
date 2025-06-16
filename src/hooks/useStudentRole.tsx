import { useEffect, useState } from 'react';
import { changeStudentRole, getStudents } from '../api/StudentApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import type { StudentsType } from '../types';

const useStudentRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<StudentsType>();
  const [filteredSt, setFilteredSt] = useState<StudentsType>();
  // const [student, setStudent] = useState<string>();
  useEffect(() => {
    // This is IIFE => Immediate Invoked Function Expression
    (async () => {
      setIsLoading(true);
      try {
        const response = await getStudents();
        setStudents(response.results.students);
        setFilteredSt(response.results.students);
      } catch (err) {
        if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const changeRole = async (email: string, role: 'Student' | 'Admin') => {
    try {
      if (role === 'Admin') role = 'Student';
      else if (role === 'Student') role = 'Admin';
      const res = await changeStudentRole(email, role);
      setStudents((prev) =>
        prev?.map((student) =>
          student.email === res.student.email
            ? { ...student, role: res.student.role }
            : student
        )
      );
      toast.success(res.message, { position: 'top-right' });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchForStudent = (studentName: string) => {
    const keyword = studentName.toLowerCase().trim();
    if (!keyword) {
      setFilteredSt(students);
      return;
    }

    setFilteredSt((prev) =>
      prev?.filter((st) => st.name.toLowerCase().startsWith(keyword))
    );
  };

  return {
    isLoading,
    filteredSt,
    handleSearchForStudent,
    changeRole,
  };
};

export default useStudentRole;
