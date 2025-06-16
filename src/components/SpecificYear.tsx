import NumberOfSubjects from '../components/shared/NumberOfSubjects';
import SubjectCard from '../components/shared/SubjectCard';
import WaitingAnimation from '../animation/WaitingAnimation';
import NoContentFound from '../components/NoContentFound';
import useSpecificYear from '../hooks/useSpecificYear';

const SpecificYear = () => {
  const { isLoading, subjectName } = useSpecificYear();

  return (
    <>
      <NumberOfSubjects
        SubjectCount={subjectName?.length || 0}
        totalOf="Subjects"
      />

      <div className="flex items-center gap-2 flex-wrap">
        {isLoading ? (
          <WaitingAnimation />
        ) : subjectName?.length ? (
          subjectName?.map((subName) => (
            <SubjectCard subject={subName} key={subName} />
          ))
        ) : (
          <NoContentFound />
        )}
      </div>
    </>
  );
};

export default SpecificYear;
