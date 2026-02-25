import cN from '@/utils/classNameManager';
import React from 'react';

const MultiListContainer = ({ className, children }) => {
  return (
    <div
      className={cN(
        'flex w-full *:flex-1 max-mobile:max-w-md flex-col mobile:flex-row gap-5 flex-1 min-h-0 h-full pb-5 max-short:pb-2.5 max-medium-height:min-h-100',
        className
      )}
    >
      {children}

      {/* empty div to create spacing on mobile */}
      <div className='min-h-1 mobile:hidden' />
    </div>
  );
};

export default MultiListContainer;
