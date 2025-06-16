import { Toaster } from 'react-hot-toast';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <div className="container mx-auto h-[calc(100vh-80px)] p-2 flex justify-center items-center">
      <ResetPassword />
      <Toaster />
    </div>
  );
};

export default ResetPasswordPage;
