import { Upload } from 'lucide-react';
import InputFileType from './shared/InputFileType';
import InputText from './shared/InputText';
import DropDown from './shared/DropDown';
import DepartmentDropDown from './shared/DepartmentDropDown';
import UploadFileProgressbar from './UploadFileProgressbar';
import UploadFileState from './UploadFileState';
import useFileInfo from '@/hooks/useFileInfo';
import { FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';

const UploadFileDetails = () => {
  const {
    handleOnUploadFile,
    uploadProgress,
    isUploading,
    dragActive,
    file,
    fileInputRef,
    getValues,
    handleDrag,
    handleDrop,
    handleFileInputChange,
    handleSubmit,
    isFormValid,
    register,
    selectedDepartments,
    setSelectedDepartments,
    uploadComplete,
    reset,
  } = useFileInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Upload Files</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Share your academic resources with the community
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        {!uploadComplete ? (
          <form
            onSubmit={handleSubmit((data) =>
              handleOnUploadFile(data, selectedDepartments)
            )}
            className="space-y-6"
          >
            {/* File Upload Area */}
            <InputFileType
              dragActive={dragActive}
              fileInputRef={fileInputRef}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileInputChange={handleFileInputChange}
              register={register}
              file={file}
            />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Name */}

              <InputText
                label="Subject"
                placeholder="Enter subject name"
                name="subject"
                register={register}
              />

              {/* Title */}

              <InputText
                label="Title"
                placeholder="Enter document title"
                name="title"
                register={register}
              />

              {/* Year */}

              <DropDown
                register={register}
                values={[...FILE_BELONG_TO]}
                title="Select year"
                name="year"
              />

              {/* Semester */}
              <DropDown
                register={register}
                values={[...SEMESTER]}
                title="Select semester"
                name="semester"
              />
            </div>
            <DepartmentDropDown
              selectedDepartments={selectedDepartments}
              setSelectedDepartments={setSelectedDepartments}
            />

            {/* Progress Bar */}
            {isUploading && (
              <UploadFileProgressbar uploadProgress={uploadProgress} />
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid || isUploading}
                className={`inline-flex items-center px-8 py-3 font-medium rounded-lg transition-all duration-200 ${
                  isFormValid && !isUploading
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload File
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success State */
          <UploadFileState
            name={getValues('file')[0].name}
            resetForm={reset}
            semester={getValues('semester')}
            title={getValues('title')}
            year={getValues('year')}
          />
        )}
      </div>
    </div>
  );
};

export default UploadFileDetails;
