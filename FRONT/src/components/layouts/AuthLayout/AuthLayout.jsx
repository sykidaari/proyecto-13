import HomeLink from '@c/ui/HomeLink/HomeLInk.jsx';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex flex-col items-center min-h-dvh px-2.5 py-[12.5dvh] gap-10'>
      <header className='pt-2.5'>
        <nav>
          <HomeLink withText />
        </nav>
      </header>
      <main className='flex-1 w-full flex flex-col items-center gap-10'>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
