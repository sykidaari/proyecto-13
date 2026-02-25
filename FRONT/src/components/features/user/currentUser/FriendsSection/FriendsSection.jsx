import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useFriendsList from '@/hooks/user/currentUser/useFriendsList';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard';
import { useUserProfileModal } from '@c/features/user/UserProfile/UserProfileModal/hooks';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';
import SearchBar from '@c/ui/SearchBar/SearchBar';
import { useState } from 'react';

const FriendsSection = () => {
  const {
    title: titleText,
    noFriends: noItemsText,
    search: SearchBarPlaceholder
  } = useText('features.user.currentUser.friendsSection');

  const currentUserId = useCurrentUserId();

  const { data, isPending, isError, isSuccess } = useFriendsList();
  console.log(data);
  useMarkAllItemsAsSeen(
    `/user/${currentUserId}/private/friends`,
    isSuccess,
    'friendsList'
  );

  const {
    user: selectedUser,
    setUser: setSelectedUser,
    open: selectedUserOpen,
    setOpen: setSelectedUserOpen
  } = useUserProfileModal();

  const [searchQuery, setSearchQuery] = useState('');

  const friends = data?.friendsList ?? [];

  const filteredFriends = searchQuery.trim()
    ? friends.filter(({ user }) =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  return (
    <>
      <ListBox
        title={titleText}
        isLoading={isPending}
        noItems={!data?.friendsList || !data?.friendsList.length}
        noItemsText={noItemsText}
        isError={isError}
        topContent={
          <div className='max-mobile:*:max-w-xs *:m-auto'>
            <SearchBar
              placeholder={SearchBarPlaceholder}
              onSearch={setSearchQuery}
              noResults={!filteredFriends.length}
              debounceDelay={150}
            />
          </div>
        }
      >
        {filteredFriends.map((item) => (
          <ListBoxItem
            key={item._id}
            isNew={item.isNewItem}
            onClick={() => {
              setSelectedUser(item.user);
              setSelectedUserOpen(true);
            }}
          >
            <UserProfileCard
              user={item.user}
              hideRelationshipBanner
              smallerImg
            />
          </ListBoxItem>
        ))}
      </ListBox>
      {selectedUser && (
        <UserProfileModal
          userId={selectedUser._id}
          open={selectedUserOpen}
          setOpen={setSelectedUserOpen}
        />
      )}
    </>
  );
};

export default FriendsSection;
