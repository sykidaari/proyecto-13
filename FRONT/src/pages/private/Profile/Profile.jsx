import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';
import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';

const Profile = () => {
  const {
    state: { userId }
  } = useUserSessionContext();

  return (
    <div className='flex flex-col mobile:flex-row'>
      <UserProfile userId={userId} isSelf />
    </div>
  );
};

export default Profile;
