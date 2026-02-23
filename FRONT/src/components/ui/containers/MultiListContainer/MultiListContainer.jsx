import cN from '@/utils/classNameManager';
import React from 'react';

const MultiListContainer = ({ className, children }) => {
  return (
    <div
      className={cN(
        'flex w-full *:flex-1 flex-col mobile:flex-row gap-5 flex-1 min-h-0  h-full pb-5 max-short:pb-2.5 max-medium-height:min-h-100',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MultiListContainer;
