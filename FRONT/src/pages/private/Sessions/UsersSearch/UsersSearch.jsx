import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard.jsx';
import SearchBar from '@c/ui/SearchBar/SearchBar.jsx';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const UsersSearch = () => {
  const { placeholder: placeholderText } = useText(
    'features.sessions.usersSearch'
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

  console.log(foundUsers, isFetching);

  return (
    <section className='w-full glass rounded-box p-2.5 bg-secondary/50'>
      <SearchBar
        mode='debounce'
        placeholder={placeholderText}
        withErrorText
        showLoader={true}
        onSearch={setValue}
        isError={isError}
        isLoading={isFetching}
      />
      <div>
        <ul className='menu w-full menu-xs gap-0.5'>
          {foundUsers?.map((user) => (
            <li key={user._id} className='w-full'>
              <button className='w-full'>
                <UserProfileCard user={user} minimal listItem onClick />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UsersSearch;
