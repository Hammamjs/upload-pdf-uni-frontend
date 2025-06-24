import { cn } from '@/lib/utils';
import type { InputTextType } from '@/types';

const InputText = ({
  label,
  placeholder,
  name,
  isDisabled,
  className,
  register,
}: InputTextType) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} *
      </label>
      <input
        type="text"
        {...register(name)}
        className={cn(
          'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
          className
        )}
        placeholder={placeholder}
        disabled={isDisabled}
        required
      />
    </div>
  );
};

export default InputText;
