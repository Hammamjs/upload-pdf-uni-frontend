import {
  FileText,
  Download,
  Upload,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

const SuspenseLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-l border-white/20 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo and Brand */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <FileText className="h-16 w-16 text-blue-400 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full animate-ping" />
            </div>
            <div className="text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                PDFHub
              </span>
            </div>
          </div>
          <p className="text-xl text-gray-300 animate-pulse">
            Loading your academic resources...
          </p>
        </div>

        {/* Animated Icons Circle */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <div
            className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin"
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute inset-2 border-2 border-purple-500/30 rounded-full animate-spin"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          />

          {/* Floating Icons */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div
              className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: '0s' }}
            >
              <Download className="h-6 w-6 text-blue-400" />
            </div>
          </div>

          <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
            <div
              className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: '0.5s' }}
            >
              <Upload className="h-6 w-6 text-purple-400" />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div
              className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: '1s' }}
            >
              <BookOpen className="h-6 w-6 text-green-400" />
            </div>
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2">
            <div
              className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: '1.5s' }}
            >
              <GraduationCap className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-80 mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Initializing...</span>
            <span className="animate-pulse">Please wait</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
              <div
                className="absolute top-0 left-0 h-full w-1/3 bg-white/30 rounded-full animate-bounce"
                style={{ animationDuration: '2s' }}
              />
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-3 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm animate-pulse">
              Loading application...
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-300">
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <span
              className="text-sm animate-pulse"
              style={{ animationDelay: '0.5s' }}
            >
              Fetching resources...
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-300">
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <span
              className="text-sm animate-pulse"
              style={{ animationDelay: '1s' }}
            >
              Preparing interface...
            </span>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-500/10 to-transparent animate-pulse" />
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-500/10 to-transparent animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  );
};

export default SuspenseLoader;
