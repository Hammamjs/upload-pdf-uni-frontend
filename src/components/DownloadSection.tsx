import { useState } from 'react';
import { Download, FileText, Search, Eye } from 'lucide-react';
import useHome from '@/hooks/useHome';
import useFetchSubjects from '@/hooks/useFetchSubjects';
import { formatDateFns } from '@/utils/dateFormat';

const DownloadSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const { files, filterBySubject } = useFetchSubjects();

  useHome();

  const filteredFiles = files?.filter((file) => {
    const matchesSearch =
      file && file.title.toLowerCase().includes(searchTerm.toLowerCase());
    file.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === 'all' || file.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  const handleDownload = (content: string) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${content}`);
    // Simulate download with a temporary link
    const link = document.createElement('a');
    link.href = '#';
    link.download = content;
    link.click();
  };

  const handlePreview = (view: string) => {
    console.log(`Downloading ${view}`);
    // Simulate download with a temporary link
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.href = view;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Download Center</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Access your academic resources with our comprehensive PDF library
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          {/* Semester Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all" className="bg-gray-800">
                all
              </option>
              {filterBySubject?.map((sub) => (
                <option value={sub} className="bg-gray-800" key={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-300">
          Showing {filteredFiles?.length} of {files?.length} files
        </p>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles?.map((file) => (
          <div
            key={file._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <FileText className="h-8 w-8 text-blue-400 flex-shrink-0" />
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePreview(file.view)}
                  className="p-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors duration-200"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDownload(file.content)}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-200"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {file?.title}
            </h3>

            <p className="text-sm text-gray-400 mb-4 font-mono">
              {file?.subject}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Year:</span>
                <span className="text-white font-medium">{file.year}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Semester:</span>
                <span className="text-white font-medium">{file.semester}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Size:</span>
                <span className="text-white font-medium">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
              <span>{formatDateFns(file.uploadedAt)}</span>
              <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles?.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No files found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadSection;
