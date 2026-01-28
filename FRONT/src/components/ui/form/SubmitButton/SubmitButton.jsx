import cN from '@/utils/classNameManager.js';
import React from 'react';

const SubmitButton = ({ isLoading, children, className }) => {
  return (
    <button className={cN('btn btn-neutral mt-4', className)}>
      {isLoading ? <span className='loading' /> : children}
    </button>
  );
};

export default SubmitButton;
