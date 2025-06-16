import { useState } from 'react';
import SelectDep from './SelectDep';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS as departments } from '../data/departmentArray';

export const SelectSubs = () => {
  const [subjectOptions, setSubjectOptions] = useState<{
    department: string;
    year: string;
    semester: string;
  }>({ department: '', year: '', semester: '' });

  const nav = useNavigate();

  const searchForFiles = () => {
    nav(`/year-subjects/${Object.values(subjectOptions)}`);
  };

  return (
    <div>
      {departments.sort().map((dep) => (
        <SelectDep
          department={dep.toLowerCase()}
          key={dep}
          setSubjectOp={setSubjectOptions}
          handleSearch={searchForFiles}
        />
      ))}
    </div>
  );
};
