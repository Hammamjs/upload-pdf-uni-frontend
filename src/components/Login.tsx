import { Link } from 'react-router-dom';
import { Mail, FileText, LogIn } from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import useLogin from '../hooks/useLogin';
import CustomInput from './shared/CustomInput';

const Login = () => {
  const { handleLogin, isSubmitting, errors, register, handleSubmit } =
    useLogin();

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <LoadingAnimation size="lg" color="blue" text="Signing you in..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FileText className="h-12 w-12 text-blue-400" />
            <span className="text-3xl font-bold text-white">Digital</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <CustomInput
              Icons={Mail}
              error={errors.email}
              label=" Email Address"
              placeholder="Enter your email"
              type="text"
              register={register}
              name="email"
            />

            {/* Password Field */}
            <CustomInput
              error={errors.password}
              type="password"
              register={register}
              name="password"
              placeholder="Enter your password"
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
