import { Toaster } from 'react-hot-toast';
import Login from '../components/Login';
const LoginPage = () => {
  return (
    <div>
      <Login />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
