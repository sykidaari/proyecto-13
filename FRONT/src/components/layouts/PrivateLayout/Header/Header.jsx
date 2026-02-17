import { useLocation } from 'react-router-dom';
import useText from '@/contexts/App/hooks/useText.js';
import R from '@/constants/client/routePaths.js';

const Header = () => {
  const location = useLocation();

  const { discover, people, sessions, notifications, profile } = useText(
    'layouts.private.pageTitles'
  );

  const path = location.pathname;

  const routesToTitles = [
    [R.private.discover.abs, discover],
    [R.private.people.abs, people],
    [R.private.sessions.abs, sessions],
    [R.private.notifications.abs, notifications],
    [R.private.profile.abs, profile]
  ];

  const title =
    routesToTitles.find(([route]) => path.startsWith(route))?.[1] ?? '';
  if (!title) return null;

  return (
    <header className='w-full flex justify-center mt-2.5 mobile:mt-5 -mb-2.5 mobile:-mb-5'>
      <h1 className='text-primary/60 text-xl font-semibold'>{title}</h1>
    </header>
  );
};

export default Header;
