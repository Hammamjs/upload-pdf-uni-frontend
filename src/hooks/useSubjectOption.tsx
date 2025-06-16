import axios from 'axios';
import { addNewSubject } from '../api/FileApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSubjectOption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleAddNewSubject = async (
    departments: string[],
    semester: string,
    year: string,
    subject: string
  ) => {
    setIsLoading(true);
    try {
      const newSubject = await addNewSubject(
        departments,
        semester,
        year,
        subject
      );
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
