import { ReactElement, useState } from 'react';
import { createContext } from 'react';
import { getLocalstorage } from '../lib/LocalStorage';

export type DepartmentsType =
  | 'Networks'
  | 'Computer Science'
  | 'Math'
  | 'Statisitc'
  | 'Information Techenology';

export type SemesterType = '1st' | '2nd';

export type YearType = '1st' | '2nd' | '3rd' | '4th' | '5th';

export type Student = {
  name: string;
  email: string;
  department: DepartmentsType;
  semester: SemesterType;
  year: YearType;
  studentIdx: string;
  role: string;
  _id: string;
  active: boolean;
};

export type StudentType = {
  student: Student | null;
  updateStudent: (filed: keyof Student, value: string) => void;
  updateStudentData: (newData: Student) => void;
};

export const StudentContext = createContext<StudentType>({
  student: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateStudent: (_filed: keyof Student, _value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateStudentData: (_newData: Student) => {},
});

export const StudentProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [student, setStudent] = useState<Student>(() => {
    try {
      const stored = getLocalstorage('studentInfo');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to parse student from localstorage ', e);
      return null;
    }
  });

  const updateStudent = (filed: keyof Student, value: string): void => {
    setStudent((prev) => ({
      ...prev,
      [filed]: value,
    }));
  };

  const updateStudentData = (newData: Student): void =>
    setStudent((prev) => ({
      ...prev,
      ...newData,
    }));

  return (
    <StudentContext.Provider
      value={{ student, updateStudent, updateStudentData }}
    >
      {children}
    </StudentContext.Provider>
  );
};
