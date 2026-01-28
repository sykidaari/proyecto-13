import cN from '@/utils/classNameManager.js';
import React from 'react';

const Form = ({ children, className, onSubmit, noValidate }) => {
  return (
    <form
      noValidate={noValidate}
      onSubmit={onSubmit}
      className={cN(
        'w-full flex flex-col items-center gap-1 bg-base-100',
        className
      )}
    >
      {children}
    </form>
  );
};

export default Form;
