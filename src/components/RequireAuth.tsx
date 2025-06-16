import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent';

const RequireAuth = () => {
  const location = useLocation();
  const { student } = useStudent();
  return student?.name ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
