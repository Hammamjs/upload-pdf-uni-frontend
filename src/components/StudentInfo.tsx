import CustomInput from './shared/CustomInput';
import DropDown from './shared/DropDown';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '../data/departmentArray';
import CustomButton from './shared/CustomButton';
import useStudentInfo from '../hooks/useStudentInfo';

const StudentInfo = () => {
  const {
    changeStudentData,
    department,
    handleSubmit,
    isSubmitting,
    register,
    semester,
    setDepartment,
    setSemester,
    setYear,
    validation,
    year,
  } = useStudentInfo();

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-80px)] justify-center items-center">
      <form
        onSubmit={handleSubmit(changeStudentData)}
        className="w-[350px] min-h-[350px] bg-gray-200 p-2 rounded-md shadow-lg text-center"
      >
        <h5 className="mt-2">Student Information</h5>
        <CustomInput
          name="studentname"
          placeholder="Student name"
          register={register}
          className="my-3"
        />

        <CustomInput
          register={register}
          name="email"
          placeholder="Student Email"
          className="my-3"
        />

        <CustomInput
          register={register}
          name="studentIdx"
          placeholder="Student index"
          className="my-3"
        />

        <CustomInput
          register={register}
          name="password"
          placeholder="change password"
          type="password"
          className="my-3"
        />

        <CustomInput
          register={register}
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          className="my-3"
        />

        <DropDown
          values={DEPARTMENTS}
          value={department}
          setValue={setDepartment}
        />
        <DropDown values={FILE_BELONG_TO} value={year} setValue={setYear} />
        <DropDown values={SEMESTER} value={semester} setValue={setSemester} />

        <CustomButton
          onClick={validation}
          className="bg-gray-white mt-5 mb-10 block mx-auto bg-white shadow-sm w-1/2"
          isSubmitting={isSubmitting}
        >
          <p>update</p>
        </CustomButton>
      </form>
    </div>
  );
};

export default StudentInfo;
