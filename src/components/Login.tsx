import CustomButton from './shared/CustomButton';
import { Link } from 'react-router-dom';
import CustomInput from './shared/CustomInput';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const { handleLogin, handleSubmit, isSubmitting, register } = useLogin();

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-[350px] h-[350px] bg-gray-200 p-2 rounded-md shadow-lg text-center"
      >
        <h5 className="mt-2">Login to get access!</h5>

        <CustomInput
          name="email"
          placeholder="Student email"
          register={register}
          className="mt-5"
          type="email"
        />

        <CustomInput
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          className="mt-5"
        />

        <CustomButton
          className="bg-gray-white mt-15 mb-10 block mx-auto bg-white shadow-sm w-1/2"
          isSubmitting={isSubmitting}
        >
          <p>Login</p>
        </CustomButton>

        <Link
          to="/forgot-password"
          className="hover:underline hover:text-gray-500 block mb-2"
        >
          Forgot your password?
        </Link>

        <Link
          to="/register"
          className="mb-auto hover:underline hover:text-gray-500"
        >
          Don't have account? create new
        </Link>
      </form>
    </div>
  );
};

export default Login;
