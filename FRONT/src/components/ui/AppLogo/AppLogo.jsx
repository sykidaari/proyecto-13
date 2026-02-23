import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import cN from '@/utils/classNameManager.js';

const AppLogo = ({ withText, className }) => {
  const {
    state: { theme }
  } = useAppContext();

  return (
    <div className='flex gap-1 justify-center items-center'>
      {withText && (
        <h1 className='text-xl max-mini:text-lg font-semibold text-primary'>
          Popcorn
        </h1>
      )}
      <img
        src={
          theme === 'dark'
            ? '/imgs/logo_black_lines.svg'
            : '/imgs/logo_purple_lines.svg'
        }
        alt='logo'
        className={cN('size-8 max-mini:size-7', className)}
      />
    </div>
  );
};

export default AppLogo;
