import cN from '@/utils/classNameManager.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import React from 'react';

const Label = ({ error, children }) => {
  return (
    <label
      className={cN(
        'label flex flex-col items-start gap-1 not-last-of-type:mb-1.5 relative w-full',
        error && '*:input-error'
      )}
    >
      {children}

      {error && <ErrorMessage text={error} />}
    </label>
  );
};

export default Label;
