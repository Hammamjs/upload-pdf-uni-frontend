import CustomInput from './shared/CustomInput';
import CustomButton from './shared/CustomButton';
import useVerificationCode from '../hooks/useVerificationCode';

const ResetCodeVerification = () => {
  const { handleCodeVerification, register, handleSubmit, isSubmitting } =
    useVerificationCode();

  return (
    <div className="bg-gray-400 p-4 rounded md:w-1/2 w-full mx-auto">
      <form
        className="text-center"
        onSubmit={handleSubmit(handleCodeVerification)}
      >
        <h2 className="text-gray-300 font-bold text-xl mb-3">
          Enter verification code
        </h2>
        <CustomInput
          name="resetCode"
          register={register}
          placeholder="Code..."
          className="text-center"
        />
        <CustomButton
          isSubmitting={isSubmitting}
          className="bg-white font-bold rounded px-10 py-1 mt-5 hover:bg-gray-300 hover:text-gray-600 transition"
        >
          <p>verify</p>
        </CustomButton>
      </form>
    </div>
  );
};

export default ResetCodeVerification;
