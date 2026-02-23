import useText from '@/contexts/App/hooks/useText.js';
import DetailsToggle from '@c/features/media/MediaSection/MediaCardStack/MediaCard/DetailsToggle/DetailsToggle.jsx';
import MediaDetails from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaDetails/MediaDetails.jsx';
import { useEffect, useRef, useState } from 'react';

const MediaCard = ({ media, specifyShowType, onMediaLoaded }) => {
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

  const skipNextMeasureRef = useRef(false);
  const toggleDetails = () => {
    skipNextMeasureRef.current = true;
    setShowDetails(!showDetails);
  };

  const [imgWidth, setImgWidth] = useState(null);
  const imgRef = useRef(null);

  const measureWidth = () => {
    if (!imgRef.current) return;

    setImgWidth(null);

    requestAnimationFrame(() => {
      if (!imgRef.current) return;
      setImgWidth(imgRef.current.offsetWidth);
    });
  };

  useEffect(() => {
    if (imgWidth === null) return;

    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [imgWidth]);

  return (
    <article
      className='flex flex-col items-center justify-center glass bg-base-100/25 rounded-box p-2.5 max-compact:p-1.5 gap-2.5 h-full min-h-0'
      style={imgWidth ? { width: imgWidth } : undefined}
    >
      <div className='w-fit min-h-0 rounded-box overflow-hidden relative'>
        <DetailsToggle onChange={toggleDetails} />

        {showDetails && (
          <MediaDetails
            details={media?.details}
            streamingOptions={media?.streamingOptions}
          />
        )}

        <picture className='inline-block max-w-full w-fit h-full max-h-full pointer-events-none'>
          <source
            srcSet={
              showDetails && media?.imageSet?.horizontalBackdrop
                ? media.imageSet.horizontalBackdrop
                : media?.imageSet?.horizontalPoster
            }
            media='(width >= 40rem)'
          />

          <img
            ref={imgRef}
            src={media?.imageSet?.verticalPoster}
            alt='banner'
            className='max-w-full m-auto h-full max-h-full rounded-box object-contain'
            onLoad={() => {
              if (skipNextMeasureRef.current) {
                skipNextMeasureRef.current = false;
                onMediaLoaded?.();
                return;
              }

              measureWidth();
              onMediaLoaded?.();
            }}
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
