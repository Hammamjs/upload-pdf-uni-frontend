import { useState } from 'react';
// import { FaChevronDown } from 'react-icons/fa';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
import type { SubjectCardType } from '../../types';
import { depShortcut } from '../../data/departmentArray';

const SubjectCard = ({
  title,
  department,
  semester,
  year,
  view,
  content,
}: SubjectCardType) => {
  const [hideOp, setHideOp] = useState(true);

  const deps =
    department.length > 1
      ? department.map((dep) => depShortcut[dep])
      : department;

  return (
    <div className="cursor-pointer bg-gray-300 p-2 overflow-hidden min-w-full rounded">
      <div
        className="justify-between flex items-center"
        onClick={() => setHideOp((prev) => !prev)}
      >
        <p>{title}</p>
        <FaChevronDown
          className={`text-xl p-1 ${
            !hideOp ? 'rotate-180' : ''
          } transition-all`}
        />
      </div>
      <div
        className={` ${
          !hideOp ? 'min-h-40 h-40' : 'overflow-hidden'
        } transition-all h-0`}
      >
        <div className="pt-5 text-start mx-auto w-50 ">
          <p className="font-thin text-nowrap">DEP.: {deps.join(' ,')}</p>
          <p className="font-thin">Year: {year}</p>
          <p className="font-thin">Semester: {semester}</p>
        </div>
        <div className="flex justify-between items-center px-4 pt-5">
          <CustomButton className="rounded py-0 hover:from-gray-200 hover:to-white transition duration-150 w-25 bg-gradient-to-l from-white to-gray-100 p-2">
            <Link to={content} target="_blank">
              Download
            </Link>
          </CustomButton>
          <CustomButton className="rounded py-0 hover:from-gray-200 hover:to-white transition duration-150 w-25 bg-gradient-to-l from-white to-gray-100 p-2">
            <Link to={view} target="_blank">
              View
            </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
