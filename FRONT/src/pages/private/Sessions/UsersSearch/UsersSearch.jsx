import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';

import cN from '@/utils/classNameManager.js';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard.jsx';
import SearchBar from '@c/ui/SearchBar/SearchBar.jsx';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const UsersSearch = ({ onSelectUser }) => {
  const { placeholder: placeholderText } = useText(
    'features.people.usersSearch'
  );

  const [value, setValue] = useState('');
  const query = value.trim();

  const {
    data: foundUsers,
    isError,
    isFetching
  } = useQuery({
    queryKey: ['searchUsers', query],
    queryFn: async () => {
      const { data } = await backend.get('/user/search', {
        params: { userName: query }
      });

      return data;
    },

    enabled: !!query
  });

  const noResults = !foundUsers?.length || !foundUsers;

  return (
    <section
      className={cN(
        'w-full glass rounded-box p-1.5 bg-secondary/50 flex flex-col max-w-2xl',
        !isError && !noResults && 'gap-1.5'
      )}
    >
      <SearchBar
        mode='debounce'
        placeholder={placeholderText}
        withErrorText
        showLoader={true}
        onSearch={setValue}
        isError={isError}
        isLoading={isFetching}
      />
      <div className={cN(noResults && 'h-0')}>
        <ul className='menu w-full menu-xs gap-0.5 max-h-52 flex-nowrap overflow-auto p-0'>
          {foundUsers?.map((user) => (
            <li
              key={user._id}
              className='w-full'
              onClick={() => onSelectUser(user)}
            >
              <button className='size-full pl-0'>
                <UserProfileCard user={user} minimal listItem />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UsersSearch;
