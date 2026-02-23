import useIsSelf from '@/contexts/UserSession/hooks/useIsSelf.js';
import useIsFriend from '@/hooks/people/useIsFriend.js';
import useUserProfile from '@/hooks/user/useUserProfile.js';
import FriendshipButtons from '@c/features/user/UserProfile/FriendshipButtons/FriendshipButton.jsx';
import UserProfileCard from '@c/features/user/UserProfile/UserProfileCard/UserProfileCard.jsx';

const UserProfile = ({ userId }) => {
  const isSelf = useIsSelf(userId);
  const isFriend = useIsFriend(userId);

  const { data, isPending, isError } = useUserProfile(userId);

  const shared = data?.accountSettings?.isSharedInfo;
  const sharedWatchlist = shared?.watchList;
  const sharedFavorites = shared?.favorites;
  const isSharedWatchlist = sharedWatchlist === true;
  const isSharedFavorites = sharedFavorites === true;

  const hasShared = isSharedWatchlist || isSharedFavorites;

  return (
    <div className='flex flex-col items-center *:w-full gap-2.5'>
      <div>
        {data && (
          <UserProfileCard
            user={data}
            isLoading={isPending}
            isError={isError}
          />
        )}
      </div>
      {!isSelf && <FriendshipButtons userId={userId} />}
      {(isSelf || (isFriend && hasShared)) && ''}
    </div>
  );
};

export default UserProfile;
