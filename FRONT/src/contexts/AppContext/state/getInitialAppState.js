import AVAILABLE_LANGUAGES from '@/constants/domain/languageCodes.js';

const getInitialAppState = (baseState) => {
  const storedTheme = localStorage.getItem('theme');
  const storedLanguage = localStorage.getItem('language');
  const storedSaveMode = localStorage.getItem('saveMode');

  const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const browserLanguage = navigator.language?.split('-')[0];
  const browserLanguageIsAvailable =
    AVAILABLE_LANGUAGES.includes(browserLanguage);

  return {
    ...baseState,

    saveMode: storedSaveMode === 'device' ? 'device' : baseState.saveMode,

    theme: storedTheme ?? browserTheme ?? baseState.theme,

    language:
      storedLanguage ??
      (browserLanguageIsAvailable ? browserLanguage : baseState.language)
  };
};

export default getInitialAppState;
