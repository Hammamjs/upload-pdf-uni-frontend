import { getAllSubjects } from '../api/FileApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import useSWR from 'swr';
import {
  deleteSubjectMutation as deleteSubject,
  deleteSubjectOptions,
} from '../helpers/SubjectMutations';
import { SubjectType } from '../types';
import { useMemo, useState } from 'react';

const useSubjectOptions = () => {
  const [keyword, setKeyword] = useState('');

  const {
    isLoading,
    data: subjects,
    mutate,
  } = useSWR('subject-options', getAllSubjects);

  const filteredSubject = useMemo(() => {
    const searchKey = keyword.toLowerCase().trim();
    if (!searchKey || !subjects) return subjects;

    return subjects.filter((sub: SubjectType) =>
      sub.name.toLowerCase().includes(searchKey)
    );
  }, [keyword, subjects]);

  const handleDeleteSubject = async (id: string) => {
    try {
      await mutate(deleteSubject(id, subjects), deleteSubjectOptions(subjects));
      toast.success('Subject deleted successfully');
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
      console.log(err);
    }
  };

  return {
    isLoading,
    subjects: filteredSubject,
    handleDeleteSubject,
    setKeyword,
  };
};

export default useSubjectOptions;
