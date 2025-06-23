import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import useVerificationCode from '@/hooks/useVerificationCode';

const VerifyCode = () => {
  const {
    timeLeft,
    isLoading,
    isResending,
    formatTime,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleResendCode,
    handleSubmit,
    code,
    error,
    inputRefs,
  } = useVerificationCode();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <LoadingAnimation size="lg" color="blue" text="Verifying code..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="relative mb-8">
            {/* Animated Shield Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Shield className="h-10 w-10 text-white animate-pulse" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
            </div>

            {/* Security Indicators */}
            <div
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-400/40 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce"
              style={{ animationDelay: '0.7s' }}
            />
            <div
              className="absolute top-1/2 -right-4 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce"
              style={{ animationDelay: '1.4s' }}
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We've sent a 6-digit verification code to your email address. Enter
            it below to continue.
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5" />

          <div className="relative z-10">
            {/* Timer Display */}
            <div className="flex items-center justify-center mb-6">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                  timeLeft > 60
                    ? 'bg-green-500/20 border-green-400/30 text-green-300'
                    : timeLeft > 0
                    ? 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300'
                    : 'bg-red-500/20 border-red-400/30 text-red-300'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}
                </span>
              </div>
            </div>

            {/* Code Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                Enter 6-digit verification code
              </label>
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value.replace(/\D/g, '')
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-14 text-center text-xl font-bold bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                      error
                        ? 'border-red-400 focus:ring-red-500'
                        : digit
                        ? 'border-green-400 focus:ring-green-500 bg-green-500/10'
                        : 'border-white/20 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    disabled={timeLeft === 0}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 mt-3 text-red-400 animate-pulse">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Manual Submit Button (if needed) */}
            {code.every((digit) => digit !== '') && !isLoading && (
              <button
                onClick={() => handleSubmit()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Verify Code</span>
              </button>
            )}

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                disabled={timeLeft > 0 || isResending}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeLeft > 0 || isResending
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200'
                }`}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`}
                />
                <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
              </button>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center pt-4 border-t border-white/10">
              <Link
                to="/forgot-password"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Email Entry</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">
                Security Tip
              </h4>
              <p className="text-xs text-gray-400">
                Never share your verification code with anyone. We'll never ask
                for it over the phone or email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
