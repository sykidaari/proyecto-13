import Header from '@c/layouts/PrivateLayout/Header/Header.jsx';
import NavMenu from '@c/layouts/PrivateLayout/NavMenu/NavMenu.jsx';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className='h-dvh w-full flex flex-col items-center justify-between relative'>
      <Header />
      <main className=' min-h-0 px-2.5 pb-2.5  mobile w-full max-w-4xl flex overflow-auto max-compact:px-1.5 max-compact:pb-1.5'>
        <Outlet />
      </main>
      <NavMenu />
    </div>
  );
};

export default PrivateLayout;
