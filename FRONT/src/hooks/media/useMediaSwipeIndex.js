import { useState } from 'react';

const useMediaSwipeIndex = (length, { initial = 0 } = {}) => {
  const [index, setIndex] = useState(initial);

  const advance = () => {
    setIndex((i) => Math.min(i + 1, length - 1));
  };

  const safeIndex = Math.min(index, length - 1);

  return { index: safeIndex, advance };
};

export default useMediaSwipeIndex;
