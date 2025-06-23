import { Toaster } from 'react-hot-toast';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Register />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RegisterPage;
