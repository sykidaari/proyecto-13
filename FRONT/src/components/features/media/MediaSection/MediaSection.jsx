import useText from '@/contexts/App/hooks/useText.js';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard.jsx';
import MediaCardStack from '@c/features/media/MediaSection/MediaCardStack/MediaCardStack.jsx';

import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem.jsx';

const MediaSection = ({
  shows = [],

  isLoading,
  isError,
  hasNextPage,

  swipeDirection,

  specifyShowType = false,

  onPositive,
  onNegative,

  PositiveButton,
  NegativeButton,
  GoBackButton
}) => {
  const { noResults: noResultsText, noneLeft: noneLeftText } =
    useText('features.media') || {};

  const noResults = shows.length === 0;
  const noMorePages = !hasNextPage;
  const showNone = !isLoading && !isError && (noResults || noMorePages);

  return (
    <section className=' bg-base-200 h-full w-full rounded-box p-2.5 mobile:p-5  min-[450px]:px-[7dvw] min-[501px]:max-mobile:px-[12dvw] overflow-hidden flex flex-col'>
      <div className='flex-1 relative'>
        <div className='relative size-full z-50'>
          <MediaCardStack
            medias={shows}
            direction={swipeDirection}
            renderCard={(media) => (
              <MediaCard media={media} specifyShowType={specifyShowType} />
            )}
            onPositive={onPositive}
            onNegative={onNegative}
            controlButtons={({ swipePositive, swipeNegative, goBack }) => (
              <>
                {NegativeButton && <NegativeButton onClick={swipeNegative} />}
                {PositiveButton && <PositiveButton onClick={swipePositive} />}

                {GoBackButton && <GoBackButton onClick={goBack} />}
              </>
            )}
          />
          {isLoading && (
            <div className='absolute top-1/2 left-1/2 -translate-1/2 rounded-full glass p-2.5 backdrop-blur-xs bg-base-100/50 z-100'>
              <span className='loading loading-xl text-primary' />
            </div>
          )}
        </div>

        {/* at bottom, shows after stack if isError/noPagesLeft, user can scroll until getting to that point*/}
        <div className='absolute inset-0 flex justify-center items-center z-10 *:text-center *:text-sm mobile:*:text-base flex-col'>
          {!isLoading && isError && <ServerProblem />}
          {showNone && (
            <p className='text-info'>
              {noResults ? noResultsText : noneLeftText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
