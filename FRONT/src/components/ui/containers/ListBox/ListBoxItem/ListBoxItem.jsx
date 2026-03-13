import useText from '@/contexts/App/hooks/useText';
import cN from '@/utils/classNameManager';
import { useState } from 'react';

const ListBoxItem = ({ children, className, onClick, isNew, disabled }) => {
  const { isNewItem: isNewText, isUpdatedItem: IsUpdatedText } =
    useText('features');

  // internal isNew so isNew visual is removed inmediately upon interaction with item
  const [renderIsNew, setRenderIsNew] = useState(isNew);

  return (
    <li
      className={cN(
        'w-full max-mobile:*:max-w-xs *:m-auto rounded-box relative bg-base-100 hover:bg-base-300',
        className,
        disabled &&
          'bg-base-100/50 pointer-events-none **:text-base-300 **:border-base-300'
      )}
    >
      {renderIsNew && (
        <div className='animate-pulse rounded-box absolute inset-0 z-10 bg-info/25 pointer-events-none'>
          <span className='badge badge-xs badge-info uppercase flex m-auto mt-1'>
            {isNewText}
          </span>
        </div>
      )}

      {/* onClick here so it only affects the actual content, not li which has container width */}
      <div
        onClick={() => {
          setRenderIsNew(false);
          onClick && onClick();
        }}
        className={cN(onClick && 'cursor-pointer')}
      >
        {children}
      </div>
    </li>
  );
};

export default ListBoxItem;
