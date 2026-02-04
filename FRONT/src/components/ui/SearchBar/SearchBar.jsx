import TextField from '@c/ui/form/TextField/TextField.jsx';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const SearchBar = ({
  onSearch,
  placeholder,
  delay = 500,
  mode = 'debounce', // "debounce" | "submit"
  error
}) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, delay);

  useEffect(() => {
    if (mode === 'debounce') {
      onSearch?.(debounced);
    }
  }, [debounced, mode, onSearch]);

  const submit = () => {
    if (mode === 'submit') {
      onSearch?.(value);
      console.log(value);
    }
  };

  return (
    <div className='w-full h-17'>
      <TextField
        error={error}
        className='w-full input-secondary pl-9 pr-10'
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      >
        <MagnifyingGlassCircleIcon
          onClick={submit}
          className='size-7 absolute top-1.5 left-1.5 text-secondary z-10 cursor-pointer'
        />
      </TextField>
    </div>
  );
};

export default SearchBar;
