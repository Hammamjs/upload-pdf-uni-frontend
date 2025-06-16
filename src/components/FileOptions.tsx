import useFileOptions from '../hooks/useFileOptions';
import FileCard from './FileCard';
import Search from './Search';

const FileOptions = () => {
  const { setSearchKeyWord, deleteFileFromDrive, files, isLoading } =
    useFileOptions();

  return (
    <div className="px-2">
      <Search
        searchByPlaceholder="Type file subject..."
        student={(e) => setSearchKeyWord(e.target.value)}
      />
      {isLoading ? (
        <p>wait min...</p>
      ) : (
        files?.map(
          ({ _id, title, year, department, semester, createAt, subject }) => (
            <FileCard
              key={_id}
              createAt={createAt}
              title={title}
              year={year}
              department={department}
              semester={semester}
              handleDelete={() => deleteFileFromDrive(_id)}
              subject={subject}
            />
          )
        )
      )}
    </div>
  );
};

export default FileOptions;
