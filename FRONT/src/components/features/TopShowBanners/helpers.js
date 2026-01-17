import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// HOOKS

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

export const divideDataForLayout = (data) => {
  const count = data.length;

  const amount = count > 15 ? 3 : count > 10 ? 2 : 1;

  const groups = Array.from({ length: amount }, () => []);

  const base = Math.floor(count / amount);
  const extra = count % amount;

  let index = 0;

  for (let i = 0; i < amount; i++) {
    const size = base + (i < extra ? 1 : 0);
    groups[i] = data.slice(index, index + size);
    index += size;
  }

  const speeds = Array.from({ length: amount }, () => {
    return 15 + (Math.random() * 1.2 - 0.6);
  });

  return { groups, speeds };
};
