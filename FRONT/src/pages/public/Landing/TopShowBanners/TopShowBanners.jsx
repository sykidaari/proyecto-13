import backend from '@/api/config/axios.js';
import { divideDataForLayout } from '@/pages/public/Landing/TopShowBanners/helpers.js';
import { useSelectCountry } from '@/pages/public/Landing/TopShowBanners/hooks.js';
import cN from '@/utils/classNameManager.js';
import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';

const TopShowBanners = () => {
  const country = useSelectCountry();

  const { data } = useQuery({
    queryKey: ['topShowsImgs', country],
    enabled: !!country,
    queryFn: async () => {
      const { data } = await backend.get(`/top/${country}`);
      return data;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnMount: false
  });

  if (!data) return null;

  const { groups, speeds } = divideDataForLayout(data);
  const length = groups.length;

  const groupHeightClass =
    length === 3 ? 'h-[32.5dvh]' : length === 2 ? 'h-[49.5dvh]' : 'h-[60dvh]';

  return (
    <div className='fixed inset-0 h-dvh flex flex-col  items-center gap-2.5'>
      {groups.map((group, i) => (
        <Marquee
          key={i}
          speed={length > 1 ? speeds[i] : 50}
          direction={i % 2 === 0 ? 'left' : 'right'}
          className='w-full h-full overflow-hidden'
        >
          {group.map((show, index) => (
            <img
              key={index}
              src={show.horizontalPoster}
              alt='poster'
              className={cN(
                'rounded-box mx-1.5 object-contain',
                groupHeightClass
              )}
            />
          ))}
        </Marquee>
      ))}
    </div>
  );
};

export default TopShowBanners;
