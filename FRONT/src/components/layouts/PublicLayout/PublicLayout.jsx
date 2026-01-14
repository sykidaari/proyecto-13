import Footer from '@c/layouts/PublicLayout/Footer/Footer.jsx';
import Header from '@c/layouts/PublicLayout/Header/Header.jsx';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
