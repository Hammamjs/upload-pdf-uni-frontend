import { Dispatch, SetStateAction, useState } from 'react';
import LiTag from './LiTag';
import { FaChevronUp } from 'react-icons/fa';
import cn from '../../utils/cn';

const DropDown = ({
  values,
  setValue,
  className,
  value,
  setDepArr,
  depArr,
}: {
  values: string[];
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  setDepArr?: Dispatch<SetStateAction<string[]>>;
  depArr?: string[];
}) => {
  const [isSelect, setIsSelect] = useState(false);

  const handleOnSelect = (val: string) => {
    setIsSelect(false);
    setValue(val);
    if (setDepArr) {
      if (!depArr?.includes(val)) setDepArr((prev) => [...prev, val]);
    }
  };

  return (
    <div
      className={cn(
        'w-4/5 p-1 px-4 mx-auto bg-gray-300 mt-2 relative cursor-pointer  transition-all text-xs',
        className
      )}
      onClick={() => setIsSelect((prev) => !prev)}
    >
      <ol className="flex justify-between items-center">
        {value}
        <FaChevronUp
          className={`text-xs ${
            isSelect ? 'rotate-0' : 'rotate-180'
          } transition-transform duration-300`}
        />
      </ol>
      {isSelect && (
        <ul className="list-none absolute bg-gray-300 w-full left-0 p-1 z-10">
          {values.map((val) => (
            <LiTag
              key={val}
              value={val}
              className="text-start p-1"
              onClick={() => handleOnSelect(val)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
