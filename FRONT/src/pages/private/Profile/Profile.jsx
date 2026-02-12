import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';
import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';

const Profile = () => {
  const {
    state: { userId }
  } = useUserSessionContext();

  return (
    <FullLengthPageWrapper>
      <UserProfile userId={userId} isSelf />
    </FullLengthPageWrapper>
  );
};

export default Profile;
