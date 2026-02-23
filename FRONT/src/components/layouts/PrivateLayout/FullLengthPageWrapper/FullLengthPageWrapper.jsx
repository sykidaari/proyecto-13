import cN from '@/utils/classNameManager.js';

const FullLengthPageWrapper = ({ children, className }) => {
  return (
    <div
      className={cN(
        'flex flex-col items-center min-h-[calc(100dvh-140px)] w-full pt-5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FullLengthPageWrapper;
