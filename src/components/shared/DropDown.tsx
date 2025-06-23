import {
  DepartmentsType,
  SemesterType,
  YearType,
} from '@/context/StudentContext';
import Options from './Options';
import { UseFormRegister } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

const DropDown = ({
  values,
  title,
  name,
  register,
  isDisabled,
  Icon,
}: {
  values: (string | number | DepartmentsType | YearType | SemesterType)[];
  title: string;
  name: string;
  register: UseFormRegister<any>;
  isDisabled?: boolean;
  Icon?: LucideIcon;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {name[0].toUpperCase() + name.slice(1)} *
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <select
          className="w-full px-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
          {...register(name)}
          disabled={isDisabled}
        >
          <Options values={values} title={title} />
        </select>
      </div>
    </div>
  );
};

export default DropDown;
