import cN from '@/utils/classNameManager.js';

const ErrorMessage = ({ text, className }) => {
  return (
    <span className={cN('text-error text-xs pl-2.5 text-wrap', className)}>
      {text}
    </span>
  );
};

export default ErrorMessage;
