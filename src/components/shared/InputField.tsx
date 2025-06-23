import { InputProps } from '../../types';
const InputField = ({
  type,
  placeholder,
  register,
  name,
  Icons,
  error,
  label,
  handleOnChange,
}: InputProps) => {
  if (!register) return;

  return (
    <>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icons && (
          <Icons className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <input
          {...register(name!)}
          type={type}
          name={name}
          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? 'border-red-400 focus:ring-red-500'
              : 'border-white/20 focus:ring-blue-500 focus:border-transparent'
          }`}
          placeholder={placeholder}
          onChange={handleOnChange}
          // onKeyDown={handleKeyDown}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
    </>
  );
};

export default InputField;
