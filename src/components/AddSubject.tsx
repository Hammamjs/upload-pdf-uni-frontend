import { FaPlus, FaXmark } from 'react-icons/fa6';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '../data/departmentArray';
import useFileInfo from '../hooks/useFileInfo';
import CustomInput from './shared/CustomInput';
import DropDown from './shared/DropDown';
import CustomButton from './shared/CustomButton';
import useSubjectOption from '../hooks/useSubjectOption';

const AddSubject = () => {
  const {
    department,
    setDepartment,
    setDepArr,
    depArr,
    register,
    year,
    setYear,
    semester,
    setSemester,
    getValues,
  } = useFileInfo();

  const { handleAddNewSubject, isLoading } = useSubjectOption();

  return (
    <div>
      <form className="p-2" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-center pb-2 font-bold border-b mb-2">
          Add new Subject
        </h1>
        <div className="grid grid-cols-2 gap-1">
          <div className="md:col-span-1 col-span-2">
            <DropDown
              value={department}
              setValue={setDepartment}
              values={DEPARTMENTS}
              setDepArr={setDepArr}
              depArr={depArr}
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
            <DropDown
              value={year}
              setValue={setYear}
              values={FILE_BELONG_TO}
              className="w-full text-gray-700"
            />
          </div>
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
          <div className="col-span-2">
            <CustomInput
              name="subject"
              register={register}
              className="my-2 w-full"
              placeholder="Subject name"
            />
          </div>
          <div className="col-span-2 ml-auto">
            <CustomButton
              className="bg-gray-300 px-6 py-1 w-fit ml-auto"
              isSubmitting={isLoading}
              onClick={() =>
                handleAddNewSubject(
                  depArr,
                  semester,
                  year,
                  getValues('subject')
                )
              }
            >
              <div className="flex justify-center items-center">
                {isLoading ? (
                  <p>Wait a sec....</p>
                ) : (
                  <>
                    <FaPlus className="mr-3" />
                    <p>Add</p>
                  </>
                )}
              </div>
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
