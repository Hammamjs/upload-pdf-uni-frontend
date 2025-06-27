import { AlertTriangle, RefreshCw, Home, Bug, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorfallbackProps {
  error?: Error;
  resetError?: () => void;
}

const Errorfallback = ({ error, resetError }: ErrorfallbackProps) => {
  const handleRefresh = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-25 animate-bounce delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-8 z-10 max-w-md mx-auto px-4">
        {/* Animated Error Icon */}
        <div className="relative">
          <div className="p-6 bg-red-100 rounded-full inline-block animate-pulse">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>

          {/* Floating Error Icons */}
          <div className="absolute -top-4 -left-8 animate-bounce delay-100">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Bug className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="absolute -top-6 -right-6 animate-bounce delay-300">
            <div className="p-2 bg-red-500 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800">
            Oops! Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600">
            We encountered an unexpected error. Don't worry, our digital repair
            crew is on it!
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <p className="text-sm text-red-700 font-mono">
                <strong>Error:</strong> {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-6 animate-fade-in delay-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border">
            <p className="text-gray-700 mb-4">Let's get you back on track</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>

              <Button
                variant="outline"
                onClick={handleGoHome}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Home className="h-5 w-5" />
                Go Home
              </Button>
            </div>
          </div>
        </div>

        {/* Fun Animation */}
        <div className="flex justify-center space-x-2 animate-fade-in delay-500">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
        </div>

        {/* Error Code Display */}
        <div className="animate-fade-in delay-700">
          <p className="text-xs text-gray-500 font-mono">
            Error Code: ERR_{Date.now().toString().slice(-6)}
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div
          className="w-20 h-20 border-4 border-red-300 rounded-full animate-spin"
          style={{ animationDuration: '10s' }}
        ></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div
          className="w-16 h-16 border-4 border-orange-300 rounded-full animate-spin"
          style={{ animationDuration: '8s' }}
        ></div>
      </div>

      {/* Lightning Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/6 left-1/6 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping delay-2500"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-3000"></div>
      </div>
    </div>
  );
};

export default Errorfallback;
