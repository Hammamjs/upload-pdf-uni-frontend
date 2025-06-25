import toast from 'react-hot-toast';
import { createInstancePoint, urlEndpoint } from './UrlEndpoint';
import { Subject, UploadFormData } from '@/types';
import axios from 'axios';

// export const getStudentPdfSemester = async () => {
//   try {
//     const response = await createInstancePoint.get(
//       ///student-file?${subject}
//       urlEndpoint + `/subject`
//     );

//     return response.data;
//   } catch (err) {
//     if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
//     return [];
//   }
// };

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
    if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);

    return [];
  }
};
// Upload pdf file to server
export const uploadFile = async (
  formData: UploadFormData,
  onUploadProgress?: (ProgressEvent: number) => void
) => {
  const data = new FormData();
  data.append('file', formData.file!);
  data.append('title', formData.title);
  data.append('year', formData.year);
  data.append('semester', formData.semester);
  data.append('subject', formData.subject);

  formData.departments.forEach((dep) => {
    data.append('departments[]', dep);
  });
  const response = await createInstancePoint.post(urlEndpoint + '/file', data, {
    onUploadProgress: (ProgressEvent) => {
      if (onUploadProgress) {
        const progress = Math.round(
          (ProgressEvent.loaded * 100) / (ProgressEvent.total || 1)
        );
        onUploadProgress(progress);
      }
    },
  });

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
export const addNewSubject = async (newSubject: Subject) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/subject',
    newSubject
  );

  return response.data;
};

// Add new subject
export const updateSubject = async (
  updateSubject: Partial<Subject>,
  id: string
) => {
  const response = await createInstancePoint.post(urlEndpoint + '/subject', {
    ...updateSubject,
    id,
  });

  return response.data;
};

export const deleteSubject = async (id: string) => {
  const response = await createInstancePoint.delete(
    urlEndpoint + `/subject/${id}`
  );

  return response.data;
};
