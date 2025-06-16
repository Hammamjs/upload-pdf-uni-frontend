import NumberOfSubjects from '../components/shared/NumberOfSubjects';
import SubjectContent from '../components/shared/SubjectContent';
import WaitingAnimation from '../animation/WaitingAnimation';
import useSubject from '../hooks/useSubject';

const Subject = () => {
  const { isLoading, name, subject } = useSubject();

  return (
    <div className="container mx-auto">
      <NumberOfSubjects
        SubjectCount={subject?.length || 0}
        totalOf={name || 'Unknown'}
      />
      <div className="flex flex-wrap px-5 gap-1">
        {isLoading ? (
          <WaitingAnimation />
        ) : (
          subject?.map(
            ({ title, view, content, department, year, semester }) => (
              <SubjectContent
                view={view}
                content={content}
                title={title}
                department={department}
                semester={semester}
                year={year}
                key={title}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Subject;
