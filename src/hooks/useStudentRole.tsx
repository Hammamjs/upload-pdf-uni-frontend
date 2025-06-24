import { useState } from 'react';
import { getStudents } from '../api/StudentApi';
import type { StudentsType } from '../types';
import useSWR from 'swr';

const useStudentRole = () => {
  const [filteredSt, setFilteredSt] = useState<StudentsType>();

  const { data: students, isLoading } = useSWR('students', getStudents, {
    suspense: true,
  });

  console.log(students);

  // const changeRole = async (email: string, role: 'Student' | 'Admin') => {
  //   try {
  //     if (role === 'Admin') role = 'Student';
  //     else if (role === 'Student') role = 'Admin';
  //     const res = await changeStudentRole(email, role);
  //     setStudents((prev) =>
  //       prev?.map((student) =>
  //         student.email === res.student.email
  //           ? { ...student, role: res.student.role }
  //           : student
  //       )
  //     );
  //     toast.success(res.message, { position: 'top-right' });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSearchForStudent = (studentName: string) => {
    const keyword = studentName.toLowerCase().trim();
    if (!keyword) {
      setFilteredSt(students);
      return;
    }

    // setFilteredSt((prev) =>
    //   prev?.filter((st) => st.name.toLowerCase().startsWith(keyword))
    // );
  };

  return {
    isLoading,
    filteredSt,
    handleSearchForStudent,
    students: students.results?.students,
    totalCount: students.results?.count,
    adminCount: students.results?.students.filter(
      (std: { role: 'Admin' | 'SuperAdmin' | 'Student' }) =>
        std.role === 'Admin' || std.role === 'SuperAdmin'
    ).length,
    activeStudentsCount: students.results?.students.filter(
      (std: { active: boolean }) => std.active
    ).length,
    regularStudentsCount: students.results?.students.filter(
      (std: { role: 'Admin' | 'SuperAdmin' | 'Student' }) =>
        std.role === 'Student'
    ).length,
  };
};

export default useStudentRole;
