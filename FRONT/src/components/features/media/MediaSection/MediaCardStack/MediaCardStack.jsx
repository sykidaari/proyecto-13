import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const MediaCardStack = ({
  medias = [],
  renderCard,
  direction = 'x', // x or y
  threshold = 120,
  onPositive,
  onNegative
}) => {
  const [index, setIndex] = useState(0);

  const current = medias[index];
  const next = medias[index + 1];

  const handleEnd = (_, info) => {
    const offset = direction === 'x' ? info.offset.x : info.offset.y;

    if (offset > threshold) {
      onPositive?.(current);
      setIndex((i) => i + 1);
    } else if (offset < -threshold) {
      onNegative?.(current);
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className='relative w-full h-full select-none overflow-hidden  flex items-center justify-center'>
      {next && (
        <div className='absolute inset-0 scale-95 opacity-60 flex items-center justify-center'>
          {renderCard(next)}
        </div>
      )}

      {current && (
        <motion.div
          key={current.id ?? index}
          drag={direction}
          dragElastic={0.2}
          whileDrag={{ scale: 0.9 }}
          onDragEnd={handleEnd}
          className='absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center'
        >
          {renderCard(current)}
        </motion.div>
      )}
    </div>
  );
};

export default MediaCardStack;
