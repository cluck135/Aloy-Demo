import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router';
import Auth from './utils/auth';

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = Auth.loggedIn();
  return isAuth ? <Outlet /> : <Navigate to='/login' replace state={{from: location}}/>
}

export default ProtectedRoutes;