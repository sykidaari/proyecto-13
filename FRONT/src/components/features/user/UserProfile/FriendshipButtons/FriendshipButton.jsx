import backend from '@/api/config/axios';
import useText from '@/contexts/App/hooks/useText.js';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useIsFriend from '@/hooks/user/useIsFriend.js';
import cN from '@/utils/classNameManager.js';
import { useQuery } from '@tanstack/react-query';

const FriendshipButtons = ({ userId, isSelf = false }) => {
  const isFriend = useIsFriend(isSelf, userId);
  const {
    requestFriendship: requestFriendshipText,
    acceptFriendship: acceptFriendshipText,
    rejectFriendship: rejectFriendshipText
  } = useText('features.people.friendship');

  const currentUserId = useCurrentUserId();

  const { data, error, isError, isPending } = useQuery({
    queryKey: ['relationship', currentUserId, userId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/people/${userId}/relationship/`
      );

      return data;
    }
  });

  console.log(data, error, isPending);

  return (
    <button className={cN()}>{isFriend ? requestFriendshipText : ''}</button>
  );
};

export default FriendshipButtons;
