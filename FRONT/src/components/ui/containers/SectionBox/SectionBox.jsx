import cN from '@/utils/classNameManager.js';

const SectionBox = ({ children, className }) => {
  return (
    <div
      className={cN(
        'w-full h-full flex flex-col items-center bg-secondary rounded-box p-2.5 gap-5 max-compact:p-1.5 max-compact:gap-2.5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionBox;
