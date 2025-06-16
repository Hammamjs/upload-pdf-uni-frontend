import CustomInput from './shared/CustomInput';
import CustomButton from './shared/CustomButton';
import useResetPassword from '../hooks/useResetPassword';

const ResetPassword = () => {
  const { handleResetPass, handleSubmit, isSubmitting, register } =
    useResetPassword();

  return (
    <div className="w-[350px] h-[250px] bg-gray-200 p-2 rounded-md shadow-lg text-center">
      <form className="text-center" onSubmit={handleSubmit(handleResetPass)}>
        <h2 className="text-gray-300 font-bold text-xl mb-3">
          Set new Password
        </h2>
        <CustomInput name="email" register={register} placeholder="Email" />

        <CustomInput
          name="newPassowrd"
          register={register}
          placeholder="New password"
          className="my-3"
          type="password"
        />
        <CustomInput
          name="confirmPassword"
          register={register}
          placeholder="Confirm password"
          type="password"
        />
        <CustomButton
          isSubmitting={isSubmitting}
          className="bg-white font-bold rounded px-10 py-1 mt-5 hover:bg-gray-300 hover:text-gray-600 transition"
        >
          <p>Reset</p>
        </CustomButton>
      </form>
    </div>
  );
};

export default ResetPassword;
