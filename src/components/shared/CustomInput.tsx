import type { CustomInputProps } from '../../types';
import InputField from './InputField';
import InputFileType from './InputFileType';
import InputPasswordType from './InputPasswordType';

const CustomInput = ({
  type = 'text',
  className,
  placeholder,
  register,
  onChange,
  name,
  message,
  labelClassName,
  id,
  handleKeyDown,
  children,
}: CustomInputProps) => {
  switch (type) {
    case 'file':
      return (
        <InputFileType
          name={name}
          onChange={onChange}
          id={id!}
          labelClassName={labelClassName}
          message={message!}
          register={register}
        />
      );
    case 'password':
      return (
        <InputPasswordType
          register={register}
          className={className}
          name={name}
          placeholder={placeholder!}
        />
      );
    default:
      return (
        <InputField
          className={className}
          name={name}
          placeholder={placeholder!}
          register={register}
          type="text"
          handleChange={(e) => onChange?.(e)}
          handleKeyDown={handleKeyDown}
        >
          {children}
        </InputField>
      );
  }
};

export default CustomInput;
