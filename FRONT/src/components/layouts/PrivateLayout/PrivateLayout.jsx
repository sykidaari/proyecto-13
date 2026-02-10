import Header from '@c/layouts/PrivateLayout/Header/Header.jsx';
import NavMenu from '@c/layouts/PrivateLayout/NavMenu/NavMenu.jsx';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className='h-dvh w-full flex flex-col items-center'>
      <Header />
      <main className='flex-1 p-2.5 pt-5 mobile:py-10 w-full max-w-4xl'>
        <Outlet />
      </main>
      <NavMenu />
    </div>
  );
};

export default PrivateLayout;
