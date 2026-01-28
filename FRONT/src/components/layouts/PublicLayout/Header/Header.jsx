import R from '@/constants/client/routePaths.js';
import useText from '@/contexts/App/hooks/useText.js';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cN from '@/utils/classNameManager.js';
import ThemeToggle from '@c/ui/AppSettings/ThemeToggle/ThemeToggle.jsx';
import AppLogo from '@c/ui/AppLogo/AppLogo.jsx';
import LanguageDropdown from '@c/ui/AppSettings/LanguageDropdown/LanguageDropdown.jsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import HomeLink from '@c/ui/HomeLink/HomeLInk.jsx';

const Header = () => {
  const featureText = useText('layouts.public.nav.feature');
  const { pathname } = useLocation();

  const isLanding = pathname === '/';
  return (
    <header
      className={cN(
        'glass rounded-box font-semibold w-full  max-w-4xl sticky text-primary top-2.5 z-10',
        isLanding && 'bg-base-100'
      )}
    >
      <nav className='navbar px-1 mobile:px-7 max-mobile:justify-around'>
        <div className='mobile:hidden navbar-start'>
          <Link to={R.public.landing.abs}>
            <AppLogo withText />
          </Link>
        </div>

        <div className='mobile:navbar-start'>
          <NavLink
            to={R.public.feature.abs}
            className={({ isActive }) =>
              cN(
                'text-sm rounded-field p-2 hover:bg-base-200 transition duration-150 max-mini:text-xs',
                isActive && 'bg-base-200'
              )
            }
          >
            {featureText}
          </NavLink>
        </div>
        <div className='max-mobile:hidden navbar-center'>
          <HomeLink withText />
        </div>

        <div className='mobile:navbar-end gap-2.5'>
          <div className='dropdown mobile:hidden'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-circle btn-ghost btn-primary max-mini:btn-xs'
            >
              <ChevronDownIcon className='size-5 max-mini:size-4' />
            </div>
            <ul
              tabIndex='-1'
              className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm left-1/2 -translate-x-1/2'
            >
              <li>
                <ThemeToggle className='m-auto' />
              </li>
              <li>
                <LanguageDropdown minimal />
              </li>
            </ul>
          </div>

          <div className='max-mobile:hidden'>
            <ThemeToggle className='mr-2.5' />
            <LanguageDropdown minimal />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
