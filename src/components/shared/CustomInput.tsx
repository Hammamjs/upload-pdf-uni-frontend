import type { InputProps } from '../../types';
import InputField from './InputField';
import InputFileType from './InputFileType';
import InputPasswordType from './InputPasswordType';

const CustomInput = ({
  type = 'text', // Default value
  placeholder,
  register,
  Icons,
  error,
  label,
  name,
  dragActive,
  fileInputRef,
  formData,
  handleDrag,
  handleDrop,
  handleFileInputChange,
  removeFile,
  file,
}: InputProps) => {
  switch (type) {
    case 'file':
      return (
        <InputFileType
          dragActive={dragActive}
          fileInputRef={fileInputRef}
          formData={formData}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          handleFileInputChange={handleFileInputChange}
          removeFile={removeFile}
          file={file!}
        />
      );
    case 'password':
      return (
        <InputPasswordType
          register={register}
          name={name ? name : 'pass'}
          errors={error}
          placeholder={placeholder}
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
        />
      );
  }
};

export default CustomInput;
