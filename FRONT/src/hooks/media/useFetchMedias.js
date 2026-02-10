import backend from '@/api/config/axios.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import { useInfiniteQuery } from '@tanstack/react-query';

const useFetchMedias = (optionalParams = {}) => {
  const {
    state: { language, country }
  } = useAppContext();

  const paramsKey = JSON.stringify(Object.entries(optionalParams).sort());

  const query = useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['fetchMedias', paramsKey, country, language],
    queryFn: async ({ pageParam = null }) => {
      const params = {
        countryCode: country,
        languageCode: language,
        ...optionalParams,
        ...(pageParam && { cursor: pageParam })
      };

      const { data } = await backend.get('/media/fetch', { params });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });

  const shows = query.data?.pages
    ? query.data.pages.flatMap((p) => p.shows)
    : [];

  return {
    shows,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetching: query.isFetching,
    // isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    error: query.error
  };
};

export default useFetchMedias;
