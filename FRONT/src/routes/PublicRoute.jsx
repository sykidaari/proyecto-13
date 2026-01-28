import R from '@/constants/client/routePaths.js';
import useIsLoggedIn from '@/contexts/UserSession/hooks/useIsLoggedIn.js';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <Navigate to={R.private.discover.abs} replace />
  ) : (
    children
  );
};

export default PublicRoute;
