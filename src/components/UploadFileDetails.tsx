import {
  Upload,
  File,
  X,
  CheckCircle,
  Cloud,
  BookOpen,
  ChevronDown,
  Tag,
} from 'lucide-react';
import useFileInfo from '@/hooks/useFileInfo';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';

const UploadPage = () => {
  const {
    dragActive,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileInputChange,
    handleInputChange,
    handleKeyDown,
    handleSubjectChange,
    handleSubmit,
    isFormValid,
    isUploading,
    removeFile,
    resetForm,
    subjectInputRef,
    suggestionsRef,
    uploadComplete,
    uploadProgress,
    formData,
    selectSuggestion,
    filteredSuggestions,
    selectedSuggestionIndex,
    setShowSuggestions,
    showSuggestions,
    selectedSubject,
    fileTypeAccepted,
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-400 bg-blue-500/10'
                  : formData.file
                  ? 'border-green-400 bg-green-500/10'
                  : 'border-gray-400 hover:border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={fileTypeAccepted.join(',')}
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {!formData.file ? (
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
                    <File className="h-8 w-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">
                        {formData.file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Field with Autocomplete */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                  <span className="text-xs text-blue-400 ml-2">
                    (Type to search and autocomplete)
                  </span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    ref={subjectInputRef}
                    type="text"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleSubjectChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() =>
                      formData.subject &&
                      setShowSuggestions(filteredSuggestions.length > 0)
                    }
                    className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Computer Science, Math, Physics..."
                    required
                  />
                  <ChevronDown
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform duration-200 ${
                      showSuggestions ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-1 bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={`${suggestion.code}-${index}`}
                        onClick={() => selectSuggestion(suggestion)}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-150 border-b border-white/10 last:border-b-0 ${
                          index === selectedSuggestionIndex
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'hover:bg-white/10 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{suggestion.name}</p>
                            <p className="text-sm text-gray-400">
                              {suggestion.code}
                            </p>
                            {suggestion.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                {suggestion.description}
                              </p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-blue-400">
                              {suggestion.semester} {suggestion.year}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {suggestion.departments.map((dept, deptIndex) => (
                                <span
                                  key={deptIndex}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {dept}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredSuggestions.length === 0 && formData.subject && (
                      <div className="px-4 py-3 text-gray-400 text-center">
                        No subjects found. You can still enter a custom subject.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter document title"
                  required
                />
              </div>

              {/* File Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  File Name *
                </label>
                <input
                  type="text"
                  name="fileName"
                  value={formData.fileName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter file name"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Department *
                  {selectedSubject &&
                    selectedSubject.departments.length > 1 && (
                      <span className="text-xs text-yellow-400 ml-2">
                        (Multiple options available)
                      </span>
                    )}
                  {formData.department &&
                    selectedSubject &&
                    selectedSubject.departments.includes(
                      formData.department
                    ) && (
                      <span className="text-xs text-green-400 ml-2">
                        (Auto-filled)
                      </span>
                    )}
                </label>
                <select
                  name="department"
                  value={formData.department || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select Department
                  </option>
                  {/* Show subject-specific departments first if a subject is selected */}
                  {selectedSubject &&
                    selectedSubject.departments.map((dept) => (
                      <option
                        key={`subject-${dept}`}
                        value={dept}
                        className="bg-gray-800 text-green-300"
                      >
                        {dept} (Available for {selectedSubject.name})
                      </option>
                    ))}
                  {/* Show all departments */}
                  {DEPARTMENTS.filter(
                    (dept) =>
                      !selectedSubject ||
                      !selectedSubject.departments.includes(dept)
                  ).map((dept) => (
                    <option key={dept} value={dept} className="bg-gray-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year *
                  {formData.year &&
                    selectedSubject &&
                    selectedSubject.year === formData.year && (
                      <span className="text-xs text-green-400 ml-2">
                        (Auto-filled)
                      </span>
                    )}
                </label>
                <select
                  name="year"
                  value={formData.year || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select Year
                  </option>
                  {FILE_BELONG_TO.map((year) => (
                    <option key={year} value={year} className="bg-gray-800">
                      {year} Year
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Semester *
                  {formData.semester &&
                    selectedSubject &&
                    selectedSubject.semester === formData.semester && (
                      <span className="text-xs text-green-400 ml-2">
                        (Auto-filled)
                      </span>
                    )}
                </label>
                <select
                  name="semester"
                  value={formData.semester || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select Semester
                  </option>
                  {SEMESTER.map((semester) => (
                    <option
                      key={semester}
                      value={semester}
                      className="bg-gray-800"
                    >
                      {semester} Semester
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multi-Department Subject Info */}
            {selectedSubject && selectedSubject.departments.length > 1 && (
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Tag className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-300 font-medium mb-2">
                      Multi-Department Subject
                    </h4>
                    <p className="text-sm text-blue-200 mb-3">
                      <strong>{selectedSubject.name}</strong> is offered by
                      multiple departments. Choose the most relevant one for
                      your upload:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubject.departments.map((dept, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                            formData.department === dept
                              ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                              : 'bg-blue-500/10 text-blue-300 border border-blue-400/20'
                          }`}
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auto-fill Indicator */}
            {selectedSubject && (
              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Smart Auto-fill Active</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  Fields have been automatically filled based on your subject
                  selection. You can modify them if needed.
                </p>
                {selectedSubject.description && (
                  <p className="text-sm text-green-200 mt-2 italic">
                    "{selectedSubject.description}"
                  </p>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {isUploading && (
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
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid || isUploading}
                className={`inline-flex items-center px-8 py-3 font-medium rounded-lg transition-all duration-200 ${
                  isFormValid && !isUploading
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
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
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Upload Successful!
            </h3>
            <p className="text-gray-300 mb-6">
              Your file has been uploaded successfully and is now available for
              download.
            </p>
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">File:</span>
                  <span className="text-white">{formData.file?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-white">{formData.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Title:</span>
                  <span className="text-white">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white">{formData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white">{formData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-white">{formData.semester}</span>
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
        )}
      </div>
    </div>
  );
};

export default UploadPage;
