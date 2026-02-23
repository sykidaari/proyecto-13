import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText';
import useText from '@/contexts/App/hooks/useText.js';
import useIsSelf from '@/contexts/UserSession/hooks/useIsSelf';
import useFriendshipMutation from '@/hooks/people/useFriendshipMutation';
import useRelationship from '@/hooks/people/useRelationship';
import cN from '@/utils/classNameManager.js';
import { createRelationshipConfig } from '@c/features/user/UserProfile/FriendshipButtons/helpers';
import { XCircleIcon } from '@heroicons/react/24/outline';

const FriendshipButtons = ({ userId }) => {
  const {
    requestFriendship: requestFriendshipText,
    acceptFriendship: acceptFriendshipText,
    cancelFriendRequest: cancelFriendRequestText,
    rejectFriendship: rejectFriendshipText,
    removeFriendship: removeFriendText
  } = useText('features.people.friendship');
  const errorMessage = useServerProblemtext();

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
    <section
      className={cN(
        'flex *:btn *:btn-soft *:mobile:flex-1 gap-1 max-mobile:flex-col',
        isError && 'tooltip tooltip-error'
      )}
      data-tip={errorMessage}
    >
      <button
        className={cN(
          isError ? 'btn-error' : config.className,
          mutationIsPending && 'btn-disabled'
        )}
        onClick={() => mutate({ action: config.action, userId })}
      >
        {isError ? (
          <XCircleIcon className='size-7' />
        ) : isPending || mutationIsPending ? (
          <span className='loading' />
        ) : (
          config.text
        )}
      </button>
      {config.secondary && (
        <button
          className={config.secondary.className}
          onClick={() => mutate({ action: config.secondary.action, userId })}
        >
          {config.secondary.text}
        </button>
      )}
    </section>
  );
};

export default FriendshipButtons;
