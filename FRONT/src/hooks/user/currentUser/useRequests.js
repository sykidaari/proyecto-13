import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { useQuery } from '@tanstack/react-query';

const useRequests = () => {
  const currentUserId = useCurrentUserId();

  return useQuery({
    queryKey: ['requests', currentUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/requests`
      );
      return data;
    },
    enabled: !!currentUserId
  });
};

export default useRequests;
