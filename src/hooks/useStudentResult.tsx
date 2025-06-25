import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { studentRes } from '../api/StudentApi';
import { useStudent } from '../hooks/useStudent';
import { ResultDataType, type CurrentType } from '../types';
import useSWR from 'swr';
const useStudentResult = () => {
  const arrayOfGrades = useRef<string[]>(null);
  const { student } = useStudent();

  const {
    data: result,
    isLoading,
    mutate,
    isValidating,
  } = useSWR<ResultDataType>('student-result', studentRes, {
    onSuccess: () => toast.success('Result retrived'),
    onError: () => {},
    suspense: true,
  });

  useEffect(() => {
    arrayOfGrades.current =
      result?.res.grades.reduce((acc: string[], current: CurrentType) => {
        if (current.subject && !acc.includes(current.grade))
          acc.push(current.grade);
        return acc;
      }, [] as string[]) || [];
    console.log(arrayOfGrades.current);
    console.log(result?.res);
  }, [isLoading]);

  // console.log(result?.res.grades.slice(0, -2));
  return {
    isLoading,
    student,
    arrayOfGrades,
    result,
    handleRefresh: mutate,
    isValidating,
  };
};

export default useStudentResult;
