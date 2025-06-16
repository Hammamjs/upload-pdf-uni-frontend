import SubjectCard from '../components/shared/SubjectCard';
import NumberOfSubjects from '../components/shared/NumberOfSubjects';
import NoContentFound from '../components/NoContentFound';
import WaitingAnimation from '../animation/WaitingAnimation';
import useFetchSubjects from '../hooks/useFetchSubjects';
import useHome from '../hooks/useHome';
import { JSX } from 'react';

const HomeUi = () => {
  const { isLoading, subjectName } = useFetchSubjects();
  useHome();

  let content: JSX.Element | JSX.Element[];

  if (!isLoading && subjectName?.length) {
    content = subjectName?.map((sub) => (
      <SubjectCard subject={sub} key={sub} />
    ));
  } else content = <NoContentFound />;

  return (
    <>
      <NumberOfSubjects
        SubjectCount={subjectName?.length || 0}
        totalOf="Total Subjects"
      />
      <div className="flex flex-wrap gap-1 px-5">
        {isLoading ? <WaitingAnimation /> : content}
      </div>
    </>
  );
};

export default HomeUi;
