import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Image,
  Tag,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import useSubjectOption from '@/hooks/useSubjectOption';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';

const SubjectManagementPage = () => {
  const {
    clearFilters,
    editingSubject,
    filteredSubjects,
    formData,
    getDepartmentColor,
    handleDelete,
    handleDepartmentToggle,
    handleEdit,
    handleInputChange,
    handleSubmit,
    hasActiveFilters,
    isAddingSubject,
    resetForm,
    searchTerm,
    selectedDepartment,
    selectedSemester,
    setIsAddingSubject,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedSemester,
    setSelectedYear,
    subjects,
    selectedYear,
  } = useSubjectOption();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 flex-wrap gap-3">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Subject Management
          </h1>
          <p className="text-xl text-gray-300">
            Manage academic subjects and their department associations
          </p>
        </div>
        <button
          onClick={() => setIsAddingSubject(true)}
          className="flex items-center space-x-2 px-6 py-3 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search subjects by name, code, description, or department..."
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all" className="bg-gray-800">
                All Semesters
              </option>
              {SEMESTER.map((semester) => (
                <option key={semester} value={semester} className="bg-gray-800">
                  {semester}
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all" className="bg-gray-800">
                All Years
              </option>
              {FILE_BELONG_TO.map((year) => (
                <option key={year} value={year} className="bg-gray-800">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
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

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">
                  Active Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedDepartment !== 'all' && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      Dept: {selectedDepartment}
                    </span>
                  )}
                  {selectedSemester !== 'all' && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      Semester: {selectedSemester}
                    </span>
                  )}
                  {selectedYear !== 'all' && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                      Year: {selectedYear}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {filteredSubjects.length} of {subjects.length} subjects
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {!isAddingSubject && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-300">
              Showing{' '}
              <span className="text-white font-medium">
                {filteredSubjects.length}
              </span>{' '}
              of{' '}
              <span className="text-white font-medium">{subjects.length}</span>{' '}
              subjects
            </p>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-blue-400">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtered results</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Subject Form */}
      {isAddingSubject && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </h2>
            <button
              onClick={resetForm}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., CS101"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Semester *
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select Year
                  </option>
                  {FILE_BELONG_TO.map((year) => (
                    <option key={year} value={year} className="bg-gray-800">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Departments *
                <span className="text-xs text-blue-400 ml-2">
                  (Select all departments that offer this subject)
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DEPARTMENTS.map((department, index) => {
                  const isSelected =
                    formData.departments?.includes(department) || false;
                  return (
                    <button
                      key={department}
                      type="button"
                      onClick={() => handleDepartmentToggle(department)}
                      className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? `${getDepartmentColor(index)} border-current`
                          : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Tag className="h-4 w-4" />
                      <span className="text-sm font-medium">{department}</span>
                    </button>
                  );
                })}
              </div>
              {formData.departments && formData.departments.length > 0 && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-green-400">
                  <Users className="h-4 w-4" />
                  <span>
                    Selected {formData.departments.length} department
                    {formData.departments.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter subject description"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200"
              >
                <Save className="h-5 w-5" />
                <span>{editingSubject ? 'Update Subject' : 'Add Subject'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
              {subject.coverImage ? (
                <img
                  src={subject.coverImage}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(subject)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Multi-Department Indicator */}
              {subject.departments.length > 1 && (
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full">
                    <Users className="h-3 w-3 text-purple-200" />
                    <span className="text-xs text-purple-200 font-medium">
                      {subject.departments.length} Depts
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {subject.name}
                </h3>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded">
                  {subject.code}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {subject.description}
              </p>

              {/* Department Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {subject.departments.map((dept, index) => (
                    <span
                      key={dept}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDepartmentColor(
                        index
                      )}`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-white font-medium">
                    {subject.semester} Semester
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white font-medium">
                    {subject.year} Year
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Departments:</span>
                  <span className="text-white font-medium">
                    {subject.departments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results State */}
      {filteredSubjects.length === 0 && subjects.length > 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No subjects found
          </h3>
          <p className="text-gray-400 mb-4">
            No subjects match your current search and filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span>Clear all filters</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {subjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No subjects found
          </h3>
          <p className="text-gray-400">Start by adding your first subject</p>
        </div>
      )}
    </div>
  );
};

export default SubjectManagementPage;
