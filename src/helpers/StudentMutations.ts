import { Student } from '@/context/StudentContext';
import {
  changeStudentRole,
  changeAccountStatus as updateStatus,
} from '@/api/StudentApi';

export const changeAccountRole = async (
  id: string,
  students: Student[],
  newRole: 'Student' | 'Admin'
) => {
  const student = students.find((std) => std._id === id);
  if (!student) return;
  await changeStudentRole(id, newRole);

  return {
    results: {
      students: students.map((s) =>
        s._id === id ? { ...s, role: newRole } : s
      ),
      count: students.length,
    },
  };
};

export const changeAccountRoleOptions = (
  id: string,
  students: Student[],
  newRole: 'Admin' | 'Student'
) => {
  return {
    optimisticData: {
      results: {
        students: students.map((s) =>
          s._id === id ? { ...s, role: newRole } : s
        ),
        count: students.length,
      },
    },
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateStudentStatus = async (id: string, students: Student[]) => {
  const student = students.find((std) => std._id === id);

  if (!student) return [];

  await updateStatus(id, student.active);

  return {
    results: {
      students: students.map((std) =>
        std._id === id ? { ...std, active: !std.active } : std
      ),
      count: students.length,
    },
  };
};

export const updateStudentStatusOption = (id: string, students: Student[]) => {
  return {
    optimisticData: {
      results: {
        students: students.map((std) =>
          std._id === id ? { ...std, active: !std.active } : std
        ),
        count: students.length,
      },
    },

    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
