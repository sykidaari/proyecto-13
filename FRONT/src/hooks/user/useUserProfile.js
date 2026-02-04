import backend from '@/api/config/axios.js';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = (userId) =>
  useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const { data } = await backend.get(`/user/${userId}`);
      return data;
    },
    enabled: !!userId
  });

export default useUserProfile;
