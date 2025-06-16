import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCloudArrowUp } from 'react-icons/fa6';
import cn from '../../utils/cn';
import type { InputFileType } from '../../types';

const InputFileType = ({
  id,
  message,
  labelClassName,
  register,
  onChange,
}: InputFileType) => {
  const [fileMessage, setFileMessage] = useState(`${message}`);
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className={cn(
          'cursor-pointer flex items-center w-full text-gray-700 mx-auto justify-center p-1 rounded-sm',
          labelClassName
        )}
      >
        <p>{fileMessage}</p>
        {!fileMessage.includes('uploaded') ? (
          <FaCloudArrowUp className="ml-5" />
        ) : (
          <FaCheckCircle className="ml-2 text-green-400" />
        )}
      </label>
      <input
        className="hidden"
        id={id}
        {...register}
        onChange={(e) => {
          setFileMessage('File uploaded');
          onChange?.(e);
        }}
        type="file"
      />
    </div>
  );
};

export default InputFileType;
