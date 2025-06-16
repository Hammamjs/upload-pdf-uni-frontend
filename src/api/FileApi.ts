import { createInstancePoint, urlEndpoint } from './StudentApi';

export const getStudentPdfSemester = async (subject?: string) => {
  try {
    const response = await createInstancePoint.get(
      urlEndpoint + `/file/student-file?${subject}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log('Error fetch data', err);
    return [];
  }
};

// Student subject
export const getStudentSubject = async (subject?: string) => {
  try {
    const response = await createInstancePoint.get(
      urlEndpoint + `/file?subject=${subject}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log('Error fetch data', err);
    return [];
  }
};

// Upload pdf file to server
export const uploadFile = async (formData: FormData) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/file/',
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getAllPdfs = async () => {
  const response = await createInstancePoint.get(urlEndpoint + '/file', {
    withCredentials: true,
  });

  return response.data;
};

// Delete file from server
export const deleteFile = async (id: string) => {
  const response = await createInstancePoint.delete(
    urlEndpoint + `/file/${id}`,
    {
      withCredentials: true,
    }
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
export const addNewSubject = async (
  departments: string[],
  year: string,
  semester: string,
  subject: string
) => {
  const response = await createInstancePoint.post(
    urlEndpoint + '/subject',
    {
      departments,
      semester,
      year,
      subject,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const deleteSubject = async (id: string) => {
  const response = await createInstancePoint.delete(
    urlEndpoint + `/subject/${id}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
