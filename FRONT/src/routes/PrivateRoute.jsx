import R from '@/constants/client/routePaths.js';
import useIsLoggedIn from '@/contexts/UserSession/hooks/useIsLoggedIn.js';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? children : <Navigate to={R.public.landing.abs} replace />;
};

export default PrivateRoute;
