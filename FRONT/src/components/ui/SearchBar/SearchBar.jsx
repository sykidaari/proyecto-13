import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import cN from '@/utils/classNameManager.js';
import TextField from '@c/ui/form/TextField/TextField.jsx';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const SearchBar = ({
  onSearch,
  placeholder,
  delay = 500,
  mode = 'debounce', // "debounce" | "submit"
  isError,
  withErrorText = false,
  showLoader = false,
  isLoading
}) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, delay);
  const errorText = useServerProblemtext();

  // visual changes since can't and shouldn't change isError and isLoading
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    if (mode !== 'debounce') return;

    onSearch?.(debounced);
  }, [debounced, mode, onSearch]);

  const submit = () => {
    if (mode !== 'submit') return;

    setIsIdle(false);
    onSearch?.(value);
  };

  return (
    <div className={cN('w-full', withErrorText && isError && 'h-16')}>
      <TextField
        error={isError && withErrorText && errorText}
        className='w-full input-secondary pl-9 pr-10'
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          setIsIdle(true);
        }}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      >
        <div className='size-7 absolute top-1.5 left-1.5 text-secondary z-10 cursor-pointer'>
          {/* icon is always visible, cause the border it has is used in loader! */}
          <MagnifyingGlassCircleIcon
            onClick={submit}
            className={cN(
              !isIdle &&
                ((isError && 'text-error/50') ||
                  (isLoading && 'text-secondary/50'))
            )}
          />
          <div className='absolute top-1.5 left-1.5 bg-base-100 rounded-full'>
            {showLoader && (
              <span
                className={cN(
                  'loading loading-xs ',
                  (!isIdle || mode === 'debounce') && isLoading
                    ? 'block'
                    : 'hidden'
                )}
              />
            )}
          </div>
        </div>
      </TextField>
    </div>
  );
};

export default SearchBar;
