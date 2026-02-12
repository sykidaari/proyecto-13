import { useLocation } from 'react-router-dom';
import useText from '@/contexts/App/hooks/useText.js';
import R from '@/constants/client/routePaths.js';

const Header = () => {
  const location = useLocation();

  const { discover, sessions, notifications, profile } = useText(
    'layouts.private.pageTitles'
  );

  const path = location.pathname;

  const title = path.startsWith(R.private.discover.abs)
    ? discover
    : path.startsWith(R.private.sessions.abs)
      ? sessions
      : path.startsWith(R.private.notifications.abs)
        ? notifications
        : path.startsWith(R.private.profile.abs)
          ? profile
          : '';

  if (!title) return null;

  return (
    <header className='w-full flex justify-center mt-2.5 -mb-2.5'>
      <h1 className='text-primary/60 text-xl font-semibold'>{title}</h1>
    </header>
  );
};

export default Header;
