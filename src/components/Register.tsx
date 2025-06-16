import CustomButton from './shared/CustomButton';
import CustomInput from './shared/CustomInput';
import { Link } from 'react-router-dom';
import DropDown from './shared/DropDown';
import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '../data/departmentArray';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const {
    handleRegisteration,
    handleSubmit,
    register,
    department,
    setDepartment,
    year,
    setYear,
    semester,
    setSemester,
    validation,
    isSubmitting,
  } = useRegister();

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRegisteration)}
        className="w-[350px] min-h-[350px] bg-gray-200 p-2 rounded-md shadow-lg text-center"
      >
        <h5 className="mt-2">Create new Account</h5>
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
          name="index"
          placeholder="Student index"
          className="my-3"
        />

        <CustomInput
          register={register}
          name="password"
          placeholder="password"
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
          <p>Register</p>
        </CustomButton>
        <Link
          to="/login"
          className="mb-auto hover:underline hover:text-gray-500"
        >
          Do you have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
