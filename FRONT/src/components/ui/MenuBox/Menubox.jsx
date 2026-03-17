import cN from '@/utils/classNameManager';

export const Menubox = ({
  title,
  noDivider = false,
  children,
  className,
  bigTitle = false
}) => {
  return (
    <>
      <div
        className={cN(
          'bg-base-100 p-2.5 rounded-box flex flex-col items-center gap-2.5',
          className
        )}
      >
        <h3
          className={cN(
            'text-sm text-secondary font-semibold text-center',
            bigTitle && 'text-lg'
          )}
        >
          {title}
        </h3>
        <div className='w-full'>{children}</div>
      </div>
      {!noDivider && <div className='divider divider-neutral' />}
    </>
  );
};
