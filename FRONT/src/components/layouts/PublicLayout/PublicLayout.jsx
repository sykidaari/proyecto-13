import Footer from '@c/layouts/PublicLayout/Footer/Footer.jsx';
import Header from '@c/layouts/PublicLayout/Header/Header.jsx';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <div className='flex flex-col min-h-dvh items-center p-2.5'>
        <Header />
        <main className='flex-1 flex w-full'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
