import { DropDownType } from '@/types';
import Options from './Options';

const DropDown = ({
  values,
  title,
  name,
  register,
  isDisabled,
  Icon,
}: DropDownType) => {
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
