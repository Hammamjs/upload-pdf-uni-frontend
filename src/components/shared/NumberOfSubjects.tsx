const NumberOfSubjects = ({
  SubjectCount,
  totalOf,
}: {
  SubjectCount: number;
  totalOf: string;
}) => {
  return (
    <div className="flex justify-between border-b mb-2">
      <p>{totalOf}</p>
      <p>{SubjectCount}</p>
    </div>
  );
};

export default NumberOfSubjects;
