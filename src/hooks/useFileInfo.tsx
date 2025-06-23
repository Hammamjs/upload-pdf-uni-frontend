import { FieldValues, useForm } from 'react-hook-form';
import { getAllSubjects, uploadFile } from '../api/FileApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import {
  UploadFileSchema,
  UploadFileType,
} from '@/validation/UploadFileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
const useFileInfo = () => {
  const { data: subjects, mutate } = useSWR('subject-options', getAllSubjects);

  const [keyword, setKeyword] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const [uploadComplete, setUploadComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors, dirtyFields },
    watch,
    getValues,
    reset,
    handleSubmit,
  } = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      file: undefined,
      semester: '1st',
      subject: '',
      title: '',
      year: '1st',
    },
  });

  useEffect(() => {
    if (Object.values(errors).length) {
      toast.error(Object.values(errors)[0].message || '');
    }
  }, [errors]);

  const file = watch('file') as FileList;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      // setValue('file', files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // handleFileSelect(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Tab' && matched) {
  //     e.preventDefault();
  //     console.log(matched);
  //     setKeyword(matched?.name);
  //     setValue('subject', matched?.name.trim());
  //     setDepartment(matched?.departments[matched?.departments.length - 1]);
  //     setYear(matched?.year);
  //     setSemester(matched?.semester);
  //     setDepArr(matched?.departments);
  //     setFileCover(matched?.imgCover);
  //   }
  // };

  const handleOnUploadFile = async (
    data: FieldValues,
    departments: string[]
  ) => {
    setIsUploading(true);
    const formData = new FormData();

    const file = data.file[0];
    // assign values to send it to server
    formData.append('file', file);
    formData.append('title', data.title);
    formData.append('subject', data.subject);
    formData.append('year', data.year);
    formData.append('semester', data.semester);

    // append array of deps
    departments.forEach((dep) => {
      formData.append('departments[]', dep);
    });

    formData.forEach((data) => {
      console.log(data);
    });

    try {
      const response = await uploadFile(formData, setUploadProgress);
      if (response.status === 200) {
        setUploadComplete(true);
      }
      setIsUploading(false);
      mutate();
      toast.success(response.data.message);
      reset();
      setSelectedDepartments([]);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };
  const allValues = watch();
  const isFormValid =
    Object.keys(allValues).filter(
      (key) => dirtyFields[key as keyof UploadFileType]
    ).length >= 3;

  return {
    handleOnUploadFile,
    register,
    handleSubmit,
    isFormValid,
    getValues,
    handleChange,
    subjects,
    selectedDepartments,
    keyword,
    uploadProgress,
    isUploading,
    setSelectedDepartments,
    uploadComplete,
    dragActive,
    fileInputRef,
    handleDrop,
    handleDrag,
    file,
    handleFileInputChange,
    reset,
  };
};

export default useFileInfo;
