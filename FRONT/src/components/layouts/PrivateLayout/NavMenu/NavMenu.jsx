import R from '@/constants/client/routePaths.js';
import useText from '@/contexts/App/hooks/useText.js';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';
import useNotificationBooleans from '@/hooks/user/currentUser/useNotificationBooleans';
import MenuNavItem from '@c/layouts/PrivateLayout/NavMenu/MenuNavItem/MenuNavItem.jsx';
import AppLogo from '@c/ui/AppLogo/AppLogo.jsx';
import ProfilePicture from '@c/ui/ProfilePicture/ProfilePicture.jsx';
import {
  BellIcon,
  GlobeAltIcon,
  InboxIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const NavMenu = () => {
  const { discover, people, sessions, profile } = useText(
    'layouts.private.pageTitles'
  );
  const {
    state: { img }
  } = useUserSessionContext();

  const { peopleNotify, sessionsNotify } = useNotificationBooleans();

  return (
    <div className='w-full'>
      <nav className='bg-base-300 glass flex justify-center px-2.5 max-[320px]:px-0'>
        <ul className='menu menu-horizontal max-mobile:menu-xs gap-2.5 justify-center flex-nowrap max-mini:menu-xs max-[320px]:px-0 mobile:gap-5 max-[320px]:gap-0.5 '>
          <MenuNavItem to={R.private.discover.abs} title={discover}>
            <SparklesIcon />
          </MenuNavItem>
          <MenuNavItem
            to={R.private.people.abs}
            title={people}
            notify={peopleNotify}
          >
            <UserGroupIcon />
          </MenuNavItem>
          <MenuNavItem
            to={R.private.sessions.abs}
            title={sessions}
            featured
            notify={sessionsNotify}
          >
            <AppLogo />
          </MenuNavItem>
          {/* <MenuNavItem to={R.private.notifications.abs} title={notifications}>
            <BellIcon />
          </MenuNavItem> */}
          <MenuNavItem
            to={R.private.profile.abs}
            title={profile}
            className='*:size-8'
          >
            <ProfilePicture userImg={img} />
          </MenuNavItem>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
