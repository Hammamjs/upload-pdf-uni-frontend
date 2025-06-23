import axios from 'axios';
import { addNewSubject } from '../api/FileApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSubjectOption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleAddNewSubject = async (
    year: string,
    semester: string,
    departments: string[],
    name: string
  ) => {
    const formData = new FormData();

    formData.append('year', String(year));
    formData.append('semester', String(semester));
    formData.append('name', String(name));

    // set all departmens
    departments.forEach((dep) => {
      formData.append('departments[]', dep);
    });

    formData.forEach((data) => {
      console.log(data);
    });

    setIsLoading(true);
    try {
      const newSubject = await addNewSubject(formData);
      toast.success(newSubject.message);
      setTimeout(() => nav('/subject-options'), 800);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddNewSubject,
    isLoading,
  };
};

export default useSubjectOption;
