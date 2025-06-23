import { Dispatch, SetStateAction } from 'react';
import { createInstancePoint, urlEndpoint } from './UrlEndpoint';

export const getStudentPdfSemester = async () => {
  try {
    const response = await createInstancePoint.get(
      ///student-file?${subject}
      urlEndpoint + `/subject`
    );

    return response.data;
  } catch (err) {
    console.log('Error fetch data', err);
    return [];
  }
};

export const getStudentFiles = async () => {
  const response = await createInstancePoint.get(
    urlEndpoint + '/file/student-file'
  );

  return response.data;
};

// Student subject
export const getStudentSubject = async (subject?: string) => {
  try {
    const response = await createInstancePoint.get(
      urlEndpoint + `/file?subject=${subject}`
    );

    return response.data;
  } catch (err) {
    console.log('Error fetch data', err);
    return [];
  }
};

// Upload pdf file to server
export const uploadFile = async (
  formData: FormData,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/file',
    formData,
    {
      onUploadProgress: (ProgressEvent) => {
        const percentMethod = Math.round(
          (ProgressEvent.loaded * 100) / (ProgressEvent.total || 1)
        );
        setProgress(percentMethod);
        // reset progressbar
        setTimeout(() => {
          setProgress(0);
        }, 1000);
      },
    }
  );

  return response;
};

export const getAllPdfs = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/file');

  return response.data;
};

// Delete file from server
export const deleteFile = async (id: string) => {
  const response = await createInstancePoint.delete(
    urlEndpoint + `/file/${id}`
  );

  return response.data;
};

// Retrive subjects for a specific year
export const retriveSpecificYear = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/file', {
    withCredentials: true, // for authentication
  });

  return response;
};

// get All subjects
export const getAllSubjects = async () => {
  const response = await createInstancePoint.get(urlEndpoint + `/subject`, {
    withCredentials: true,
  });

  return response.data;
};

// Add new subject
export const addNewSubject = async (formData: FormData) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/subject',
    formData
  );

  return response.data;
};

export const deleteSubject = async (id: string) => {
  const response = await createInstancePoint.delete(
    urlEndpoint + `/subject/${id}`
  );

  return response.data;
};
