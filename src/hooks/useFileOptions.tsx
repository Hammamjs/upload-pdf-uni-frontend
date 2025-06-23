import { useEffect, useState } from 'react';
import { getAllPdfs } from '../api/FileApi';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { FileCardType, FileType } from '../types';
import useSWR from 'swr';
import {
  deleteMutation as deleteFile,
  deleteFileOptions,
} from '../helpers/FileMutations';

const useFileOptions = () => {
  const [filteredFiles, setFilteredFiles] = useState<FileCardType[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');

  const {
    isLoading,
    data: filesData,
    mutate,
  } = useSWR('delete-file', getAllPdfs);

  useEffect(() => {
    if (filesData?.PDFS) {
      setFilteredFiles(filesData?.PDFS);
    }
  }, [isLoading, filesData]);

  const deleteFileFromDrive = async (id: string) => {
    try {
      await mutate(
        deleteFile(id, filesData.PDFS),
        deleteFileOptions(filesData.PDFS)
      );

      const afterDeleteFiles = filteredFiles.filter((file) => file._id !== id);

      setFilteredFiles(afterDeleteFiles);

      toast.success('File deleted');
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const keyword = searchKeyWord.toLowerCase().trim();
    if (!keyword) {
      setFilteredFiles(filesData?.PDFS);
      return;
    }

    const matched = filesData?.PDFS?.filter((file: FileType) =>
      file.subject.toLowerCase().startsWith(keyword)
    );
    setFilteredFiles(matched);
  }, [searchKeyWord]);

  return {
    files: filteredFiles?.sort((a, b) => b.title.localeCompare(a.title)),
    setSearchKeyWord,
    deleteFileFromDrive,
    isLoading,
  };
};

export default useFileOptions;
