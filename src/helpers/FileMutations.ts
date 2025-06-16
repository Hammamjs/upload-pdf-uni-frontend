import { deleteFile } from '../api/FileApi';
import { FileType } from '../types';

export const deleteMutation = async (fileId: string, files: FileType[]) => {
  await deleteFile(fileId);
  const filtredFiles = files?.filter((file) => file._id !== fileId);

  return filtredFiles?.sort((a, b) => a.title.localeCompare(b.title));
};

export const deleteFileOptions = (files: FileType[]) => {
  return {
    optimisticData: files?.sort((a, b) => a.title.localeCompare(b.title)),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
