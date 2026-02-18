import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { IS_DEV } from '@/utils/env';
import { useQuery } from '@tanstack/react-query';

const useRelationship = (targetUserId) => {
  const currentUserId = useCurrentUserId();

  const isSelf = currentUserId === targetUserId;

  if (isSelf && IS_DEV)
    console.warn(
      "target user is same as logged in user, can't check relationship. please make sure this hook and the component which you're calling it in only run when target user isn't the same as the logged in user (!isSelf)"
    );

  console.log(currentUserId);

  return useQuery({
    queryKey: ['relationship', currentUserId, targetUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/people/${targetUserId}/relationship/`
      );

      return data;
    },
    enabled: !isSelf
  });
};

export default useRelationship;
