import cN from '@/utils/classNameManager.js';

const SectionBox = ({ children, className }) => {
  return (
    <div
      className={cN(
        'w-full h-full flex flex-col items-center gap-10 bg-secondary rounded-box p-7.5 px-2.5 mobile:px-5 glass',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionBox;
