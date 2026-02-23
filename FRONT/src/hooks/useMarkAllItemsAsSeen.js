import backend from '@/api/config/axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

// no special error management, if fails there's no severe consequence
const useMarkAllItemsAsSeen = (routeStart, shouldRun) => {
  const { mutate } = useMutation({
    mutationFn: async (routeStart) => {
      await backend.patch(`${routeStart}/mark-all-seen`);
    }
  });

  useEffect(() => {
    if (!shouldRun) return;

    mutate(routeStart);
  }, [mutate, routeStart, shouldRun]);
};

export default useMarkAllItemsAsSeen;
