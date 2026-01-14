import { COUNTRY_CODES as AVAILABLE_COUNTRIES } from '@/constants/domain/countriesAndServices.js';
import { LANGUAGE_CODES as AVAILABLE_LANGUAGES } from '@/constants/domain/languages.js';

export const isSupportedLanguage = (languageCode) =>
  AVAILABLE_LANGUAGES.includes(languageCode);
export const isSupportedCountry = (countryCode) =>
  AVAILABLE_COUNTRIES.includes(countryCode);
