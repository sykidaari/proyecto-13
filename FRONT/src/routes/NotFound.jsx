import R from '@/constants/client/routePaths.js';
import useIsLoggedIn from '@/contexts/UserSession/hooks/useIsLoggedIn.js';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <Navigate
        to={isLoggedIn ? R.private.discover.abs : R.public.landing.abs}
        replace
        state={{ notFound: true }}
      />
    </>
  );
};

export default NotFound;
