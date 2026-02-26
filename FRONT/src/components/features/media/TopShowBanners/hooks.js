import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSelectCountry = () => {
  const {
    state: { country: currentCountryCode },
    actions: { setCountry }
  } = useAppContext();

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['ipCountry'],
    queryFn: async () => {
      const { data } = await axios.get('http://ip-api.com/json', {
        timeout: 800
      });
      return data;
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
