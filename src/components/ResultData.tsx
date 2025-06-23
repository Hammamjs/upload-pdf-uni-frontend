import { BookOpen, Calendar } from 'lucide-react';
import type { ResultProps } from '../types';

const ResultData = ({ semester, subject, grade }: ResultProps) => {
  const getGradeColor = (grade: string) => {
    if (!grade) return;
    if (grade.replace(/[+*]/g, '').startsWith('A'))
      return 'text-green-400 bg-green-500/20';
    if (grade.replace(/[+*]/g, '').startsWith('B'))
      return 'text-blue-400 bg-blue-500/20';
    if (grade.replace(/[+*]/g, '').startsWith('C'))
      return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  if (!subject) return;
  return (
    <>
      <tr className="hover:bg-white/5 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-white font-medium">{semester}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-white">{subject}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="text-gray-300 font-medium">6</span>
        </td>
        <td className="px-6 py-4 text-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
              grade
            )}`}
          >
            {grade}
          </span>
        </td>
      </tr>
    </>
  );
};

export default ResultData;
