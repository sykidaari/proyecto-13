import useText from '@/contexts/App/hooks/useText.js';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard.jsx';
import MediaCardStack from '@c/features/media/MediaSection/MediaCardStack/MediaCardStack.jsx';

import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem.jsx';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

const MediaSection = ({
  shows = [],

  sessionKey = null,

  isLoading,
  isError,
  hasNextPage,

  swipeDirection,

  specifyShowType = false,

  onPositive,
  onNegative,

  PositiveButton,
  NegativeButton,
  hasGoBackButton
}) => {
  const { noResults: noResultsText, noneLeft: noneLeftText } =
    useText('features.media') || {};

  const noResults = shows.length === 0;
  const noMorePages = !hasNextPage;
  const showNone = !isLoading && !isError && (noResults || noMorePages);

  return (
    <section className=' bg-base-200 w-full h-full rounded-box p-2.5 overflow-hidden flex flex-col'>
      <div className='relative h-full'>
        <div className='relative h-full z-50'>
          <MediaCardStack
            key={sessionKey}
            medias={shows}
            direction={swipeDirection}
            specifyShowType={specifyShowType}
            onPositive={onPositive}
            onNegative={onNegative}
            controlButtons={({ swipePositive, swipeNegative, goBack }) => (
              <>
                {hasGoBackButton && (
                  <button
                    onClick={goBack}
                    className=' btn-warning btn-dash size-9'
                  >
                    <ArrowUturnLeftIcon />
                  </button>
                )}

                {NegativeButton && <NegativeButton onClick={swipeNegative} />}
                {PositiveButton && <PositiveButton onClick={swipePositive} />}
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
