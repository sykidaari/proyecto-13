import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';

export const useAsyncFieldAvailability = ({
  value,
  fieldName,
  queryKeyBase,
  checkFn,
  setError,
  clearErrors,
  errorMessage,
  shouldCheck = () => true,
  debounceMs = 350
}) => {
  const [debouncedValue] = useDebounce(value, debounceMs);

  const { isFetching, refetch } = useQuery({
    queryKey: [queryKeyBase, debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return { available: true };
      if (!shouldCheck(debouncedValue)) return { available: true };

      return await checkFn(debouncedValue);
    },
    enabled: false
  });

  useEffectIgnoreDeps(() => {
    if (!debouncedValue || !shouldCheck(debouncedValue)) {
      clearErrors(fieldName);
      return;
    }

    const run = async () => {
      const result = await refetch();
      if (result.data?.available === false) {
        setError(fieldName, {
          type: 'backend',
          message: errorMessage
        });
      } else {
        clearErrors(fieldName);
      }
    };

    run();
  }, [debouncedValue]);

  const runCheck = async () => {
    if (!debouncedValue || !shouldCheck(debouncedValue)) {
      clearErrors(fieldName);
      return { data: { available: true } };
    }

    const result = await refetch();
    if (!result.data?.available) {
      setError(fieldName, { type: 'backend', message: errorMessage });
    }
    return result;
  };

  return { isChecking: isFetching, runCheck };
};
