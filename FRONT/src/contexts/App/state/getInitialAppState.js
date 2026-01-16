import { isSupportedCountry, isSupportedLanguage } from '@/utils/helpers.js';

const getInitialAppState = (baseState) => {
  const storedTheme = localStorage.getItem('theme');
  const storedLanguage = localStorage.getItem('language');
  const storedSaveMode = localStorage.getItem('saveMode');

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
