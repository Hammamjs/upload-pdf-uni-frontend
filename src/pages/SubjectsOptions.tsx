import { Toaster } from 'react-hot-toast';
import FileCard from '../components/FileCard';
import Search from '../components/Search';
import useSubjectOptions from '../hooks/useSubjectOptions';
import { SubjectType } from '../types';
// import NoContentFound from '../components/NoContentFound';

const SubjectsOptions = () => {
  const { handleDeleteSubject, isLoading, subjects, setKeyword } =
    useSubjectOptions();
  return (
    <div className="min-h-[calc(100vh-80px)] h-full">
      <div className="container mx-auto">
        <p className="font-bold border-b p-3">Search for subject</p>

        <Search
          searchByPlaceholder="Search for the subject..."
          student={(e) => setKeyword(e.target.value)}
        />
        {isLoading ? (
          <p>is Loading ...</p>
        ) : subjects.length ? (
          subjects.map(
            ({
              _id,
              createdAt,
              departments,
              name,
              semester,
              year,
            }: SubjectType) => (
              <FileCard
                createAt={createdAt}
                department={departments}
                handleDelete={() => handleDeleteSubject(_id)}
                title={name}
                year={year}
                subject={name}
                semester={semester}
                key={_id}
              />
            )
          )
        ) : (
          <p className="text-center">No content found</p>
        )}
      </div>
      <Toaster position="top-left" />
    </div>
  );
};

export default SubjectsOptions;
