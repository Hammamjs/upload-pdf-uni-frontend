import { InputProps } from '../../types';
import cn from '../../utils/cn';

const InputField = ({
  type,
  className,
  placeholder,
  register,
  id,
  name,
  handleChange,
  handleKeyDown,
  children,
}: InputProps) => {
  return (
    <div className="relative">
      <input
        {...register(name)}
        type={type}
        className={cn(
          'outline-none rounded-sm block mx-auto bg-gray-300 font-thin w-4/5 p-1 px-4',
          className
        )}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange?.(e)}
        onKeyDown={handleKeyDown}
      />
      {children}
    </div>
  );
};

export default InputField;
