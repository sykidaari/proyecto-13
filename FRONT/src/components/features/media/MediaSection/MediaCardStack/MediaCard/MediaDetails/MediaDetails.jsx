import useText from '@/contexts/App/hooks/useText.js';
import GenresBadgesList from '@c/features/media/GenresBadgesList/GenresBadgesList.jsx';
import { useEnrichedServices } from '@c/features/media/StreamingBadgesList/hooks.js';
import StreamingBadgesList from '@c/features/media/StreamingBadgesList/StreamingBadgesList.jsx';

const MediaDetails = ({ details, streamingOptions }) => {
  const {
    rating: ratingTitle,
    directors: directorsTitle,
    creators: creatorsTitle,
    cast: castTitle,
    runtime: runtimeTitle,
    seasonCount: seasonCountTitle,
    streamingOptions: streamingOptionsTitle
  } = useText('features.media.detailsTitles');

  const {
    releaseYear,
    overview,
    genres,
    rating,
    directors,
    creators,
    cast,
    runtime,
    seasonCount
  } = details || {};

  const enrichedServices = useEnrichedServices(streamingOptions);

  return (
    <section className='absolute top-0.5 bottom-0.5 backdrop-blur-xs p-2.5 flex items-center cursor-auto select-text max-w-full max-compact:p-1.5 '>
      <div className='size-fit flex flex-col bg-base-100/75 rounded-box p-2.5 max-w-full mobile:max-w-2/3 max-mobile:text-balance text-sm gap-2.5 py-5 pb-10 max-h-full overflow-y-auto max-compact:text-xs'>
        <div className='flex flex-col gap-2.5'>
          {releaseYear && <p>{releaseYear}</p>}
          {overview && <p>{overview}</p>}
          <GenresBadgesList genres={genres} />
          {rating && (
            <p>
              <span className='font-semibold'>{ratingTitle}:</span> {rating}
            </p>
          )}
          {runtime && (
            <p>
              <span className='font-semibold'>{runtimeTitle}:</span> {runtime}
            </p>
          )}
          {seasonCount && (
            <p>
              <span className='font-semibold'>{seasonCountTitle}:</span>{' '}
              {seasonCount}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-1.5'>
          {directors?.length > 0 && (
            <div className='flex gap-1'>
              <p className='font-semibold'>{directorsTitle}:</p>
              <ul className='contents'>
                {directors.map((d, i) => (
                  <li key={d}>
                    {d}
                    {i < directors.length - 1 && ','}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {creators?.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              <p className='font-semibold'>{creatorsTitle}:</p>
              <ul className='contents'>
                {creators.map((c, i) => (
                  <li key={c}>
                    {c}
                    {i < creators.length - 1 && ','}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cast?.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              <p className='font-semibold '>{castTitle}:</p>

              <ul className='contents'>
                {cast.map((c, i) => (
                  <li key={c}>
                    {c}
                    {i < cast.length - 1 && ','}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {enrichedServices?.length > 0 && (
          <div className='flex gap-1 mt-5 flex-wrap'>
            <p className='font-semibold text-nowrap'>
              {streamingOptionsTitle}:
            </p>
            <StreamingBadgesList services={enrichedServices} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaDetails;
