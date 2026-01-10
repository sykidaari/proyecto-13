import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import TEXTS from '@/data/texts.js';
import { IS_DEV } from '@/utils/env.js';

const useText = (path) => {
  const {
    state: { language }
  } = useAppContext();

  const langTexts = TEXTS[language];

  if (!path) return langTexts;

  const value = path.split('.').reduce((acc, key) => acc?.[key], langTexts);

  if (value === undefined) {
    if (IS_DEV) console.warn(`Missing text key: ${path}`);

    return path;
  }

  return value;
};

export default useText;
