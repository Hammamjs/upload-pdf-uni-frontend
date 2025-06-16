import type { SelectYear } from '../types';
const SelectYear = ({ id, value, name, selectedYear }: SelectYear) => {
  return (
    <div className="px-2 py-2">
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        className="mr-3"
        onClick={selectedYear}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default SelectYear;
