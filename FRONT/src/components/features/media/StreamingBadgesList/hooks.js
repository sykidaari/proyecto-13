import COUNTRIES_AND_SERVICES from '@/constants/domain/countriesAndServices.js';
import { useMemo } from 'react';

export const useEnrichedServices = ({
  streamingOptions,
  countryCode,
  includeAll = false
}) => {
  return useMemo(() => {
    const effectiveCountry = countryCode ?? streamingOptions?.[0]?.country;

    if (!effectiveCountry) return [];

    const countryConfig = COUNTRIES_AND_SERVICES.find(
      (c) => c.countryCode === effectiveCountry
    );

    if (!countryConfig) return [];

    const sourceServices =
      includeAll || !streamingOptions?.[0]?.services
        ? countryConfig.services
        : streamingOptions[0].services;

    return Object.values(
      sourceServices.reduce((acc, s) => {
        const id = typeof s === 'string' ? s : s.id;

        const meta = countryConfig.services.find((cs) => cs.id === id);

        acc[id] = {
          ...(typeof s === 'object' ? s : { id }),
          name: meta?.name ?? id,
          themeColor: meta?.themecolor ?? ''
        };

        return acc;
      }, {})
    );
  }, [streamingOptions, countryCode, includeAll]);
};
