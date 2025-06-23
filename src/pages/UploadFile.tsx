import { Toaster } from 'react-hot-toast';
import UploadFileDetails from '../components/FileInfo';

const UploadFile = () => {
  return (
    <div className="p-2 mx-aut h-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <UploadFileDetails />
      <Toaster position="top-right" />
    </div>
  );
};

export default UploadFile;
