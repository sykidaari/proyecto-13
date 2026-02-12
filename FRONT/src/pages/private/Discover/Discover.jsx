import useText from '@/contexts/App/hooks/useText.js';
import useFetchMedias from '@/hooks/media/useFetchMedias.js';
import useMediaSwipeIndex from '@/hooks/media/useMediaSwipeIndex.js';
import usePrefetchNextPage from '@/hooks/media/usePrefetchNetxPage.js';
import MediaSection from '@c/features/media/MediaSection/MediaSection.jsx';
import SearchBar from '@c/ui/SearchBar/SearchBar.jsx';
import SectionBox from '@c/ui/SectionBox/SectionBox.jsx';
import {
  ArrowTurnRightUpIcon,
  ArrowUturnLeftIcon,
  ChevronUpIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Discover = () => {
  const searchSuggestions = useText('pages.private.discover.searchSuggestions');
  const [placeholderText] = useState(() => {
    const i = Math.floor(Math.random() * searchSuggestions.length);
    return searchSuggestions[i];
  });
  const [query, setQuery] = useState('');
  const keyword = query.trim();

  const { shows, hasNextPage, isFetching, fetchNextPage, isError } =
    useFetchMedias({
      ...(keyword && { keyword })
    });
  const { index, advance } = useMediaSwipeIndex();
  usePrefetchNextPage({
    totalLength: shows.length,
    currentIndex: index,
    hasNextPage,
    isFetching,
    fetchNextPage
  });

  return (
    <SectionBox>
      <SearchBar
        mode='submit'
        placeholder={placeholderText}
        isLoading={isFetching}
        isError={isError}
        onSearch={setQuery}
      />

      <MediaSection
        shows={shows}
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
