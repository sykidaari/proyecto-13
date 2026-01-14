import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import cN from '@/utils/classNameManager.js';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = ({ className }) => {
  const {
    actions: { toggleAppTheme }
  } = useAppContext();

  return (
    <label
      className={cN(
        'swap swap-rotate rounded-field p-1 hover:bg-base-200 transition duration-150 w-fit',
        className
      )}
    >
      <input
        type='checkbox'
        className='theme-controller'
        onChange={toggleAppTheme}
      />
      <SunIcon className='size-6 swap-on' />
      <MoonIcon className='size-6 swap-off' />
    </label>
  );
};

export default ThemeToggle;
