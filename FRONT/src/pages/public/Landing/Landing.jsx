import useText from '@/contexts/App/hooks/useText.js';
import TopShowBanners from '@c/features/TopShowBanners/TopShowBanners.jsx';

const Landing = () => {
  const { login, register } = useText('public.landing');

  return (
    <div className='flex items-center'>
      <TopShowBanners />
      <div className='flex flex-col justify-center items-center w-fit gap-1.5 *:w-full *:btn my-5 p-5 glass h-fit rounded-box'>
        <button className='btn-secondary'>{login}</button>
        <button className='btn-primary'>{register}</button>
      </div>
    </div>
  );
};

export default Landing;
