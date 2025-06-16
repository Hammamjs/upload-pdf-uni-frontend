import { ChangeEvent, ReactElement } from 'react';
import { UseFormRegister } from 'react-hook-form';

export type InputProps = {
  type: string;
  className?: string;
  register: UseFormRegister<any>;
  placeholder: string;
  name: string;
  id?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactElement;
};

export type CustomInputProps = {
  type?: string;
  id?: string;
  className?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  name: string;
  labelClassName?: string;
  message?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactElement;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type InputPasswordProps = {
  className?: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
};

export type InputFileType = {
  id: string;
  name: string;
  message: string;
  labelClassName?: string;
  register: UseFormRegister<any>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FileCardType = {
  title: string;
  year: string;
  department: string[];
  subject: string;
  createAt: Date;
  semester: '1st' | '2nd';
  handleDelete: () => void;
};

export type SubjectCardType = {
  title: string;
  view: string;
  content: string;
  department: string[];
  semester: string;
  year: string;
};

export type FileType = {
  title: string;
  year: '1st' | '2nd' | '3rd' | '4th' | '5th';
  semester: '1st' | '2nd';
  createAt: Date;
  department: [
    | 'Networks'
    | 'Computer Science'
    | 'Math'
    | 'Statisitc'
    | 'Information Techenology'
  ];
  subject: string;
  view: string;
  content: string;
  fileId: string;
  _id: string;
};

export type NotificationsType = {
  message: string;
  subject: string;
  read: boolean;
  createdAt: Date;
  studentId?: string;
  _id?: string;
};

export type ResultProps = {
  semester: string;
  subject: string;
  ch: string;
  grade: string;
};

export type SearchType = {
  searchByPlaceholder: string;
  student: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type SelectDepType = {
  department: string;
  setSubjectOp: Dispatch<
    SetStateAction<{
      department: string;
      year: string;
      semester: string;
    }>
  >;
  handleSearch: () => void;
};

export type SelectYear = {
  id: string;
  value: string;
  name: string;
  selectedYear: () => void;
};

export type StudentRoleType = {
  name: string;
  role: string;
  changeRole: () => void;
  className?: string;
};

export type StudentsType = {
  name: string;
  role: 'Admin' | 'Student';
  email: string;
}[];

export type StudentStatusType = {
  name: string;
  gpa: string;
  index: string;
  sup: string[] | null;
};

export type ResultDataType = {
  res: {
    gpa: string;
    grades: {
      ch: string;
      grade: string;
      no: string;
      semester: string;
      subject: string;
    }[];
    name: string;
  };
};

export type CurrentType = {
  ch: string;
  grade: string;
  no: string;
  semester: string;
  subject: string;
};
export type SubjectDetails = {
  subject: string;
  content: string;
  createAt: Date;
  createdAt: Date;
  department: string[];
  fileId: string;
  pdfCover: string;
  semester: string;
  title: string;
  updatedAt: string;
  view: string;
  year: string;
  _id: string;
};

export type SubjectType = {
  name: string;
  year: string;
  departments: string[];
  semester: '1st' | '2nd';
  _id: string;
  createdAt: Date;
};
