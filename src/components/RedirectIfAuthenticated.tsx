import { useStudent } from '@/hooks/useStudent';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfAuthenticated = () => {
  const { student } = useStudent();

  if (student?.name) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
