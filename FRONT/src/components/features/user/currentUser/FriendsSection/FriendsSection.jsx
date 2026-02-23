import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useFriendsList from '@/hooks/user/currentUser/useFriendsList';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard';
import { useUserProfileModal } from '@c/features/user/UserProfile/UserProfileModal/hooks';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';

const FriendsSection = () => {
  const { title: titleText, noFriends: noItemsText } = useText(
    'features.user.currentUser.friendsSection'
  );

  const currentUserId = useCurrentUserId();

  const { data, isPending, isError, isSuccess } = useFriendsList();

  useMarkAllItemsAsSeen(`/user/${currentUserId}/private/friends`, isSuccess);

  const {
    user: selectedUser,
    setUser: setSelectedUser,
    open: selectedUserOpen,
    setOpen: setSelectedUserOpen
  } = useUserProfileModal();

  return (
    <>
      <ListBox
        title={titleText}
        isLoading={isPending}
        noItems={!data?.friendsList || !data?.friendsList.length}
        noItemsText={noItemsText}
        isError={isError}
      >
        {data?.friendsList.map((item) => (
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
