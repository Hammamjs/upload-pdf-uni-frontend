import { Toaster } from 'react-hot-toast';
import Login from '../components/Login';
const LoginPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Login />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
