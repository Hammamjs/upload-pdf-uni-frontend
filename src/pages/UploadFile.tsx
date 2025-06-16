import { Toaster } from 'react-hot-toast';
import FileInfo from '../components/FileInfo';

const UploadFile = () => {
  return (
    <div className="container p-2 mx-auto min-h-[calc(100vh-60px)] h-full relative">
      <FileInfo />
      <Toaster position="top-right" />
    </div>
  );
};

export default UploadFile;
