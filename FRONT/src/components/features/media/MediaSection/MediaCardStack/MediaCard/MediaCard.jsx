import useText from '@/contexts/App/hooks/useText.js';
import DetailsToggle from '@c/features/media/MediaSection/MediaCardStack/MediaCard/DetailsToggle/DetailsToggle.jsx';
import Interactions from '@c/features/media/MediaSection/MediaCardStack/MediaCard/Interactions/Interactions.jsx';
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
    <article className='flex flex-col items-center justify-center glass rounded-box p-5 w-full max-mobile:px-2.5 gap-2.5'>
      <div className='max-w-fit rounded-box overflow-hidden relative'>
        <DetailsToggle onChange={() => setShowDetails(!showDetails)} />
        {showDetails && (
          <MediaDetails
            details={media?.details}
            streamingOptions={media?.streamingOptions}
          />
        )}

        <Interactions mediaId={media.id} />

        <picture className='w-full h-full pointer-events-none block'>
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
            className='w-full object-contain max-h-[50dvh]'
          />
        </picture>
      </div>

      <div className='mobile:w-1/5 flex gap-2 items-center justify-center'>
        <h3 className='text-xl font-semibold text-center text-nowrap'>
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
