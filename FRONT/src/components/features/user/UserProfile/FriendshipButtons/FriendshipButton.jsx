import useText from '@/contexts/App/hooks/useText.js';
import useIsFriend from '@/hooks/user/useIsFriend.js';
import cN from '@/utils/classNameManager.js';

const FriendshipButtons = ({ userId, isSelf = false }) => {
  const isFriend = useIsFriend(isSelf, userId);
  const {
    requestFriendship: requestFriendshipText,
    acceptFriendship: acceptFriendshipText,
    rejectFriendship: rejectFriendshipText
  } = useText('features.people.friendship');

  return (
    <button className={cN()}>{isFriend ? requestFriendshipText : ''}</button>
  );
};

export default FriendshipButtons;
