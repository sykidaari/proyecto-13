import useIsFriend from '@/hooks/user/useIsFriend.js';
import useUserProfile from '@/hooks/user/useUserProfile.js';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard.jsx';

const UserProfile = ({ userId, isSelf = false }) => {
  const isFriend = useIsFriend(isSelf);
  const { data, isPending, isError } = useUserProfile(userId);

  const shared = data?.accountSettings?.isSharedInfo;
  const sharedWatchlist = shared?.watchList;
  const sharedFavorites = shared?.favorites;
  const isSharedWatchlist = sharedWatchlist === true;
  const isSharedFavorites = sharedFavorites === true;

  const hasShared = isSharedWatchlist || isSharedFavorites;

  return (
    <div>
      <div>
        <UserProfileCard user={data} isLoading={isPending} isError={isError} />
      </div>
      {(isSelf || (isFriend && hasShared)) && ''}
    </div>
  );
};

export default UserProfile;
