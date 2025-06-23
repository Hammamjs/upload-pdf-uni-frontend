import { RefObject, useEffect, useState } from 'react';
import { Upload, File as FileIcon, X, Cloud } from 'lucide-react';
import type { UploadFormData } from '@/types';
import { UseFormRegister } from 'react-hook-form';

type InputFile = {
  dragActive?: boolean;
  handleDrag?: (e: React.DragEvent) => void;
  handleFileInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop?: (e: React.DragEvent) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  formData?: UploadFormData;
  removeFile?: () => void;
  register?: UseFormRegister<any>;
  file: FileList;
};

const InputFileType = ({
  handleDrag,
  handleDrop,
  dragActive,
  formData,
  register,
  file,
}: // name
InputFile) => {
  const [actualFile, setActualFile] = useState<File | null>(null);
  useEffect(() => {
    if (file instanceof FileList && file.length > 0) {
      setActualFile(file[0]);
    }
  }, [file]);
  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
        dragActive
          ? 'border-blue-400 bg-blue-500/10'
          : formData?.file
          ? 'border-green-400 bg-green-500/10'
          : 'border-gray-400 hover:border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        {...register!('file')}
      />

      {!actualFile ? (
        <div>
          <Cloud
            className={`mx-auto h-16 w-16 mb-4 ${
              dragActive ? 'text-blue-400' : 'text-gray-400'
            }`}
          />
          <h3 className="text-xl font-semibold text-white mb-2">
            {dragActive ? 'Drop your PDF here' : 'Upload PDF file'}
          </h3>
          <p className="text-gray-400 mb-4">
            Drag and drop your file here, or click to browse
          </p>
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Upload className="h-5 w-5 mr-2" />
            Choose File
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileIcon className="h-8 w-8 text-green-400" />
            <div className="text-left">
              <p className="text-white font-medium">
                {actualFile?.name || 'unknown'}
              </p>
              <p className="text-gray-400 text-sm">
                {(actualFile?.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActualFile(null)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InputFileType;
