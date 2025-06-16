import { Toaster } from 'react-hot-toast';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="relative">
      <Register />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RegisterPage;
