import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-indigo-200 rounded-full opacity-25 animate-bounce delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-8 z-10 max-w-md mx-auto px-4">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-8xl font-bold text-gray-300 animate-pulse select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search
              className="h-16 w-16 text-gray-400 animate-spin"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
          <p className="text-sm text-gray-500">
            Attempted to access:{' '}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {location.pathname}
            </span>
          </p>
        </div>

        {/* Countdown and Actions */}
        <div className="space-y-6 animate-fade-in delay-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border">
            <p className="text-gray-700 mb-4">Redirecting to home page in</p>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {countdown}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoHome}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Home className="h-5 w-5" />
              Go Home Now
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Fun Animation */}
        <div className="flex justify-center space-x-2 animate-fade-in delay-500">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div
          className="w-20 h-20 border-4 border-purple-300 rounded-full animate-spin"
          style={{ animationDuration: '10s' }}
        ></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div
          className="w-16 h-16 border-4 border-blue-300 rounded-full animate-spin"
          style={{ animationDuration: '8s' }}
        ></div>
      </div>
    </div>
  );
};

export default NotFound;
