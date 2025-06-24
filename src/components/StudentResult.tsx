import { useState } from 'react';
import useStudentResult from '@/hooks/useStudentResult';
import StudentResultTable from './StudentResultTable';
import ResultData from './ResultData';
import NoResultFound from './NoResultFound';
import StudentResultCard from './StudentResultCard';

const StudentResults = () => {
  const [selectedSemester, setSelectedSemester] = useState('all');

  const { result, student, handleRefresh, isValidating } = useStudentResult();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Student Results</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          View comprehensive academic performance and grades
        </p>
      </div>

      {/* Student Info Card */}
      <StudentResultCard
        gpa={result!.res.gpa}
        handleRefresh={handleRefresh}
        isValidating={isValidating}
        name={student!.name}
        remark={result!.res.remark}
        studentIdx={student!.studentIdx}
      />

      {/* Semester Filter */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Academic Results</h3>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all" className="bg-gray-800">
              All Semesters
            </option>
            {/* {semesters.map((semester) => (
              <option key={semester} value={semester} className="bg-gray-800">
                {semester}
              </option>
            ))} */}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <StudentResultTable />
            <tbody className="divide-y divide-white/10">
              {result?.res?.grades
                .slice(0, -2)
                .map(({ grade, ch, semester, subject }, index) => (
                  <ResultData
                    grade={grade}
                    ch={ch}
                    semester={semester}
                    subject={subject}
                    key={index}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {result?.res.grades.length === 0 && <NoResultFound />}
    </div>
  );
};

export default StudentResults;
