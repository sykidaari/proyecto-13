import Header from '@c/layouts/PrivateLayout/Header/Header.jsx';
import NavMenu from '@c/layouts/PrivateLayout/NavMenu/NavMenu.jsx';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className='h-dvh w-full flex flex-col items-center justify-between'>
      <Header />
      <main className='min-h-0 px-2.5 py-5 w-full max-w-4xl flex'>
        <Outlet />
      </main>
      <NavMenu />
    </div>
  );
};

export default PrivateLayout;
