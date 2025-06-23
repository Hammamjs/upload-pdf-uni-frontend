import { CheckCircle, Upload } from 'lucide-react';

const UploadFileState = ({
  name,
  resetForm,
  semester,
  title,
  year,
}: {
  name: string;
  title: string;
  year: string;
  semester: string;
  resetForm: () => void;
}) => {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">Upload Successful!</h3>
      <p className="text-gray-300 mb-6">
        Your file has been uploaded successfully and is now available for
        download.
      </p>
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <div className="text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">File:</span>
            <span className="text-white">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Title:</span>
            <span className="text-white">{title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Year:</span>
            <span className="text-white">{year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Semester:</span>
            <span className="text-white">{semester}</span>
          </div>
        </div>
      </div>
      <button
        onClick={resetForm}
        className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
      >
        <Upload className="h-5 w-5 mr-2" />
        Upload Another File
      </button>
    </div>
  );
};

export default UploadFileState;
