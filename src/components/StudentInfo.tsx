import { User, Mail, GraduationCap, Save } from 'lucide-react';
import LoadingAnimation from '../animation/LoadingAnimation';
import ProfileHeader from './ProfileHeader';
import CustomInput from './shared/CustomInput';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import DropDown from './shared/DropDown';
import useStudentInfo from '@/hooks/useStudentInfo';

const ProfilePage = () => {
  const {
    handleSubmit,
    isLoading,
    updateStudent,
    errors,
    register,
    student,
    isEditing,
    handleCancel,
    setIsEditing,
  } = useStudentInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
        <p className="text-xl text-gray-300">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        {/* Profile Header */}
        <ProfileHeader
          name={student?.name || 'no name'}
          department={student?.department || 'no dep'}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          studentIdx={student?.studentIdx || 'CS676730'}
        />

        {/* Profile Form */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingAnimation
                size="lg"
                color="blue"
                text="Updating profile..."
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit(updateStudent)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <CustomInput
                      type="text"
                      label="Full Name *"
                      error={errors.studentname}
                      Icons={User}
                      isDisabled={!isEditing}
                      register={register}
                      name="studentname"
                      placeholder="Enter Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <CustomInput
                      type="email"
                      label="Email Address *"
                      error={errors.email}
                      Icons={Mail}
                      isDisabled={!isEditing}
                      register={register}
                      name="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Index */}
                  <div>
                    <CustomInput
                      type="email"
                      label="Student index *"
                      error={errors.index}
                      Icons={GraduationCap}
                      isDisabled={!isEditing}
                      register={register}
                      name="index"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <DropDown
                      values={[...DEPARTMENTS]}
                      name="department"
                      title="Select department"
                      register={register}
                      isDisabled={!isEditing}
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <DropDown
                      values={[...FILE_BELONG_TO]}
                      name="year"
                      title="Academic Year"
                      register={register}
                      isDisabled={!isEditing}
                    />
                  </div>

                  {/* Semester */}
                  <div>
                    <DropDown
                      values={[...SEMESTER]}
                      name="semester"
                      title="Semester"
                      register={register}
                      isDisabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Password Change Section */}
              {isEditing && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Change Password (Optional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Password */}
                    <CustomInput
                      type="password"
                      name="currentPassword"
                      error={errors.currentPassword}
                      register={register}
                      placeholder="Enter current password"
                      label="Current password"
                    />

                    {/* New Password */}

                    <CustomInput
                      type="password"
                      name="newPassword"
                      error={errors.newPassword}
                      register={register}
                      placeholder="Enter new password"
                      label="New password"
                    />

                    {/* Confirm Password */}

                    <CustomInput
                      type="password"
                      name="confirmPassword"
                      error={errors.confirmPassword}
                      register={register}
                      placeholder="Confirm your new password"
                      label="Confirm password"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
