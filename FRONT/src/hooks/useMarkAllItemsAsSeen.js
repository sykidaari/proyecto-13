import backend from '@/api/config/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// no special error management, if fails there's no severe consequence
const useMarkAllItemsAsSeen = (routeStart, shouldRun, relatedQueryKey) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await backend.patch(`${routeStart}/mark-all-seen`);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [relatedQueryKey] });
    }
  });

  useEffect(() => {
    if (!shouldRun) return;

    mutate(routeStart);
  }, [mutate, routeStart, shouldRun]);
};

export default useMarkAllItemsAsSeen;
