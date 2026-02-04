import COUNTRIES_AND_SERVICES from '@/constants/domain/countriesAndServices.js';
import { useMemo } from 'react';

export const useEnrichedServices = (streamingOptions) => {
  return useMemo(() => {
    if (!streamingOptions?.[0]?.services) return [];

    const countryCode = streamingOptions[0].country;

    const countryConfig = COUNTRIES_AND_SERVICES.find(
      (c) => c.countryCode === countryCode
    );

    return Object.values(
      streamingOptions[0].services.reduce((acc, s) => {
        const meta = countryConfig?.services?.find((cs) => cs.id === s.id);

        acc[s.id] = {
          ...s,
          name: meta?.name ?? s.id,
          themeColor: meta?.themecolor ?? ''
        };

        return acc;
      }, {})
    );
  }, [streamingOptions]);
};
