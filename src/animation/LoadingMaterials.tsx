import { BookOpen, GraduationCap, FileText, Loader } from 'lucide-react';

const LoadingMaterials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="animate-pulse">
            <div className="p-4 bg-blue-600 rounded-full inline-block">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute -top-8 -left-8 animate-bounce delay-100">
            <div className="p-2 bg-green-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="absolute -top-4 -right-8 animate-bounce delay-300">
            <div className="p-2 bg-purple-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="absolute -bottom-6 left-0 animate-bounce delay-500">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Loader className="h-6 w-6 text-white animate-spin" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 animate-fade-in">
            Loading Academic Resources
          </h2>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-75"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>

          <p className="text-gray-600 animate-fade-in delay-300">
            Preparing your study materials...
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-500"></div>
        </div>

        {/* Rotating Ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-32 h-32 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMaterials;
