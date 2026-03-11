import useText from '@/contexts/App/hooks/useText.js';
import useIsSelf from '@/contexts/UserSession/hooks/useIsSelf';
import useFriendshipMutation from '@/hooks/people/useFriendshipMutation';
import useRelationship from '@/hooks/people/useRelationship';
import { createRelationshipConfig } from '@c/features/user/UserProfile/FriendshipButtons/helpers';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';

const FriendshipButtons = ({ userId }) => {
  const {
    requestFriendship: requestFriendshipText,
    acceptFriendship: acceptFriendshipText,
    cancelFriendRequest: cancelFriendRequestText,
    rejectFriendship: rejectFriendshipText,
    removeFriendship: removeFriendText
  } = useText('features.people.friendship');

  const isSelf = useIsSelf(userId);

  const { data, isPending } = useRelationship(userId);

  const relationshipState = data?.isFriend
    ? 'friend'
    : data?.hasSentRequest
      ? 'sent'
      : data?.hasReceivedRequest
        ? 'received'
        : 'none';
  const relationshipConfig = createRelationshipConfig({
    removeFriend: removeFriendText,
    cancelFriendRequest: cancelFriendRequestText,
    acceptFriendship: acceptFriendshipText,
    rejectFriendship: rejectFriendshipText,
    requestFriendship: requestFriendshipText
  });
  const config =
    relationshipConfig[relationshipState] ?? relationshipConfig.none;

  const {
    mutate,
    isPending: mutationIsPending,
    isError
  } = useFriendshipMutation(userId);

  if (isSelf) {
    console.warn(
      "component is being rendered for current logged in user, this should not happen, this component shouldn't be rendered for self. please add following in parent:",
      ' {!isSelf && RENDER-COMPONENT-HERE}'
    );
    return null;
  }

  return (
    <LoadingButtonsSection
      isError={isError}
      isLoading={isPending || mutationIsPending}
    >
      <button
        className={config.className}
        onClick={() => mutate({ action: config.action, userId })}
      >
        {config.text}
      </button>
      {config.secondary && (
        <button
          className={config.secondary.className}
          onClick={() => mutate({ action: config.secondary.action, userId })}
        >
          {config.secondary.text}
        </button>
      )}
    </LoadingButtonsSection>
  );
};

export default FriendshipButtons;
