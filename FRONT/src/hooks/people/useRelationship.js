import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { IS_DEV } from '@/utils/env';
import { useQuery } from '@tanstack/react-query';

const useRelationship = (targetUserId) => {
  const currentUserId = useCurrentUserId();

  const isSelf = currentUserId === targetUserId;

  return useQuery({
    queryKey: ['relationship', currentUserId, targetUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/people/${targetUserId}/relationship/`
      );

      console.log(data);

      return data;
    },
    enabled: !isSelf
  });
};

export default useRelationship;
