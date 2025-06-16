import { deleteSubject } from '../api/FileApi';
import type { SubjectType } from '../types';

export const deleteSubjectMutation = async (
  id: string,
  subjects: SubjectType[]
) => {
  await deleteSubject(id);
  const filterSubjects = subjects.filter((sub) => sub._id !== id);
  return filterSubjects.sort((a, b) => a.name.localeCompare(b.name));
};

export const deleteSubjectOptions = (subjects: SubjectType[]) => {
  return {
    optimisticData: subjects.sort((a, b) => a.name.localeCompare(b.name)),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
