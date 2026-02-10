import { useState } from 'react';

const useMediaSwipeIndex = ({ initial = 0 } = {}) => {
  const [index, setIndex] = useState(initial);

  const advance = () => setIndex((i) => i + 1);

  return { index, advance };
};

export default useMediaSwipeIndex;
