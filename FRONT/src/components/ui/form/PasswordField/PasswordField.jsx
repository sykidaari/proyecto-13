import useText from '@/contexts/App/hooks/useText.js';
import Label from '@c/ui/form/Label/Label.jsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const PasswordField = ({
  labelText,
  placeholder,
  error,
  children,
  ...props
}) => {
  const standardText = useText('ui.form.fields.password.label');

  const resolvedLabelText =
    labelText === undefined
      ? standardText
      : labelText === false
      ? null
      : labelText;

  const [show, setShow] = useState(false);

  return (
    <Label error={error}>
      {resolvedLabelText}
      <input
        {...props}
        type={show ? 'text' : 'password'}
        className='input'
        placeholder={placeholder}
      />
      <button
        type='button'
        onClick={() => setShow(!show)}
        className='size-6 absolute right-2 top-7.5 z-10 bg-base-100 rounded-full pl-1'
      >
        {show ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
      {children}
    </Label>
  );
};

export default PasswordField;
