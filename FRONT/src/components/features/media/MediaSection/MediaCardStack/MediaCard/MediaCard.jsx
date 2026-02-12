import useText from '@/contexts/App/hooks/useText.js';
import DetailsToggle from '@c/features/media/MediaSection/MediaCardStack/MediaCard/DetailsToggle/DetailsToggle.jsx';
import MediaDetails from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaDetails/MediaDetails.jsx';
import { useState } from 'react';

const MediaCard = ({ media, specifyShowType }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { movie: movieText, series: seriesText } = useText(
    'features.media.showTypes'
  );

  const showTypeText =
    media.showType === 'movie'
      ? movieText
      : media.showType === 'series'
        ? seriesText
        : null;

  return (
    <article className='flex flex-col items-center justify-center glass bg-base-100/25 rounded-box p-2.5 gap-2.5 h-full min-h-0 w-fit'>
      <div className='w-fit min-h-0 rounded-box overflow-hidden relative'>
        <DetailsToggle onChange={() => setShowDetails(!showDetails)} />

        {showDetails && (
          <MediaDetails
            details={media?.details}
            streamingOptions={media?.streamingOptions}
          />
        )}

        <picture className='block max-w-full w-fit h-full max-h-full pointer-events-none '>
          <source
            srcSet={
              showDetails && media?.imageSet?.horizontalBackdrop
                ? media.imageSet.horizontalBackdrop
                : media?.imageSet?.horizontalPoster
            }
            media='(width >= 40rem)'
          />
          <img
            src={media?.imageSet?.verticalPoster}
            alt='banner'
            className='max-w-full m-auto h-full max-h-full rounded-box object-contain'
          />
        </picture>
      </div>

      <div className='flex gap-2 items-center justify-center w-fit'>
        <h3 className='text-lg mobile:text-xl max-mobile:text-base font-semibold text-center cursor-auto select-text'>
          {media?.title}
        </h3>
        {specifyShowType && showTypeText && (
          <h4 className='badge badge-sm badge-secondary'>{showTypeText}</h4>
        )}
      </div>
    </article>
  );
};
export default MediaCard;
