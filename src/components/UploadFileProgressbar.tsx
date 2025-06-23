const UploadFileProgressbar = ({
  uploadProgress,
}: {
  uploadProgress: number;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-300">
        <span>Uploading...</span>
        <span>{Math.round(uploadProgress)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    </div>
  );
};

export default UploadFileProgressbar;
