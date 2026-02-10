import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const MediaCardStack = ({
  medias = [],

  renderCard,

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
    <div className='flex flex-col size-full items-center justify-center gap-2.5 mobile:gap-5'>
      <div className='relative w-full h-fit select-none flex items-center justify-center rounded-box'>
        {next && (
          <div className='absolute inset-x-0 top-0 scale-95 opacity-60 flex items-center justify-center'>
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
            className='absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing flex items-center justify-center'
          >
            {renderCard(current)}
          </motion.div>
        )}

        {/* INVISIBLE SIZER FOR MEDIACARD */}
        <div className='invisible pointer-events-none'>
          {current && renderCard(current)}
        </div>
      </div>
      <div className='flex gap-2.5 *:btn *:btn-circle *:glass glass p-2.5 w-full justify-center rounded-box bg-base-100'>
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
