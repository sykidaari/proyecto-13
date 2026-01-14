import AVAILABLE_LANGUAGES from '@/constants/domain/languages.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import cN from '@/utils/classNameManager.js';
import { useRef } from 'react';

const LanguageDropdown = ({ minimal }) => {
  const {
    state: { language: currentLanguageCode },
    actions: { setLanguage }
  } = useAppContext();

  const currentLanguageName = AVAILABLE_LANGUAGES.find(
    (l) => l.code === currentLanguageCode
  ).language;

  const triggerRef = useRef(null);

  const handleClick = (code) => {
    setLanguage(code);
    triggerRef.current.blur();
  };

  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        ref={triggerRef}
        className={cN(
          'btn btn-sm btn-primary btn-soft',
          minimal && 'uppercase w-10 btn-circle'
        )}
      >
        {minimal ? currentLanguageCode : currentLanguageName}
      </div>
      <ul
        tabIndex='-1'
        className='dropdown-content menu bg-base-100 rounded-box p-2 shadow-sm right-1/2 translate-x-1/2'
      >
        {AVAILABLE_LANGUAGES.map(({ code, language }) => (
          <li
            key={code}
            className={cN(code === currentLanguageCode && 'menu-disabled')}
            onClick={() => handleClick(code)}
          >
            <button>{language}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
