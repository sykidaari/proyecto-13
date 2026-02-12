import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard.jsx';

const MediaCardStack = ({
  medias = [],

  specifyShowType,

  direction = 'x', // x or y
  threshold = 120,

  onPositive,
  onNegative,

  controlButtons
}) => {
  const [index, setIndex] = useState(0);

  const current = medias[index];
  const next = medias[index + 1];

  const doPositive = () => {
    if (!current) return;
    onPositive?.(current);
    setIndex((i) => i + 1);
  };

  const doNegative = () => {
    if (!current) return;
    onNegative?.(current);
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    setIndex((i) => (i > 0 ? i - 1 : 0));
  };

  const handleEnd = (_, info) => {
    const offset = direction === 'x' ? info.offset.x : info.offset.y;

    if (offset > threshold) doPositive();
    else if (offset < -threshold) doNegative();
  };

  return (
    <div className='flex flex-col h-full items-center justify-center gap-3'>
      <div className='relative select-none flex items-center justify-center rounded-box max-h-full min-h-0 w-fit'>
        {next && (
          <div className='absolute inset-0 scale-95 opacity-60 flex items-center justify-center'>
            {<MediaCard media={next} specifyShowType={specifyShowType} />}
          </div>
        )}

        {current && (
          <motion.div
            key={current.id ?? index}
            drag={direction}
            dragElastic={0.2}
            whileDrag={{ scale: 0.9 }}
            onDragEnd={handleEnd}
            className='relative z-10 cursor-grab active:cursor-grabbing flex items-center justify-center w-fit h-full min-w-0'
          >
            {<MediaCard media={current} specifyShowType={specifyShowType} />}
          </motion.div>
        )}
      </div>
      <div className='flex gap-2.5 items-center *:btn *:btn-lg *:p-2.5 *:btn-circle glass p-2.5 justify-center rounded-box bg-base-100/25 relative z-20'>
        {controlButtons?.({
          swipePositive: doPositive,
          swipeNegative: doNegative,
          goBack
        })}
      </div>
    </div>
  );
};

export default MediaCardStack;
