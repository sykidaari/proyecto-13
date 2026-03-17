import useFetchMedias from '@/hooks/media/useFetchMedias.js';
import useKeywordPlaceholderText from '@/hooks/media/useKeywordPlaceholderText';
import useMediaSwipeIndex from '@/hooks/media/useMediaSwipeIndex.js';
import usePrefetchNextPage from '@/hooks/media/usePrefetchNetxPage.js';
import MediaSection from '@c/features/media/MediaSection/MediaSection.jsx';
import SearchBar from '@c/ui/SearchBar/SearchBar.jsx';
import SectionBox from '@c/ui/containers/SectionBox/SectionBox.jsx';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Discover = () => {
  const placeholderText = useKeywordPlaceholderText();
  const [query, setQuery] = useState('');
  const keyword = query.trim();

  const { shows, hasNextPage, isFetching, fetchNextPage, isError } =
    useFetchMedias({
      ...(keyword && { keyword })
    });
  const { index, advance } = useMediaSwipeIndex(shows.length);
  usePrefetchNextPage({
    totalLength: shows.length,
    currentIndex: index,
    hasNextPage,
    isFetching,
    fetchNextPage
  });

  const [searchSession, setSearchSession] = useState(0);

  return (
    <SectionBox>
      <SearchBar
        mode='submit'
        placeholder={placeholderText}
        isLoading={isFetching}
        isError={isError}
        onSearch={(value) => {
          setQuery(value);
          setSearchSession((s) => s + 1);
        }}
      />

      <MediaSection
        shows={shows}
        sessionKey={searchSession}
        isLoading={isFetching}
        isError={isError}
        hasNextPage={hasNextPage}
        swipeDirection='y'
        specifyShowType
        onNegative={advance}
        onPositive={advance}
        PositiveButton={({ onClick }) => (
          <button onClick={onClick} className='btn-secondary'>
            <ChevronUpIcon />
          </button>
        )}
        hasGoBackButton
      />
    </SectionBox>
  );
};

export default Discover;
