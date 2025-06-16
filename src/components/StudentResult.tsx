import ResultData from '../components/ResultData';
import StudentResultTable from '../components/StudentResultTable';
import StudentStatus from '../components/StudentStatus';
import Spinner from '../animation/Spinner';
import useStudentResult from '../hooks/useStudentResult';

const StudentResult = () => {
  const { arrayOfGrades, isLoading, student, result } = useStudentResult();

  return (
    <>
      {isLoading ? (
        <Spinner>
          <p>please wait a moment...</p>
        </Spinner>
      ) : (
        <>
          <div>
            <StudentStatus
              gpa={result?.res.gpa || '0'}
              name={result?.res.name || 'Unknown'}
              index={student?.studentIdx || 'unknown'}
              sup={arrayOfGrades.current}
            />
          </div>
          <div>
            <StudentResultTable />
            {result?.res.grades
              .slice(0, -1)
              .map(({ semester, ch, subject, grade }) => (
                <ResultData
                  key={Math.random() * 10000}
                  semester={semester}
                  grade={grade}
                  ch={ch}
                  subject={subject}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default StudentResult;
