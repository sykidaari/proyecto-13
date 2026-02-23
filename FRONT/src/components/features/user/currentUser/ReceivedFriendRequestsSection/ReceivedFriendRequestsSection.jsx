import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useRequests from '@/hooks/user/currentUser/useRequests';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard';
import { useUserProfileModal } from '@c/features/user/UserProfile/UserProfileModal/hooks';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';

const ReceivedFriendRequestsSection = () => {
  const { title: titleText, noRequests: noItemsText } = useText(
    'features.user.currentUser.receivedFriendRequestsSection'
  );

  const {
    user: selectedUser,
    setUser: setSelectedUser,
    open: selectedUserOpen,
    setOpen: setSelectedUserOpen
  } = useUserProfileModal();

  const { data, isPending, isError, isSuccess } = useRequests();

  const currentUserId = useCurrentUserId();
  useMarkAllItemsAsSeen(
    `/user/${currentUserId}/private/friends/request`,
    isSuccess
  );

  console.log(data);
  const receivedRequests = data?.friends?.received;

  return (
    <>
      <ListBox
        title={titleText}
        noItemsText={noItemsText}
        isLoading={isPending}
        isError={isError}
        noItems={!receivedRequests || !receivedRequests.length}
      >
        {receivedRequests &&
          receivedRequests.map((item) => (
            <ListBoxItem
              key={item._id}
              onClick={() => {
                setSelectedUser(item.user);
                setSelectedUserOpen(true);
              }}
              isNew={item.isNewItem}
            >
              <UserProfileCard
                user={item.user}
                hideRelationshipBanner
                minimal
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

export default ReceivedFriendRequestsSection;
