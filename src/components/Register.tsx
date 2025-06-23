import { Link } from 'react-router-dom';
import {
  Mail,
  FileText,
  User,
  GraduationCap,
  Building,
  UserPlus,
} from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import CustomInput from './shared/CustomInput';
import useRegister from '@/hooks/useRegister';
import DropDown from './shared/DropDown';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';

const Register = () => {
  const {
    errors,
    handleRegisteration,
    handleSubmit,
    register,
    isLoading,
    isSuccess,
  } = useRegister();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <LoadingAnimation
            size="lg"
            color="purple"
            text="Creating your account..."
          />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Account Created!
            </h2>
            <p className="text-gray-300 mb-6">
              Your account has been successfully created. You can now sign in
              with your credentials.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200"
            >
              <span>Go to Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FileText className="h-12 w-12 text-purple-400" />
            <span className="text-3xl font-bold text-white">PDFHub</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-300">Join our academic community today</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form
            onSubmit={handleSubmit(handleRegisteration)}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <CustomInput
                  type="text"
                  register={register}
                  Icons={User}
                  error={errors.studentname}
                  name="studentname"
                  placeholder="Student name *"
                  label="Student name"
                />
              </div>

              {/* Email */}
              <div>
                <CustomInput
                  type="text"
                  register={register}
                  Icons={Mail}
                  error={errors.email}
                  name="email"
                  placeholder="Student Email *"
                  label="Email"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Index */}
              <div>
                <CustomInput
                  type="text"
                  register={register}
                  Icons={GraduationCap}
                  error={errors.index}
                  name="index"
                  placeholder="Student index *"
                  label="Student index"
                />
              </div>

              {/* Department */}
              <div>
                <DropDown
                  values={[...DEPARTMENTS]}
                  Icon={Building}
                  name="department"
                  register={register}
                  title="Department"
                />
              </div>
            </div>

            {/* Year and Semester */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year */}
              <div>
                <DropDown
                  values={[...FILE_BELONG_TO]}
                  Icon={Building}
                  name="year"
                  register={register}
                  title="year"
                />
              </div>

              {/* Semester */}
              <div>
                <DropDown
                  values={[...SEMESTER]}
                  Icon={Building}
                  name="semester"
                  register={register}
                  title="semester"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <CustomInput
                  type="password"
                  error={errors.newPassword}
                  name="newPassword"
                  register={register}
                  placeholder="Enter password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <CustomInput
                  type="password"
                  error={errors.newPassword}
                  name="confirmPassword"
                  register={register}
                  placeholder="confirm password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <UserPlus className="h-5 w-5" />
              <span>Create Account</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
