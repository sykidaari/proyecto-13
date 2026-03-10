import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import { useQuery } from '@tanstack/react-query';

const useSessionsList = () => {
  const currentUserId = useCurrentUserId();

  return useQuery({
    queryKey: ['sessionsList', currentUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/sessions-list`
      );

      return data;
    },
    enabled: !!currentUserId
  });
};

export default useSessionsList;
