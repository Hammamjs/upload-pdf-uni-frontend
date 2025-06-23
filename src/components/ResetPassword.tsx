import { Link } from 'react-router-dom';
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Shield,
  Key,
  ArrowLeft,
  Mail,
} from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import useResetPassword from '@/hooks/useResetPassword';

const ResetPassword = () => {
  const {
    isLoading,
    isSuccess,
    setShowConfirmPassword,
    errors,
    formData,
    showConfirmPassword,
    handleInputChange,
    handleSubmit,
    passwordStrength,
    showPassword,
    setShowPassword,
    navigate,
  } = useResetPassword();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <LoadingAnimation
            size="lg"
            color="green"
            text="Updating password..."
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
                Password Reset Successful!
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </p>

              {/* Security Confirmation */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Your account is now secure
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate('/login')}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Continue to Login</span>
              </button>
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
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/6 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="relative mb-8">
            {/* Animated Key Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Key className="h-10 w-10 text-white animate-pulse" />
              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
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
            Create New Password
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Choose a strong password to secure your account. Make sure it's
            something you'll remember!
          </p>
        </div>

        {/* Reset Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5" />

          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-200" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    className={`w-full pl-10 pr-12 py-3 bg-white/20 opacity-25 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 cursor-not-allowed`}
                    placeholder="Email"
                    disabled={true}
                  />
                </div>
              </div>
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-200" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-white/20 focus:ring-green-500 focus:border-transparent'
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">
                        Password Strength
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.color === 'red'
                            ? 'text-red-400'
                            : passwordStrength.color === 'yellow'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.color === 'red'
                            ? 'bg-red-500'
                            : passwordStrength.color === 'yellow'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Password Requirements */}
                    <div className="mt-2 space-y-1">
                      {Object.entries(passwordStrength.checks).map(
                        ([key, passed]) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                passed ? 'bg-green-400' : 'bg-gray-500'
                              }`}
                            />
                            <span
                              className={`text-xs ${
                                passed ? 'text-green-400' : 'text-gray-400'
                              }`}
                            >
                              {key === 'length' && '8+ characters'}
                              {key === 'lowercase' && 'Lowercase letter'}
                              {key === 'uppercase' && 'Uppercase letter'}
                              {key === 'number' && 'Number'}
                              {key === 'special' && 'Special character'}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-2 text-sm text-red-400 animate-pulse">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-200" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:ring-red-500'
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? 'border-green-400 focus:ring-green-500'
                        : 'border-white/20 focus:ring-green-500 focus:border-transparent'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        formData.password === formData.confirmPassword
                          ? 'bg-green-400'
                          : 'bg-red-400'
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        formData.password === formData.confirmPassword
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {formData.password === formData.confirmPassword
                        ? 'Passwords match'
                        : 'Passwords do not match'}
                    </span>
                  </div>
                )}

                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400 animate-pulse">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <Shield className="h-5 w-5 group-hover:animate-pulse" />
                <span>Update Password</span>
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <Link
                to="/verify-code"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Verification</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">
                Security Reminder
              </h4>
              <p className="text-xs text-gray-400">
                Use a unique password that you don't use for other accounts.
                Consider using a password manager for better security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
