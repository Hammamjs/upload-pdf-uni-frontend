import {
  FileText,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Tag,
  User,
  AlertTriangle,
} from 'lucide-react';

import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import usePDFManagement from '@/hooks/usePDFManagement';

const PDFManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    clearFilters,
    confirmDelete,
    filteredAndSortedPDFs,
    getSortIcon,
    handleDelete,
    handleEdit,
    handleEditFormChange,
    handleSaveEdit,
    handleSort,
    handleTagsChange,
    hasActiveFilters,
    pdfFiles,
    setViewingPDF,
    viewingPDF,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    selectedSemester,
    selectedYear,
    setSelectedSemester,
    setSelectedYear,
    editFormData,
    deletingPDF,
    editingPDF,
    setDeletingPDF,
    setEditingPDF,
    selectedSubject,
    setSelectedSubject,
    subjectFiltered,
  } = usePDFManagement();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">PDF Management</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          View, edit, and manage all PDF files in the system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Total PDFs</p>
              <p className="text-2xl font-bold text-white">{pdfFiles.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search PDFs by title, filename, subject, uploader, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">
                All Departments
              </option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className="bg-gray-800">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">
                All Semesters
              </option>
              {SEMESTER.map((semester) => (
                <option key={semester} value={semester} className="bg-gray-800">
                  {semester} semster
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">
                All Years
              </option>
              {FILE_BELONG_TO.map((year) => (
                <option key={year} value={year} className="bg-gray-800">
                  {year} year
                </option>
              ))}
            </select>
          </div>

          {/* Subject filter */}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 w-full">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800 w-full">
                All Subjects
              </option>
              {subjectFiltered?.map((file: string) => (
                <option key={file} value={file} className="bg-gray-800 text-xs">
                  {file}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                hasActiveFilters
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-400/30'
                  : 'bg-gray-600/20 text-gray-500 cursor-not-allowed border border-gray-600/20'
              }`}
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-300 text-sm">Sort by:</span>
          <div className="flex space-x-2 ">
            {[
              { key: 'title', label: 'Title' },
              { key: 'uploadDate', label: 'Upload Date' },
              { key: 'size', label: 'Size' },
            ].map(({ key, label }) => {
              const SortIcon = getSortIcon(key);
              return (
                <button
                  key={key}
                  onClick={() => handleSort(key as any)}
                  className={`flex text-xs items-center space-x-1 px-1.5 py-2 md:px-3 md:py-2 rounded-lg md:text-sm font-medium transition-all duration-200 ${
                    sortBy === key
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span>{label}</span>
                  <SortIcon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {filteredAndSortedPDFs.length} PDF
          {filteredAndSortedPDFs.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredAndSortedPDFs.map((pdf) => {
          return (
            <div
              key={pdf._id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 mb-1">
                      {pdf.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">
                      {pdf.subject}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-white font-medium">{pdf.subject}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white">{pdf.departments.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white">{pdf.year}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white">
                    {(pdf.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-white font-medium">{pdf.semester}</span>
                </div>
              </div>

              {/* Description */}
              {pdf.description && (
                <div className="mb-4">
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {pdf.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {pdf.departments.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {pdf.departments.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {pdf.departments.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                        +{pdf.departments.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Uploader Info */}
              <div className="flex items-center space-x-2 mb-4 p-3 bg-white/5 rounded-lg">
                <User className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">
                    {pdf.uploader?.name || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {pdf.uploader?.email ?? 'un@un.com'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Uploaded</p>
                  <p className="text-xs text-white">
                    {new Date(pdf.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex space-x-2"></div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(pdf)}
                    className="p-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded-lg transition-colors duration-200"
                    title="Edit PDF"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pdf)}
                    className="p-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors duration-200"
                    title="Delete PDF"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredAndSortedPDFs.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No PDFs found
          </h3>
          <p className="text-gray-400 mb-4">
            {hasActiveFilters
              ? 'No PDFs match your current search and filter criteria'
              : 'No PDFs have been uploaded yet'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      )}

      {/* View PDF Modal */}
      {viewingPDF && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">PDF Preview</h3>
              <button
                onClick={() => setViewingPDF(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-white/10 rounded-lg p-8 text-center">
                <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  {viewingPDF.title}
                </h4>
                <p className="text-gray-300 mb-4">{viewingPDF.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="text-gray-400">Filename:</p>
                    <p className="text-white font-mono">{viewingPDF.subject}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400">Size:</p>
                    <p className="text-white">{viewingPDF.size}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400">Subject:</p>
                    <p className="text-white">{viewingPDF.subject}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400">Department:</p>
                    <p className="text-white">{viewingPDF.departments}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setViewingPDF(null);
                      handleEdit(viewingPDF);
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit PDF Modal */}
      {editingPDF && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">Edit PDF Details</h3>
              <button
                onClick={() => setEditingPDF(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title || ''}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={editFormData.subject || ''}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={editFormData.departments || ''}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="bg-gray-800">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={editFormData.semester || ''}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {SEMESTER.map((semester) => (
                        <option
                          key={semester}
                          value={semester}
                          className="bg-gray-800"
                        >
                          {semester} semester
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year
                    </label>
                    <select
                      name="year"
                      value={editFormData.year || ''}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {FILE_BELONG_TO.map((year) => (
                        <option key={year} value={year} className="bg-gray-800">
                          {year} Year
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description || ''}
                    onChange={handleEditFormChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editFormData.departments?.join(', ') || ''}
                    onChange={handleTagsChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., mathematics, calculus, textbook"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingPDF(null)}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPDF && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Delete PDF</h3>
                  <p className="text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-white font-medium mb-1">
                  {deletingPDF.title}
                </p>
                <p className="text-gray-400 text-sm">{deletingPDF.subject}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeletingPDF(null)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deletingPDF._id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFManagement;
