import { useState } from 'react';
import InputField from './InputField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { InputPasswordProps } from '../../types';

const InputPasswordType = ({
  className,
  register,
  name,
  placeholder,
}: InputPasswordProps) => {
  const [passType, setPassType] = useState('password');
  const iconClass = 'absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer';

  return (
    <div className="relative">
      <InputField
        className={className}
        name={name}
        placeholder={placeholder}
        register={register}
        type={passType}
      />
      {passType === 'password' ? (
        <FaEye className={iconClass} onClick={() => setPassType('text')} />
      ) : (
        <FaEyeSlash
          className={iconClass}
          onClick={() => setPassType('password')}
        />
      )}
    </div>
  );
};

export default InputPasswordType;
