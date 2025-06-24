import { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Save, X, Image } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
  department: string;
  semester: string;
  year: string;
  creditHours: number;
  coverImage?: string;
  description: string;
}

const AddSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH301',
      department: 'Mathematics',
      semester: 'Fall',
      year: '2024',
      creditHours: 3,
      coverImage:
        'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Advanced mathematical concepts and applications',
    },
    {
      id: 2,
      name: 'Computer Science Fundamentals',
      code: 'CS101',
      department: 'Computer Science',
      semester: 'Spring',
      year: '2024',
      creditHours: 4,
      coverImage:
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      description:
        'Introduction to programming and computer science principles',
    },
  ]);

  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: '',
    code: '',
    department: '',
    semester: '',
    year: '',
    creditHours: 0,
    coverImage: '',
    description: '',
  });

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Engineering',
    'Business',
  ];
  const semesters = ['Spring', 'Fall', 'Summer'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear + i).toString()
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'creditHours' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubject
            ? ({ ...subject, ...formData } as Subject)
            : subject
        )
      );
      setEditingSubject(null);
    } else {
      const newSubject: Subject = {
        ...(formData as Subject),
      };
      setSubjects((prev) => [...prev, newSubject]);
      setIsAddingSubject(false);
    }

    resetForm();
  };

  const handleEdit = (subject: Subject) => {
    setFormData(subject);
    setEditingSubject(subject.id);
    setIsAddingSubject(true);
  };

  const handleDelete = (id: number) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      department: '',
      semester: '',
      year: '',
      creditHours: 0,
      coverImage: '',
      description: '',
    });
    setIsAddingSubject(false);
    setEditingSubject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Subject Management
          </h1>
          <p className="text-xl text-gray-300">
            Manage academic subjects and course information
          </p>
        </div>
        <button
          onClick={() => setIsAddingSubject(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Add Subject</span>
        </button>
      </div>

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
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select Department
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-gray-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Credit Hours *
                </label>
                <input
                  type="number"
                  name="creditHours"
                  value={formData.creditHours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter credit hours"
                  min="1"
                  max="6"
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
                  {semesters.map((semester) => (
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
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-gray-800">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
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
        {subjects.map((subject) => (
          <div
            key={subject.id}
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
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white font-medium">
                    {subject.department}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-white font-medium">
                    {subject.semester} {subject.year}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Credit Hours:</span>
                  <span className="text-white font-medium">
                    {subject.creditHours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default AddSubject;
