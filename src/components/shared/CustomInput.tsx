import type { InputProps } from '@/types';
import InputField from './InputField';
import InputPasswordType from './InputPasswordType';

const CustomInput = ({
  type = 'text', // Default value
  placeholder,
  register,
  Icons,
  error,
  label,
  name,
  isDisabled,
}: InputProps) => {
  switch (type) {
    case 'password':
      return (
        <InputPasswordType
          register={register}
          name={name}
          errors={error}
          placeholder={placeholder}
          label={label || 'Password'}
        />
      );
    default:
      return (
        <InputField
          name={name}
          placeholder={placeholder!}
          register={register}
          type="text"
          Icons={Icons}
          error={error}
          label={label}
          isDisabled={isDisabled}
        />
      );
  }
};

export default CustomInput;
