import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { useQuery } from '@tanstack/react-query';

const useFriendsList = () => {
  const currentUserId = useCurrentUserId();

  return useQuery({
    queryKey: ['friendsList', currentUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/friends`
      );
      return data;
    },
    enabled: !!currentUserId
  });
};

export default useFriendsList;
