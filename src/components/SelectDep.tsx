import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import SelectYear from './SelectYear';
import CustomButton from './shared/CustomButton';
import type { SelectDepType } from '../types';
import { FILE_BELONG_TO } from '../data/departmentArray';

const SelectDep = ({
  department,
  setSubjectOp,
  handleSearch,
}: SelectDepType) => {
  const [hideOpt, setHideOpt] = useState(true);
  return (
    <div
      className={`${
        hideOpt ? 'hover:-translate-y-2' : ''
      } bg-white mb-2 shadow border-b max-w-full w-96  text-start p-1 transition-transform cursor-pointer`}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => {
          setHideOpt((prev) => !prev);
          setSubjectOp((prev: []) => ({
            ...prev,
            department,
          }));
        }}
      >
        <p className="uppercase">{department}</p>
        <FaChevronDown className="text-sm font-thin" />
      </div>
      <div
        className={`bg-white  h-0 ${
          hideOpt ? 'h-0' : 'h-40'
        } overflow-hidden transition-all`}
      >
        <div className="flex justify-between">
          {[...Array(5).keys()].map((num) => (
            <SelectYear
              id={`${num + 1}y`}
              name="year"
              value={`${num + 1}y`}
              key={num}
              selectedYear={() =>
                setSubjectOp((prev: []) => ({
                  ...prev,
                  year: FILE_BELONG_TO[num],
                }))
              }
            />
          ))}
        </div>

        <div className="flex mt-4">
          {[...Array(2).keys()].map((num) => (
            <SelectYear
              id={`${num + 1} sem`}
              name="sem"
              value={`${num + 1} sem`}
              selectedYear={() =>
                setSubjectOp((prev: []) => ({
                  ...prev,
                  semester: FILE_BELONG_TO[num],
                }))
              }
              key={num}
            />
          ))}
        </div>
        <div className="text-end px-3 pt-3">
          <CustomButton
            className="bg-gradient-to-r from-white to-gray-300"
            onClick={handleSearch}
          >
            <p>Search</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SelectDep;
