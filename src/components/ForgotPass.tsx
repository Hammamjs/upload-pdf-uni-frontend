import { Link } from 'react-router-dom';
import {
  Mail,
  ArrowLeft,
  Send,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import useForgotPassword from '@/hooks/useForgotPassword';

const ForgotPassword = () => {
  const {
    email,
    error,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  } = useForgotPassword();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <LoadingAnimation
            size="lg"
            color="purple"
            text="Sending reset link..."
          />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center relative overflow-hidden">
            {/* Success Animation Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />

            {/* Floating Success Elements */}
            <div
              className="absolute top-4 left-4 w-3 h-3 bg-green-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="absolute top-8 right-6 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute bottom-6 left-8 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '1s' }}
            />

            <div className="relative z-10">
              {/* Success Icon with Animation */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle className="h-10 w-10 text-white animate-bounce" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-green-400/20 rounded-full mx-auto animate-ping" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Email Sent!
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We've sent a password reset link to <br />
                <span className="text-green-400 font-medium">{email}</span>
              </p>

              {/* Instructions */}
              <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-start space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">
                      The link will expire in{' '}
                      <span className="text-blue-400 font-medium">
                        15 minutes
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">
                      Check your spam folder if you don't see the email
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/verify-code"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Enter Verification Code</span>
                </Link>

                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Login</span>
                </Link>
              </div>

              {/* Resend Option */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">
                  Didn't receive the email?
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/6 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="relative mb-8">
            {/* Animated Mail Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Mail className="h-10 w-10 text-white animate-bounce" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping" />
            </div>

            {/* Floating Elements */}
            <div
              className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        {/* Reset Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />

          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-purple-400 transition-colors duration-200" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      error
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-white/20 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {/* Focus Ring Animation */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 -z-10" />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400 animate-pulse">
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <Send className="h-5 w-5 group-hover:animate-pulse" />
                <span>Send Reset Link</span>
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">
              Secure password recovery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
