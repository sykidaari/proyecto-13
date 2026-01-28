import LSI from '@/constants/client/localStorageItems.js';
import { isSupportedCountry, isSupportedLanguage } from '@/utils/helpers.js';

const getInitialAppState = (baseState) => {
  const storedTheme = localStorage.getItem(LSI.theme);
  const storedLanguage = localStorage.getItem(LSI.language);
  const storedSaveMode = localStorage.getItem(LSI.saveMode);

  const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const browserLanguage = navigator.language?.split('-')[0];

  // this country is browser language based!!!
  const browserCountry = Intl.DateTimeFormat()
    .resolvedOptions()
    .locale.split('-')[1]
    ?.toLowerCase();

  return {
    ...baseState,

    saveMode: storedSaveMode === 'device' ? 'device' : baseState.saveMode,

    theme: storedTheme ?? browserTheme ?? baseState.theme,

    language:
      storedLanguage ??
      (browserLanguage && isSupportedLanguage(browserLanguage)
        ? browserLanguage
        : baseState.language),

    country:
      browserCountry && isSupportedCountry(browserCountry)
        ? browserCountry
        : baseState.country
  };
};

export default getInitialAppState;
