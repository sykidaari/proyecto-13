import backend from '@/api/config/axios.js';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';
import { useQuery } from '@tanstack/react-query';

const useIsFriend = (isSelf, userId) => {
  const currentUserId = useCurrentUserId();

  const { data } = useQuery({
    queryKey: ['isFriend', currentUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/friends`
      );

      return data;
    },
    enabled: !isSelf
  });

  const isFriend = !!data?.friendsList?.some((f) => f.user === userId);

  return isFriend;
};

export default useIsFriend;
