import cN from '@/utils/classNameManager.js';
import { useState } from 'react';

const ClickableTooltip = ({
  containerClassName,
  tooltipClassName,
  initialButtonContent,
  tooltipContent,

  onClick
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cN('tooltip', containerClassName, open && 'tooltip-open')}
    >
      <button>{initialButtonContent}</button>
      <button
        className={cN(
          'tooltip-content hover:cursor-pointer pointer-events-auto',
          tooltipClassName
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {tooltipContent}
      </button>
    </div>
  );
};

export default ClickableTooltip;
