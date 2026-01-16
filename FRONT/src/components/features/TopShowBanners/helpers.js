import COUNTRIES_AND_SERVICES from '@/constants/domain/countriesAndServices.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

export const useSelectCountry = () => {
  const {
    state: { country: currentCountryCode },
    actions: { setCountry }
  } = useAppContext();

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['ipCountry'],
    queryFn: async () => {
      const res = await axios.get('http://ip-api.com/json', { timeout: 800 });
      return res.data;
    },
    retry: false,
    staleTime: Infinity
  });

  const ipFinished = isError || isSuccess;

  let finalCountry = currentCountryCode;

  if (ipFinished && data?.countryCode)
    finalCountry = data.countryCode.toLowerCase();

  useEffectIgnoreDeps(() => {
    if (!data?.countryCode) return;

    const ipCode = data.countryCode.toLowerCase();

    if (ipCode !== currentCountryCode) setCountry(ipCode);
  }, [data]);

  return finalCountry;
};

const pickRandomServiceId = (countryCode) => {
  const country = COUNTRIES_AND_SERVICES.find(
    (c) => c.countryCode === countryCode
  );

  const services = country.services;
  const service = services[Math.floor(Math.random() * services.length)];

  return service.id;
};
export const useRandomService = (countryCode) => {
  return useMemo(() => {
    if (!countryCode) return null;
    return pickRandomServiceId(countryCode);
  }, [countryCode]);
};
