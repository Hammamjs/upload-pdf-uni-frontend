import CustomInput from './shared/CustomInput';
import CustomButton from './shared/CustomButton';
import DropDown from './shared/DropDown';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '../data/departmentArray';

import { FaXmark } from 'react-icons/fa6';
import useFileInfo from '../hooks/useFileInfo';

const FileInfo = () => {
  const {
    handleOnUploadFile,
    department,
    setDepartment,
    setDepArr,
    depArr,
    year,
    setYear,
    semester,
    setSemester,
    setFile,
    file,
    setFileCover,
    fileCover,
    handleSubmit,
    isSubmitting,
    register,
    handleChange,
    matched,
    keyword,
    handleKeyDown,
  } = useFileInfo();

  return (
    <div className="container p-2 mx-auto">
      <form
        className="text-center w-full grid grid-cols-2 gap-2"
        onSubmit={handleSubmit(handleOnUploadFile)}
      >
        <div className="col-span-2">
          <CustomInput
            name="subject"
            register={register}
            className="my-2 w-full"
            placeholder="Subject name"
            onChange={handleChange}
            handleKeyDown={handleKeyDown}
          >
            {matched?.name &&
              keyword.toLowerCase() !== matched?.name.toLowerCase() && (
                <p className="absolute top-1 left-3 text-gray-100/20 w-fit">
                  {matched?.name}
                </p>
              )}
          </CustomInput>
        </div>

        <div className="col-span-2">
          <CustomInput
            name="title"
            register={register}
            className="my-2 w-full"
            placeholder="File title"
          />
        </div>

        <div className="md:col-span-1 col-span-2">
          <DropDown
            value={department}
            setValue={setDepartment}
            values={DEPARTMENTS}
            setDepArr={setDepArr}
            depArr={depArr}
            className="w-full text-gray-700"
          />

          <div className="flex justify-start gap-1 items-center mt-3 flex-wrap">
            {depArr.map((dep) => (
              <div
                className="m-o p-0 lowercase text-sm bg-gray-300 px-2 flex justify-between items-center"
                key={dep}
              >
                <p>{dep}</p>
                <FaXmark
                  className="text-sm text-white cursor-pointer ml-2"
                  onClick={() => {
                    const filterDep = depArr.filter((item) => item !== dep);
                    setDepArr(filterDep);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1 col-span-2">
          <DropDown
            value={year}
            setValue={setYear}
            values={FILE_BELONG_TO}
            className="w-full text-gray-700"
          />
        </div>

        <div className="md:col-span-1 col-span-2">
          <DropDown
            value={semester}
            setValue={setSemester}
            values={SEMESTER}
            className="w-full text-gray-700"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <CustomInput
            name="file"
            register={register}
            type="file"
            message="upload PDF"
            id="pdf"
            onChange={(e) => {
              setFile(e.target.files![0]);
              console.log(file);
            }}
            labelClassName="bg-gray-300"
          />
        </div>

        <div className="md:col-span-1 col-span-2">
          <CustomInput
            name="fileCover"
            id="pdfCover"
            register={register}
            type="file"
            message="PDF Cover"
            onChange={(e) => {
              setFileCover(e.target.files![0]);
              console.log(fileCover);
            }}
            labelClassName="bg-gray-300"
          />
        </div>

        <div className="col-span-2 mt-10">
          <CustomButton
            isSubmitting={isSubmitting}
            className="bg-gray-400 py-1 w-1/2 mx-auto mt-4 font-bold "
          >
            <p>upload</p>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default FileInfo;
