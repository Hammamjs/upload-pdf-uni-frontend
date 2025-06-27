import { deleteSubject, addNewSubject as addSubject } from '../api/FileApi';
import type { Subject, SubjectType } from '../types';
export const deleteSubjectMutation = async (
  id: string,
  subjects: SubjectType[]
) => {
  await deleteSubject(id);
  const filterSubjects = subjects.filter((sub) => sub._id !== id);
  return filterSubjects.sort((a, b) => a.subject.localeCompare(b.subject));
};

export const deleteSubjectOptions = (subjects: SubjectType[]) => {
  return {
    optimisticData: subjects.sort((a, b) => a.subject.localeCompare(b.subject)),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const addNewSubject = async (
  newSubject: Subject,
  subjects: Subject[]
) => {
  await addSubject(newSubject);
  return [newSubject, ...subjects].sort((a, b) => a.name.localeCompare(b.name));
};

export const addNewSubjectOption = (subjects: Subject[]) => {
  return {
    optimisticData: subjects.sort((a, b) => a.name.localeCompare(b.name)),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
