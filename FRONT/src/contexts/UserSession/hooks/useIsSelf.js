import isSelf from '@/contexts/UserSession/helpers/isSelf.js';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';

const useIsSelf = (selectedUserId) =>
  isSelf(selectedUserId, useCurrentUserId());

export default useIsSelf;
