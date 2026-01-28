import R from '@/constants/client/routePaths.js';
import useText from '@/contexts/App/hooks/useText.js';
import TopShowBanners from '@/pages/public/Landing/TopShowBanners/TopShowBanners.jsx';
import Slogan from '@c/ui/Slogan/Slogan.jsx';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { login: loginText, register: registerText } = useText(
    'pages.public.landing'
  );
  const navigate = useNavigate();

  return (
    <div className='flex items-center'>
      <TopShowBanners />
      <div className='relative z-1 rounded-box glass py-2.5 px-5  bg-base-100/15'>
        <section className='relative z-1  my-5 p-7 glass h-fit rounded-box shadow bg-base-100 flex flex-col gap-5'>
          <h2 className='text-xl'>
            <Slogan />
          </h2>

          <div className='flex flex-col justify-center items-center w-full gap-1.5 *:w-full *:btn *:btn-xl'>
            {' '}
            <button
              onClick={() => navigate(R.auth.register.abs)}
              className='btn-primary'
            >
              {registerText}
            </button>
            <button
              onClick={() => navigate(R.auth.login.abs)}
              className='btn-outline'
            >
              {loginText}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
