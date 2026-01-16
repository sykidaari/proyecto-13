import backend from '@/api/config/axios.js';
import {
  useRandomService,
  useSelectCountry
} from '@c/features/TopShowBanners/helpers.js';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const TopShowBanners = () => {
  const country = useSelectCountry();

  const serviceId = useRandomService(country);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['topShowsImgs', country, serviceId],
    enabled: !!serviceId,
    queryFn: async () => {
      const res = await backend.get(`/top/${country}/${serviceId}`);
      return res.data;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnMount: false
  });

  useEffect(() => {
    if (data && data.shows?.length === 0) {
      refetch();
    }
  }, [data, refetch]);

  useEffect(() => {
    console.log('data:', data, 'error:', error, 'isLoading:', isLoading);
  }, [data, error, isLoading]);

  return (
    <div className='fixed w-dvw h-dvh top-0 left-0 mobile:p-0'>
      {data &&
        data.shows.map((show, index) => (
          <picture key={index}>
            <source
              media='(min-width: 40rem) and (orientation: landscape)'
              srcSet={show.horizontalPoster}
            />
            <source
              media='(max-width: 40rem) and (orientation: landscape)'
              srcSet={show.horizontalPoster}
            />
            <source
              media='(max-width: 40rem) and (orientation: portrait)'
              srcSet={show.verticalPoster}
            />
            <img src={show.verticalPoster} alt='poster' className='' />
          </picture>
        ))}
    </div>
  );
};

export default TopShowBanners;
