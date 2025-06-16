import { FaChevronDown } from 'react-icons/fa';
import CustomButton from './shared/CustomButton';
import { useState } from 'react';
import type { FileCardType } from '../types';
import { formatDate } from '../utils/dateFormat';
import { depShortcut } from '../data/departmentArray';

const FileCard = ({
  title,
  semester,
  year,
  department,
  createAt,
  handleDelete,
  subject,
}: FileCardType) => {
  const [detailsIsVisible, setDetailsIsVisible] = useState(false);

  const departments: string[] = [];
  department.forEach((dep: string) => {
    departments.push(depShortcut[dep]);
  });

  return (
    <div className="w-full bg-gray-400 p-2 my-1 rounded">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setDetailsIsVisible((prev) => !prev)}
      >
        <p>{title}</p>
        <CustomButton isSubmitting={false}>
          <FaChevronDown
            className={`${detailsIsVisible ? 'rotate-180' : ''} transition`}
          />
        </CustomButton>
      </div>
      <div
        className={`overflow-hidden ${
          detailsIsVisible ? 'h-48 p-1' : 'h-0'
        } transition-all duration-150`}
      >
        <p className="mt-1">uploaded At: {formatDate(createAt)}</p>
        <p className="mt-1">
          {departments.length > 1 ? 'Departments' : 'Department'}:{' '}
          {departments.join(' ,')}
        </p>
        <p className="mt-1">Subject: {subject}</p>
        <p className="mt-1">Year: {year}</p>
        <p className="mt-1">
          Semester: {semester === '1st' ? 'First sem' : 'Second sem'}
        </p>
        <div className="justify-self-end mt-2">
          <CustomButton
            className="cursor-pointer bg-red-400 text-white transition py-1 px-5"
            onClick={handleDelete}
          >
            <p>Delete</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
