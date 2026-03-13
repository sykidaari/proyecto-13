import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useModal from '@/hooks/useModal';
import useRequests from '@/hooks/user/currentUser/useRequests';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';

const ReceivedFriendRequestsSection = ({ secondary = false }) => {
  const {
    friends: { title: titleText },
    noRequests: noItemsText
  } = useText('features.user.currentUser.receivedRequests');

  const {
    item: selectedUser,
    open: selectedUserOpen,
    setOpen: setSelectedUserOpen,
    openSelectedItemModal: openSelectedUserModal
  } = useModal();

  const { data, isPending, isError, isSuccess } = useRequests();

  const currentUserId = useCurrentUserId();
  useMarkAllItemsAsSeen(
    `/user/${currentUserId}/private/friends/request`,
    isSuccess
  );

  const receivedRequests = data?.friends?.received;

  return (
    <>
      <ListBox
        title={titleText}
        noItemsText={noItemsText}
        isLoading={isPending}
        isError={isError}
        noItems={!receivedRequests || !receivedRequests.length}
        secondary={secondary}
      >
        {receivedRequests &&
          receivedRequests.map((item) => (
            <ListBoxItem
              key={item._id}
              onClick={() => {
                openSelectedUserModal(item.user);
              }}
              isNew={item.isNewItem}
            >
              <UserProfileCard
                user={item.user}
                hideRelationshipBanner
                minimal
                listItem
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
