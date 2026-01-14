import R from '@/constants/client/routePaths.js';
import useIsLoggedIn from '@/contexts/UserSession/hooks/useIsLoggedIn.js';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Navigate to={R.auth.discover.abs} replace /> : children;
};

export default PublicRoute;
