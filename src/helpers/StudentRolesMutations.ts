import { Student } from '@/context/StudentContext';
import { changeAccountStatus as changeStatus } from '@/api/StudentApi';

export const changeAccountStatus = async (id: string, students: Student[]) => {
  const student = students.find((sub) => sub._id === id);
  if (!student) return;

  const updatedStatus = !student.active;

  await changeStatus(id, updatedStatus);

  return {
    reuslts: {
      students: students.map((s) =>
        s._id === id ? { ...s, active: updatedStatus } : s
      ),
      count: students.length,
    },
  };
};

export const changeAccountStatusOptions = (students: Student[], id: string) => {
  return {
    optimisticData: {
      results: students.map((s) =>
        s._id === id ? { ...s, active: !s.active } : s
      ),
      count: students.length,
    },
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
