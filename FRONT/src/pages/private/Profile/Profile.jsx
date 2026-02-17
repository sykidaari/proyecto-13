import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';
import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';

const Profile = () => {
  const userId = useCurrentUserId();

  return (
    <FullLengthPageWrapper>
      <UserProfile userId={userId} />
    </FullLengthPageWrapper>
  );
};

export default Profile;
