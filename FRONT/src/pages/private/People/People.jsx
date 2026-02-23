import R from '@/constants/client/routePaths.js';
import isSelf from '@/contexts/UserSession/helpers/isSelf.js';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';
import UsersSearch from '@/pages/private/Sessions/UsersSearch/UsersSearch.jsx';
import FriendsSection from '@c/features/user/currentUser/FriendsSection/FriendsSection';
import ReceivedFriendRequestsSection from '@c/features/user/currentUser/ReceivedFriendRequestsSection/ReceivedFriendRequestsSection';
import { useUserProfileModal } from '@c/features/user/UserProfile/UserProfileModal/hooks';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';
import MultiListContainer from '@c/ui/containers/MultiListContainer/MultiListContainer';
import { useNavigate } from 'react-router-dom';

const People = () => {
  const currentUserId = useCurrentUserId();
  const {
    user: selectedUser,
    setUser: setSelectedUser,
    open: selectedUserOpen,
    setOpen: setSelectedUserOpen
  } = useUserProfileModal();
  const navigate = useNavigate();

  return (
    <FullLengthPageWrapper>
      <div className='w-full flex justify-center *:absolute relative mb-25 z-100'>
        <UsersSearch
          onSelectUser={(user) => {
            if (isSelf(user._id, currentUserId))
              return navigate(R.private.profile.abs);

            setSelectedUser(user);
            setSelectedUserOpen(true);
          }}
        />
      </div>
      {selectedUser &&
        (isSelf(selectedUser._id, currentUserId) ? (
          navigate()
        ) : (
          <UserProfileModal
            userId={selectedUser._id}
            open={selectedUserOpen}
            setOpen={setSelectedUserOpen}
          />
        ))}

      <MultiListContainer customFlexSizes>
        <FriendsSection />
        <ReceivedFriendRequestsSection />
      </MultiListContainer>
    </FullLengthPageWrapper>
  );
};

export default People;
