import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFriendshipMutation = (targetUserId) => {
  const queryClient = useQueryClient();

  const currentUserId = useCurrentUserId();

  return useMutation({
    mutationFn: async ({ action }) => {
      const body = { otherUserId: targetUserId };
      switch (action) {
        case 'remove':
          await backend.patch(
            `/user/${currentUserId}/private/friends/remove`,
            body
          );
          return {
            isFriend: false,
            hasSentRequest: false,
            hasReceivedRequest: false
          };

        case 'sendRequest': {
          await backend.patch(
            `/user/${currentUserId}/private/friends/request/send`,
            body
          );
          return {
            isFriend: false,
            hasSentRequest: true,
            hasReceivedRequest: false
          };
        }

        case 'acceptRequest':
          await backend.patch(
            `/user/${currentUserId}/private/friends/request/accept`,
            body
          );
          return {
            isFriend: true,
            hasSentRequest: false,
            hasReceivedRequest: false
          };

        case 'cancelRequest':
          await backend.patch(
            `/user/${currentUserId}/private/friends/request/cancel`,
            body
          );
          return {
            isFriend: false,
            hasSentRequest: false,
            hasReceivedRequest: false
          };

        case 'rejectRequest':
          await backend.patch(
            `/user/${currentUserId}/private/friends/request/reject`,
            body
          );
          return {
            isFriend: false,
            hasSentRequest: false,
            hasReceivedRequest: false
          };
      }
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(
        ['relationship', currentUserId, targetUserId],
        newState
      );

      queryClient.refetchQueries({
        queryKey: ['friendsList', currentUserId]
      });

      queryClient.refetchQueries({
        queryKey: ['requests', currentUserId]
      });
    }
  });
};

export default useFriendshipMutation;
