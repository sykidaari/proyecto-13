import React from 'react';
import Label from '@c/ui/form/Label/Label.jsx';
import cN from '@/utils/classNameManager.js';

const TextField = ({
  labelText,
  type = 'text',
  placeholder,
  error,
  className,
  children,
  ...props
}) => {
  return (
    <Label error={error}>
      {labelText}
      <input
        {...props}
        type={type}
        className={cN('input', className)}
        placeholder={placeholder}
      />
      {children}
    </Label>
  );
};

export default TextField;
