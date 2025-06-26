import { DepartmentsType, SemesterType, YearType } from '@/types';

const Options = ({
  values,
  title,
}: {
  title: string;
  values: (string | number | DepartmentsType | YearType | SemesterType)[];
}) => {
  return (
    <>
      <option value="" className="bg-gray-800">
        {title} *
      </option>
      {values.map((value, i) => (
        <option key={i} value={value} className="bg-gray-800">
          {value}
        </option>
      ))}
    </>
  );
};

export default Options;
