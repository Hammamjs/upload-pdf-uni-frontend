import { useEffect, useState } from 'react';
import { getStudentSubject } from '../api/FileApi';
import { useParams } from 'react-router-dom';
import { SubjectDetails } from '../types';

const useSubject = () => {
  const [subject, setSubject] = useState<SubjectDetails[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getStudentSubject(name);
      console.log(data);
      setIsLoading(false);
      setSubject(data.PDFS);
    })();
  }, []);
  return {
    subject,
    isLoading,
    name,
  };
};

export default useSubject;
