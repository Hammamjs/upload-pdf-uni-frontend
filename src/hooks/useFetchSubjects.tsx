import { useEffect, useState } from 'react';
import type { SubjectDetails } from '../types';
import useSWR from 'swr';
import { urlEndpoint as cacheKey } from '../api/StudentApi';
import { getStudentPdfSemester } from '../api/FileApi';

const useFetchSubjects = () => {
  const [subjectName, setSubjectName] = useState<string[]>();

  const { isLoading, data: files } = useSWR<SubjectDetails[]>(
    cacheKey,
    getStudentPdfSemester
  );

  useEffect(() => {
    if (files?.length) {
      // create empty arr to hold ONLY subject name
      const subNames = [] as string[];
      // return only subject name
      files?.map((sub: SubjectDetails) => {
        if (!subNames.includes(sub.subject)) subNames.push(sub.subject);
      });

      setSubjectName(subNames);
    }
  }, [files]);

  return {
    subjectName,
    isLoading,
  };
};

export default useFetchSubjects;
