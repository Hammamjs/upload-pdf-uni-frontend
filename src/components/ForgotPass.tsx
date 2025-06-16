import CustomInput from './shared/CustomInput';
import CustomButton from './shared/CustomButton';
import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPass = () => {
  const { handleForgotPass, handleSubmit, isSubmitting, register } =
    useForgotPassword();

  return (
    <div className="w-[350px] h-fit bg-gray-200 p-2 rounded-md shadow-lg text-center">
      <form className="text-center" onSubmit={handleSubmit(handleForgotPass)}>
        <h2 className="text-gray-200 text-xl font-bold mb-2">
          Enter student email
        </h2>
        <CustomInput name="email" register={register} placeholder="Email" />
        <CustomButton
          isSubmitting={isSubmitting}
          className="bg-white font-bold rounded px-10 py-1 mt-5 hover:bg-gray-300 hover:text-gray-600 transition"
        >
          <p>Find</p>
        </CustomButton>
      </form>
    </div>
  );
};

export default ForgotPass;
