import { Toaster } from 'react-hot-toast';
import ForgotPass from '../components/ForgotPass';

const ForgotPassword = () => {
  return (
    <div className="container mx-auto h-[calc(100vh-80px)] p-2 flex justify-center items-center">
      <ForgotPass />
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
