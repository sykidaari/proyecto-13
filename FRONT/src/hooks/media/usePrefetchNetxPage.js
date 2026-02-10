import { useEffect } from 'react';

const usePrefetchNextPage = ({
  totalLength,
  currentIndex,
  hasNextPage,
  isFetching,
  fetchNextPage,
  threshold = 1
}) => {
  useEffect(() => {
    if (!hasNextPage || isFetching) return;
    if (totalLength === 0) return;

    if (totalLength - currentIndex <= threshold) {
      fetchNextPage();
    }
  }, [
    totalLength,
    currentIndex,
    hasNextPage,
    isFetching,
    fetchNextPage,
    threshold
  ]);
};

export default usePrefetchNextPage;
