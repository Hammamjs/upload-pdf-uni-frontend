import { Award, Calendar, RefreshCw, Star, User } from 'lucide-react';

const StudentResultCard = ({
  gpa,
  handleRefresh,
  isValidating,
  name,
  remark,
  studentIdx,
}: {
  name: string;
  studentIdx: string;
  gpa: string;
  remark: string;
  isValidating: boolean;
  handleRefresh: () => void;
}) => {
  const getRemarkColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-400 bg-green-500/20';
    if (gpa >= 3) return 'text-blue-400 bg-blue-500/20';
    if (gpa >= 2) return 'text-yellow-400 bg-yellow-500/20';
    if (gpa < 2) return 'text-red-400 bg-red-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
        <div className="flex items-center justify-between mb-6 flex-col gap-2 md:flex-row">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
              <p className="text-gray-300 text-lg">Index: {studentIdx}</p>
            </div>
          </div>
          <button
            onClick={() => handleRefresh()}
            disabled={isValidating}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-5 w-5 ${isValidating ? 'animate-spin' : ''}`}
            />
            <span>{isValidating ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">GPA</h3>
            <p className="text-3xl font-bold text-yellow-400">{gpa}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-center">
            <Star className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Remark</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getRemarkColor(
                Number(gpa)
              )}`}
            >
              {remark}
            </span>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Current Semester
            </h3>
            <p className="text-lg font-medium text-blue-400">First Semester</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResultCard;
