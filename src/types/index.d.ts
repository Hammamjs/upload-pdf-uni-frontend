import { LucideIcon } from 'lucide-react';
import { File } from 'node:buffer';
import { ChangeEvent, ReactElement, RefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';

/***** From types   *****/
export type UploadRegisterType = {
  file: FileList | null;
  semester: string;
  subject: string;
  title: string;
  year: string;
};
/************************/

export type InputProps = {
  type: string;
  error: FieldError | undefined;
  Icons?: LucideIcon;
  label?: string;
  register?: UseFormRegister<any>;
  placeholder?: string;
  name?: string;
  dragActive?: boolean;
  handleDrag?: (e: React.DragEvent) => void;
  handleFileInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop?: (e: React.DragEvent) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  formData?: UploadFormData;
  removeFile?: () => void;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  file?: File;
};

export interface UploadFormData {
  subject: subject;
  title: string;
  year: string;
  semester: string;
  file: File | null;
  departments?: string[];
}

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
  name: string;
  register?: UseFormRegister<any>;
  errors: FieldError | undefined;
  placeholder?: string;
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
  uploadedAt: Date;
  semester: '1st' | '2nd';
  _id: string;
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
  isRead: boolean;
  createdAt: Date;
  studentId?: string;
  _id: string;
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
};

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
    remark: string;
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
// export type SubjectDetails = {
//   subject: string;
//   content: string;
//   createAt: Date;
//   createdAt: Date;
//   departments: string[];
//   fileId: string;
//   imgCover: string;
//   semester: string;
//   title: string;
//   updatedAt: string;
//   view: string;
//   year: string;
//   _id: string;
// };

export type SubjectType = {
  subject: string;
  title: string;
  year: string;
  departments: string[];
  semester: '1st' | '2nd';
  _id: string;
  imgCover: string;
  uploadedAt: Date;
  filedId: string;
  view: string;
  content: string;
  size: number;
};

export type DropDownType = {
  values: (string | number | DepartmentsType | YearType | SemesterType)[];
  title: string;
  name: UploadFileSchema;
  register: UseFormRegister<any>;
  isDisabled?: boolean;
  Icon?: LucideIcon;
};

export type InputFile = {
  dragActive?: boolean;
  handleDrag?: (e: React.DragEvent) => void;
  handleFileInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop?: (e: React.DragEvent) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  formData?: UploadFormData;
  removeFile?: () => void;
  register?: UseFormRegister<any>;
  file: FileList;
};

export type InputTextType = {
  label: string;
  placeholder: string;
  name: string;
  className?: string;
  isDisabled?: boolean;
  register: UseFormRegister<any>;
};
