import { ReactElement, useState } from 'react';
import { createContext } from 'react';

export type Student = {
  name: string;
  email: string;
  department: string;
  semester: string;
  year: string;
  studentIdx: string;
  role: string;
  id: string;
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
  const [student, setStudent] = useState<Student>({
    name: '',
    email: '',
    year: '',
    department: '',
    studentIdx: '',
    semester: '',
    role: '',
    id: '',
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
