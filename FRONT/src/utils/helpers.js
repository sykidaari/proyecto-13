import AVAILABLE_COUNTRIES from '@/constants/domain/countryCodes.js';
import AVAILABLE_LANGUAGES from '@/constants/domain/languageCodes.js';

export const isSupportedLanguage = (languageCode) =>
  AVAILABLE_LANGUAGES.includes(languageCode);
export const isSupportedCountry = (countryCode) =>
  AVAILABLE_COUNTRIES.includes(countryCode);
