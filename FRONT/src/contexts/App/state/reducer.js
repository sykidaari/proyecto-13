import SAVE_MODES from '@/constants/client/saveModes.js';
import { IS_DEV } from '@/utils/env.js';
import { isSupportedCountry, isSupportedLanguage } from '@/utils/helpers.js';

const appReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TOGGLE_THEME': {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };
    }

    case 'SET_LANGUAGE': {
      if (!isSupportedLanguage(payload)) {
        if (IS_DEV) console.warn('language not supported');
        return state;
      }

      return { ...state, language: payload };
    }

    case 'SET_COUNTRY': {
      if (!isSupportedCountry(payload)) {
        if (IS_DEV) console.warn('country not supported');
        return state;
      }

      return { ...state, country: payload };
    }

    case 'SET_SAVE_MODE': {
      if (!SAVE_MODES.includes(payload)) {
        if (IS_DEV) console.warn("save mode doesn't exist");
        return state;
      }
      return { ...state, saveMode: payload };
    }

    default:
      return state;
  }
};

export default appReducer;
