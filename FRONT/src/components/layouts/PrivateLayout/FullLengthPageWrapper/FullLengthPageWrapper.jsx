import cN from '@/utils/classNameManager.js';

const FullLengthPageWrapper = ({ children, className }) => {
  return (
    <div
      className={cN(
        'flex flex-col items-center min-h-[calc(100dvh-120px)] w-full pt-12.5 mobile:pt-15',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FullLengthPageWrapper;
