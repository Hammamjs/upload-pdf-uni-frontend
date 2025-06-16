import { FieldValues, useForm } from 'react-hook-form';
import { getAllSubjects, uploadFile } from '../api/FileApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SubjectType } from '../types';
const useFileInfo = () => {
  const { data: subjects, isLoading } = useSWR(
    'subject-options',
    getAllSubjects
  );
  const [keyword, setKeyword] = useState('');

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      subject: keyword,
    },
  });

  const [year, setYear] = useState('Select Year');
  const [department, setDepartment] = useState('Select Department');
  const [semester, setSemester] = useState('Select Semester');
  const [depArr, setDepArr] = useState<string[]>([]);

  // help when user type subject name => suggestions
  const matched = useMemo(() => {
    if (isLoading) return;
    const lower = keyword.toLowerCase().trim();
    console.log(lower);
    return (
      subjects.find((sub: SubjectType) =>
        sub.name.toLowerCase().startsWith(lower)
      ) || ''
    );
  }, [keyword]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && matched) {
      e.preventDefault();
      setKeyword(matched?.name);
      setValue('subject', matched?.name.trim());
      setDepartment(matched?.departments[matched?.departments.length - 1]);
      setYear(matched?.year);
      setSemester(matched?.semester);
      setDepArr(matched?.departments);
    }
    console.log(e.key);
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileCover, setFileCover] = useState<File | null>(null);

  const handleOnUploadFile = async (data: FieldValues) => {
    if (!file || !fileCover) {
      toast.error('Please upload file and file cover! 😊');
      return;
    }
    const formData = new FormData();

    if (!depArr.length) {
      toast.error('Department cannot be empty');
      return;
    }

    // assign values to send it to server
    formData.append('file', file);
    formData.append('pdfCover', fileCover);
    formData.append('title', String(data.title));
    formData.append('subject', String(data.subject));
    formData.append('year', String(year));
    formData.append('semester', String(semester));

    // append array of deps
    depArr.forEach((dep) => {
      formData.append('department[]', dep);
    });

    try {
      const response = await uploadFile(formData);
      toast.success(response.message);
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };
  return {
    year,
    setYear,
    department,
    setDepartment,
    semester,
    setSemester,
    depArr,
    setDepArr,
    file,
    setFile,
    fileCover,
    setFileCover,
    handleOnUploadFile,
    register,
    handleSubmit,
    isSubmitting,
    getValues,
    handleKeyDown,
    handleChange,
    subjects,
    matched,
    keyword,
  };
};

export default useFileInfo;
