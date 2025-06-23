import { getAllPdfs } from '@/api/FileApi';
import { SubjectType } from '@/types';
import useSWR from 'swr';

const useStudentMaterials = () => {
  const { data: files } = useSWR<{ PDFS: SubjectType[] }>(
    'materials',
    getAllPdfs
  );

  return {
    subjects:
      files?.PDFS.sort((a, b) => b.subject.localeCompare(a.subject)) || [],
  };
};

export default useStudentMaterials;
