import { Edit, User } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const ProfileHeader = ({
  name,
  department,
  studentIdx,
  isEditing,
  setIsEditing,
}: {
  name: string;
  studentIdx: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  department: string;
}) => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8">
        <div className="flex items-center justify-between flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
              <p className="text-gray-300 text-lg">{studentIdx}</p>
              <p className="text-gray-400">{department}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
