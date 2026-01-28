import { COUNTRY_CODES as AVAILABLE_COUNTRIES } from '@/constants/domain/countriesAndServices.js';
import { LANGUAGE_CODES as AVAILABLE_LANGUAGES } from '@/constants/domain/languages.js';

export const isSupportedLanguage = (languageCode) =>
  AVAILABLE_LANGUAGES.includes(languageCode);
export const isSupportedCountry = (countryCode) =>
  AVAILABLE_COUNTRIES.includes(countryCode);

export const backendErrorMessage = (error) => error?.response?.data?.error;
export const backendErrorStatus = (error) => error?.response?.data?.status;

export const isServerProblem = (error, knownErrorsArray) => {
  if (!error) return false;

  const code = backendErrorMessage(error);
  return !error?.response || !knownErrorsArray.includes(code);
};

export const retry = async (fn, tries = 2) => {
  try {
    return await fn();
  } catch (err) {
    if (tries <= 1) throw err;
    return retry(fn, tries - 1);
  }
};
