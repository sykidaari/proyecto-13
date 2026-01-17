import useText from '@/contexts/App/hooks/useText.js';
import TopShowBanners from '@c/features/TopShowBanners/TopShowBanners.jsx';

const Landing = () => {
  const { login, register } = useText('public.landing');

  return (
    <div className='flex items-center'>
      <TopShowBanners />
      <div className='relative z-1 rounded-box glass py-2.5 px-5  bg-base-100/15'>
        <div className='relative z-1 flex flex-col justify-center items-center w-fit gap-1.5 *:w-full *:btn *:btn-xl my-5 p-7 glass h-fit rounded-box shadow bg-base-100'>
          <button className='btn-secondary'>{login}</button>
          <button className='btn-primary'>{register}</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
