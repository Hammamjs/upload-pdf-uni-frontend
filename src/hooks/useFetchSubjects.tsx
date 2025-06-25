import type { SubjectType } from '../types';
import useSWR from 'swr';
import { urlEndpoint as cacheKey } from '../api/UrlEndpoint';
import { getStudentFiles } from '../api/FileApi';
import { useStudent } from './useStudent';

const useFetchSubjects = () => {
  // const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const { student } = useStudent();

  const { isLoading, data: files } = useSWR<SubjectType[]>(
    cacheKey,
    getStudentFiles,
    {
      suspense: true,
    }
  );

  const exisitingSubject = files?.reduce((acc, cur) => {
    if (!acc.includes(cur.subject)) acc.push(cur.subject);
    return acc;
  }, [] as string[]);

  return {
    files,
    isLoading,
    studentName: student?.name.split(' ')[0],
    filterBySubject: exisitingSubject,
  };
};

export default useFetchSubjects;
