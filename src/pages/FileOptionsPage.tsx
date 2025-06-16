import FileOptions from '../components/FileOptions';
import { Toaster } from 'react-hot-toast';

const FileOptionsPage = () => {
  return (
    <div className="container mx-auto min-h-svh">
      <FileOptions />
      <Toaster position="top-right" />
    </div>
  );
};

export default FileOptionsPage;
